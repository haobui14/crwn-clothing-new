import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../utils/firebase/firebase.utils";

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  title: string;
  imageUrl: string;
  route: string;
  createdAt: Date;
  updatedAt: Date;
}

class CMSService {
  // Product Management
  async getProducts(): Promise<Product[]> {
    try {
      const productsCollection = collection(db, "cms-products");
      const productsSnapshot = await getDocs(productsCollection);
      return productsSnapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "",
            price: data.price || 0,
            imageUrl: data.imageUrl || "",
            category: data.category || "",
            featured: data.featured || false,
            // Convert Firebase Timestamps to JavaScript Date objects
            createdAt: data.createdAt?.toDate?.() || new Date(),
            updatedAt: data.updatedAt?.toDate?.() || new Date(),
          } as Product;
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
      console.error("Error getting products:", error);
      return [];
    }
  }

  async createProduct(
    productData: Omit<Product, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    try {
      const productsCollection = collection(db, "cms-products");
      const newProduct = {
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const docRef = await addDoc(productsCollection, newProduct);
      return docRef.id;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  async updateProduct(
    productId: string,
    productData: Partial<Product>
  ): Promise<void> {
    try {
      const productDoc = doc(db, "cms-products", productId);
      await updateDoc(productDoc, {
        ...productData,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      const productDoc = doc(db, "cms-products", productId);
      await deleteDoc(productDoc);
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }

  // Category Management
  async getCategories(): Promise<Category[]> {
    try {
      const categoriesCollection = collection(db, "cms-categories");
      const categoriesSnapshot = await getDocs(categoriesCollection);
      return categoriesSnapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "",
            imageUrl: data.imageUrl || "",
            route: data.route || "",
            // Convert Firebase Timestamps to JavaScript Date objects
            createdAt: data.createdAt?.toDate?.() || new Date(),
            updatedAt: data.updatedAt?.toDate?.() || new Date(),
          } as Category;
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
      console.error("Error getting categories:", error);
      return [];
    }
  }

  async createCategory(
    categoryData: Omit<Category, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    try {
      const categoriesCollection = collection(db, "cms-categories");
      const newCategory = {
        ...categoryData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const docRef = await addDoc(categoriesCollection, newCategory);
      return docRef.id;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }

  async updateCategory(
    categoryId: string,
    categoryData: Partial<Category>
  ): Promise<void> {
    try {
      const categoryDoc = doc(db, "cms-categories", categoryId);
      await updateDoc(categoryDoc, {
        ...categoryData,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  }

  async deleteCategory(categoryId: string): Promise<void> {
    try {
      const categoryDoc = doc(db, "cms-categories", categoryId);
      await deleteDoc(categoryDoc);
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }

  // Image Upload
  async uploadImage(file: File, path: string): Promise<string> {
    try {
      const imageRef = ref(
        storage,
        `cms-images/${path}/${Date.now()}-${file.name}`
      );
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  }
}

export const cmsService = new CMSService();
