"use server";

// Manage Login
import { deleteLoginSession } from "../../utils/actions/manage-login";

//Next
import { redirect } from "next/navigation";

export async function LogoutAction() {
  await deleteLoginSession();
  redirect("/");
}
