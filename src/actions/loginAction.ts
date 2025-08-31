"use server";

export const loginAction = async (data: FormData) => {
  const email = data.get("email");
  const password = data.get("password");

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Simulate a login action
  console.log("Logging in with:", { email, password });
};
