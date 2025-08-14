import {
  collection,
  getDocs,
  writeBatch,
  doc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../utils/firebase/firebase.utils";
import { cmsService, Product, Category } from "./cms.service";

export interface BulkOperationResult {
  success: number;
  failed: number;
  errors: string[];
}

export interface AnalyticsData {
  totalProducts: number;
  totalCategories: number;
  featuredProducts: number;
  productsByCategory: { [category: string]: number };
  recentlyAdded: {
    products: Product[];
    categories: Category[];
  };
}

export interface ImportData {
  products?: Omit<Product, "id" | "createdAt" | "updatedAt">[];
  categories?: Omit<Category, "id" | "createdAt" | "updatedAt">[];
}

class BulkOperationsService {
  // Analytics
  async getAnalytics(): Promise<AnalyticsData> {
    try {
      const [products, categories] = await Promise.all([
        cmsService.getProducts(),
        cmsService.getCategories(),
      ]);

      const productsByCategory: { [category: string]: number } = {};
      let featuredProducts = 0;

      products.forEach((product) => {
        if (product.featured) featuredProducts++;
        if (product.category) {
          productsByCategory[product.category] =
            (productsByCategory[product.category] || 0) + 1;
        }
      });

      // Get recently added items (last 7 days)
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const recentProducts = products
        .filter((p) => p.createdAt && p.createdAt > weekAgo)
        .slice(0, 5);

      const recentCategories = categories
        .filter((c) => c.createdAt && c.createdAt > weekAgo)
        .slice(0, 5);

      return {
        totalProducts: products.length,
        totalCategories: categories.length,
        featuredProducts,
        productsByCategory,
        recentlyAdded: {
          products: recentProducts,
          categories: recentCategories,
        },
      };
    } catch (error) {
      console.error("Error getting analytics:", error);
      throw error;
    }
  }

  // Bulk delete products
  async bulkDeleteProducts(productIds: string[]): Promise<BulkOperationResult> {
    const batch = writeBatch(db);
    const result: BulkOperationResult = { success: 0, failed: 0, errors: [] };

    try {
      productIds.forEach((id) => {
        const productRef = doc(db, "cms-products", id);
        batch.delete(productRef);
      });

      await batch.commit();
      result.success = productIds.length;
      return result;
    } catch (error) {
      result.failed = productIds.length;
      result.errors.push(`Batch delete failed: ${error}`);
      return result;
    }
  }

  // Bulk delete categories
  async bulkDeleteCategories(
    categoryIds: string[]
  ): Promise<BulkOperationResult> {
    const batch = writeBatch(db);
    const result: BulkOperationResult = { success: 0, failed: 0, errors: [] };

    try {
      categoryIds.forEach((id) => {
        const categoryRef = doc(db, "cms-categories", id);
        batch.delete(categoryRef);
      });

      await batch.commit();
      result.success = categoryIds.length;
      return result;
    } catch (error) {
      result.failed = categoryIds.length;
      result.errors.push(`Batch delete failed: ${error}`);
      return result;
    }
  }

  // Bulk update featured status for products
  async bulkUpdateFeatured(
    productIds: string[],
    featured: boolean
  ): Promise<BulkOperationResult> {
    const batch = writeBatch(db);
    const result: BulkOperationResult = { success: 0, failed: 0, errors: [] };

    try {
      productIds.forEach((id) => {
        const productRef = doc(db, "cms-products", id);
        batch.update(productRef, {
          featured,
          updatedAt: new Date(),
        });
      });

      await batch.commit();
      result.success = productIds.length;
      return result;
    } catch (error) {
      result.failed = productIds.length;
      result.errors.push(`Batch update failed: ${error}`);
      return result;
    }
  }

  // Import data from JSON
  async importData(data: ImportData): Promise<BulkOperationResult> {
    const batch = writeBatch(db);
    const result: BulkOperationResult = { success: 0, failed: 0, errors: [] };

    try {
      // Import products
      if (data.products) {
        for (const product of data.products) {
          try {
            const productRef = doc(collection(db, "cms-products"));
            const productData = {
              ...product,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            batch.set(productRef, productData);
            result.success++;
          } catch (error) {
            result.failed++;
            result.errors.push(
              `Failed to import product: ${product.name} - ${error}`
            );
          }
        }
      }

      // Import categories
      if (data.categories) {
        for (const category of data.categories) {
          try {
            const categoryRef = doc(collection(db, "cms-categories"));
            const categoryData = {
              ...category,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            batch.set(categoryRef, categoryData);
            result.success++;
          } catch (error) {
            result.failed++;
            result.errors.push(
              `Failed to import category: ${category.title} - ${error}`
            );
          }
        }
      }

      if (result.success > 0) {
        await batch.commit();
      }

      return result;
    } catch (error) {
      result.errors.push(`Import failed: ${error}`);
      return result;
    }
  }

  // Export data to JSON
  async exportData(): Promise<{ products: Product[]; categories: Category[] }> {
    try {
      const [products, categories] = await Promise.all([
        cmsService.getProducts(),
        cmsService.getCategories(),
      ]);

      return { products, categories };
    } catch (error) {
      console.error("Error exporting data:", error);
      throw error;
    }
  }

  // Duplicate product
  async duplicateProduct(productId: string): Promise<string> {
    try {
      const products = await cmsService.getProducts();
      const originalProduct = products.find((p) => p.id === productId);

      if (!originalProduct) {
        throw new Error("Product not found");
      }

      const duplicatedProduct = {
        name: `${originalProduct.name} (Copy)`,
        price: originalProduct.price,
        imageUrl: originalProduct.imageUrl,
        category: originalProduct.category,
        featured: originalProduct.featured,
      };

      return await cmsService.createProduct(duplicatedProduct);
    } catch (error) {
      console.error("Error duplicating product:", error);
      throw error;
    }
  }

  // Search products
  async searchProducts(searchTerm: string): Promise<Product[]> {
    try {
      const products = await cmsService.getProducts();
      const lowerSearchTerm = searchTerm.toLowerCase();

      return products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerSearchTerm) ||
          product.category?.toLowerCase().includes(lowerSearchTerm)
      );
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  }

  // Generate sample data for testing
  generateSampleData(): ImportData {
    const categories: Omit<Category, "id" | "createdAt" | "updatedAt">[] = [
      { title: "Men's Clothing", imageUrl: "", route: "mens" },
      { title: "Women's Clothing", imageUrl: "", route: "womens" },
      { title: "Accessories", imageUrl: "", route: "accessories" },
      { title: "Shoes", imageUrl: "", route: "shoes" },
    ];

    const products: Omit<Product, "id" | "createdAt" | "updatedAt">[] = [
      {
        name: "Blue Denim Jacket",
        price: 89.99,
        imageUrl: "",
        category: "mens",
        featured: false,
      },
      {
        name: "Red Summer Dress",
        price: 69.99,
        imageUrl: "",
        category: "womens",
        featured: true,
      },
      {
        name: "Leather Wallet",
        price: 29.99,
        imageUrl: "",
        category: "accessories",
        featured: false,
      },
      {
        name: "Running Shoes",
        price: 119.99,
        imageUrl: "",
        category: "shoes",
        featured: true,
      },
      {
        name: "White T-Shirt",
        price: 19.99,
        imageUrl: "",
        category: "mens",
        featured: false,
      },
    ];

    return { categories, products };
  }
}

export const bulkOperationsService = new BulkOperationsService();
