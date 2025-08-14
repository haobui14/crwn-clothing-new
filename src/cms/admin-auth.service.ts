import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase/firebase.utils";

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: "super-admin" | "admin" | "editor";
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

export interface AdminLoginCredentials {
  username: string;
  password: string;
}

class AdminAuthService {
  private readonly COLLECTION_NAME = "admin-users";

  // Create new admin user
  async createAdmin(adminData: {
    username: string;
    email: string;
    password: string;
    role: AdminUser["role"];
  }): Promise<string> {
    try {
      // Hash password (for now we'll use a simple hash, but we should install bcrypt)
      const passwordHash = btoa(adminData.password); // Base64 encoding for now

      const adminsCollection = collection(db, this.COLLECTION_NAME);
      const newAdmin = {
        username: adminData.username,
        email: adminData.email,
        passwordHash,
        role: adminData.role,
        createdAt: new Date(),
        isActive: true,
      };

      const docRef = await addDoc(adminsCollection, newAdmin);

      return docRef.id;
    } catch (error) {
      console.error("Error creating admin:", error);
      throw error;
    }
  }

  // Simplified login method using email
  async login(email: string, password: string): Promise<AdminUser | null> {
    try {
      const adminsCollection = collection(db, this.COLLECTION_NAME);
      const q = query(
        adminsCollection,
        where("email", "==", email),
        where("isActive", "==", true)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return null;
      }

      const adminDoc = querySnapshot.docs[0];
      const adminData = adminDoc.data();

      // Verify password (simple base64 check for now)
      const passwordHash = btoa(password);

      if (adminData.passwordHash !== passwordHash) {
        return null;
      }

      // Update last login
      await updateDoc(adminDoc.ref, {
        lastLogin: new Date(),
      });

      // Return admin user data
      return {
        id: adminDoc.id,
        username: adminData.username,
        email: adminData.email,
        passwordHash: adminData.passwordHash,
        role: adminData.role,
        createdAt: adminData.createdAt?.toDate?.() || new Date(),
        lastLogin: new Date(),
        isActive: adminData.isActive,
      };
    } catch (error) {
      console.error("Error during login:", error);
      return null;
    }
  }

  // Authenticate admin user (legacy method for backward compatibility)
  async authenticate(
    credentials: AdminLoginCredentials
  ): Promise<AdminUser | null> {
    try {
      console.log("Authenticating admin with credentials:", {
        username: credentials.username,
        password: "[HIDDEN]",
      });

      const adminsCollection = collection(db, this.COLLECTION_NAME);
      const q = query(
        adminsCollection,
        where("username", "==", credentials.username),
        where("isActive", "==", true)
      );

      const querySnapshot = await getDocs(q);
      console.log("Query results:", querySnapshot.size, "documents found");

      if (querySnapshot.empty) {
        console.log("No admin user found with username:", credentials.username);
        return null;
      }

      const adminDoc = querySnapshot.docs[0];
      const adminData = adminDoc.data();
      console.log("Found admin data:", {
        username: adminData.username,
        email: adminData.email,
        role: adminData.role,
        isActive: adminData.isActive,
        hasPasswordHash: !!adminData.passwordHash,
      });

      // Verify password (simple base64 check for now)
      const passwordHash = btoa(credentials.password);
      console.log("Password hash comparison:", {
        inputHash: passwordHash,
        storedHash: adminData.passwordHash,
        match: adminData.passwordHash === passwordHash,
      });

      if (adminData.passwordHash !== passwordHash) {
        console.log("Password verification failed");
        return null;
      }

      console.log("Authentication successful!");

      // Return admin user data
      return {
        id: adminDoc.id,
        username: adminData.username,
        email: adminData.email,
        passwordHash: adminData.passwordHash,
        role: adminData.role,
        createdAt: adminData.createdAt?.toDate?.() || new Date(),
        lastLogin: adminData.lastLogin?.toDate?.() || undefined,
        isActive: adminData.isActive,
      };
    } catch (error) {
      console.error("Error authenticating admin:", error);
      return null;
    }
  }

