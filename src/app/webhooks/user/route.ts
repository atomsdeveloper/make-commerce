/* eslint-disable @typescript-eslint/no-explicit-any */
import { Webhook } from "svix";
import { NextRequest, NextResponse } from "next/server";

// Database
import { db } from "../../../lib/prisma";

import { getClerkUser } from "../../../lib/getClerkUser";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  // Clerk headers from the webhook
  const svixId = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-timestamp");
  const svixSignature = req.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json(
      { error: "Missing Svix headers" },
      { status: 400 }
    );
  }

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || "";
  const wh = new Webhook(WEBHOOK_SECRET);

  let event: any;
  try {
    event = wh.verify(rawBody, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const user = event.data;

  switch (event.type) {
    case "session.created": {
      const sessionUserId = event.data.user_id;

      const user = await getClerkUser(sessionUserId);
      if (!user)
        return new NextResponse("Usuário não encontrado", { status: 404 });

      try {
        const existingUser = await db.user.findUnique({
          where: { clerkUserId: user.id },
        });

        if (!existingUser) {
          await db.user.create({
            data: {
              clerkUserId: user.id,
              name: user.firstName || "",
              email: user.emailAddresses?.[0]?.emailAddress || "",
              role: "READ",
              image: user.imageUrl || null,
            },
          });

          console.log(`[Webhook] Novo usuário salvo: ${user.id}`);
        } else {
          console.log(`[Webhook] Usuário já existe: ${user.id}`);
        }

        return NextResponse.json({ success: true });
      } catch (err) {
        console.error("Erro ao salvar/verificar usuário:", err);
        return new NextResponse("Erro interno", { status: 500 });
      }
    }
    case "user.created":
      try {
        const existingUser = await db.user.findUnique({
          where: { clerkUserId: user.id },
        });

        if (!existingUser) {
          await db.user.create({
            data: {
              clerkUserId: user.id,
              name: user.first_name || "",
              email: user.email_addresses?.[0]?.email_address || "",
              role: "READ",
              image: user.profile_image_url || null,
            },
          });
          console.log(`[Webhook] Novo usuário salvo: ${user.id}`);
        } else {
          console.log(`[Webhook] Usuário já existe: ${user.id}`);
        }

        return NextResponse.json({ success: true });
      } catch (err) {
        console.error("Erro ao salvar/verificar usuário:", err);
        return new NextResponse("Erro interno", { status: 500 });
      }

    default:
      return NextResponse.json({ message: "Evento ignorado" });
  }
}
