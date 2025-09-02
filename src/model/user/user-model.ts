export type UserModel = {
  id: string;
  clerkUserId: string;
  email: string | null;
  name: string | null;
  password: string | null;
  role: "READ" | "ADMIN";
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};
