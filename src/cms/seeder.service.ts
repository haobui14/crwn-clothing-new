import { cmsService } from "./cms.service";

const sampleProducts = [
  {
    name: "Black Hoodie",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    category: "hats",
    featured: true,
  },
  {
    name: "Vintage Jeans",
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    category: "jackets",
    featured: false,
  },
  {
    name: "Classic Sneakers",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
    category: "sneakers",
    featured: true,
  },
  {
    name: "Leather Jacket",
    price: 299.99,
    imageUrl:
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500",
    category: "jackets",
    featured: false,
  },
];

const sampleCategories = [
  {
    title: "Hats",
    imageUrl:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500",
    route: "shop/hats",
  },
  {
    title: "Jackets",
    imageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500",
    route: "shop/jackets",
  },
  {
    title: "Sneakers",
    imageUrl:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500",
    route: "shop/sneakers",
  },
  {
    title: "Womens",
    imageUrl:
      "https://images.unsplash.com/photo-1583743814966-8936f37f5d65?w=500",
    route: "shop/womens",
  },
  {
    title: "Mens",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
    route: "shop/mens",
  },
];

export const seedDatabase = async () => {
  try {
    console.log("🌱 Seeding database...");

    // Add sample categories
    for (const categoryData of sampleCategories) {
      await cmsService.createCategory(categoryData);
      console.log(`✅ Added category: ${categoryData.title}`);
    }

    // Add sample products
    for (const productData of sampleProducts) {
      await cmsService.createProduct(productData);
      console.log(`✅ Added product: ${productData.name}`);
    }

    console.log("🎉 Database seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

// Export this function so it can be called from the admin dashboard
export default seedDatabase;
