// Shared user store for demo purposes
import bcrypt from "bcryptjs";

export interface User {
  id: string;
  email: string;
  password: string; // Stored as bcrypt hash
  role: "admin" | "user";
  name?: string;
}

// These are the default users available before new users are added
export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    password: bcrypt.hashSync("user123", 10),
    role: "user",
  },
];

// Helper function to add a user (password should be hashed before calling this)
export function addUser(user: Omit<User, "id">): User {
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
  };
  users.push(newUser);
  return newUser;
}

// Helper function to find a user by email
export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

// Helper function to find a user by email and verify password using bcrypt
export async function findUserByCredentials(
  email: string,
  password: string
): Promise<User | undefined> {
  const user = users.find((u) => u.email === email);
  
  if (!user) {
    return undefined;
  }

  // Compare the provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (isPasswordValid) {
    return user;
  }

  return undefined;
}

// Helper function to hash a password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