  // Get admin by ID
  async getAdminById(adminId: string): Promise<AdminUser | null> {
    try {
      const adminDoc = await getDoc(doc(db, this.COLLECTION_NAME, adminId));

      if (!adminDoc.exists()) {
        return null;
      }

      const data = adminDoc.data();
      return {
        id: adminDoc.id,
        username: data.username,
        email: data.email,
        passwordHash: data.passwordHash,
        role: data.role,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        lastLogin: data.lastLogin?.toDate?.() || undefined,
        isActive: data.isActive,
      };
    } catch (error) {
      console.error("Error getting admin by ID:", error);
      return null;
    }
  }

  // Get all admin users
  async getAllAdmins(): Promise<AdminUser[]> {
    try {
      const adminsCollection = collection(db, this.COLLECTION_NAME);
      const adminSnapshot = await getDocs(adminsCollection);

      return adminSnapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            username: data.username,
            email: data.email,
            passwordHash: data.passwordHash,
            role: data.role,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            lastLogin: data.lastLogin?.toDate?.() || undefined,
            isActive: data.isActive,
          };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
      console.error("Error getting all admins:", error);
      return [];
    }
  }

  // Update admin user
  async updateAdmin(
    adminId: string,
    updateData: {
      username?: string;
      email?: string;
      password?: string;
      role?: AdminUser["role"];
      isActive?: boolean;
    }
  ): Promise<void> {
    try {
      console.log("Updating admin user:", adminId);
      const adminDocRef = doc(db, this.COLLECTION_NAME, adminId);

      const updatePayload: any = {
        updatedAt: new Date(),
      };

      if (updateData.username) updatePayload.username = updateData.username;
      if (updateData.email) updatePayload.email = updateData.email;
      if (updateData.password)
        updatePayload.passwordHash = btoa(updateData.password);
      if (updateData.role) updatePayload.role = updateData.role;
      if (updateData.isActive !== undefined)
        updatePayload.isActive = updateData.isActive;

      console.log("Updating admin with data:", updatePayload);

      // Actually update the document
      await updateDoc(adminDocRef, updatePayload);
      console.log("Admin updated successfully");
    } catch (error) {
      console.error("Error updating admin:", error);
      throw error;
    }
  }

  // Delete admin user
  async deleteAdmin(adminId: string): Promise<void> {
    try {
      console.log("Deleting admin user:", adminId);
      const adminDocRef = doc(db, this.COLLECTION_NAME, adminId);

      // Actually delete the document
      await deleteDoc(adminDocRef);
      console.log("Admin deleted successfully");
    } catch (error) {
      console.error("Error deleting admin:", error);
      throw error;
    }
  }

  // Update last login
  async updateLastLogin(adminId: string): Promise<void> {
    try {
      console.log(`Updating last login for admin ${adminId}`);
      const adminDocRef = doc(db, this.COLLECTION_NAME, adminId);
      await updateDoc(adminDocRef, { lastLogin: new Date() });
      console.log("Last login updated successfully");
    } catch (error) {
      console.error("Error updating last login:", error);
    }
  }

  // Get all admin users
  async getAllAdminUsers(): Promise<AdminUser[]> {
    try {
      console.log("Getting all admin users...");
      const adminsCollection = collection(db, this.COLLECTION_NAME);
      const adminSnapshot = await getDocs(adminsCollection);

      const users = adminSnapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            username: data.username,
            email: data.email,
            passwordHash: data.passwordHash,
            role: data.role,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            lastLogin: data.lastLogin?.toDate?.() || undefined,
            isActive: data.isActive ?? true,
          } as AdminUser;
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      console.log("Found admin users:", users.length);
      return users;
    } catch (error) {
      console.error("Error getting all admin users:", error);
      return [];
    }
  }
}

export const adminAuthService = new AdminAuthService();
