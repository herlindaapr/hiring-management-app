import { NextResponse } from "next/server";
import { findUserByEmail, addUser, hashPassword } from "@/app/lib/users";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, role = "user" } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password before storing
    const hashedPassword = await hashPassword(password);

    // Create new user with hashed password
    const newUser = addUser({
      email,
      password: hashedPassword,
      role: role as "admin" | "user",
      name: email.split("@")[0],
    });

    return NextResponse.json(
      { message: "User registered successfully", user: { email: newUser.email, role: newUser.role } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

