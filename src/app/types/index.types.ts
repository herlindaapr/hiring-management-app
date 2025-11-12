export interface Province {
    code: string;
    name: string;
  };

export interface Country {
    name: string;
    code: string;
    dial_code: string;
  };

export type Role = "admin" | "user";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: Role;
}