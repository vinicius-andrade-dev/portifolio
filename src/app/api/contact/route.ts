import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  message: z.string().min(10),
});

// Initialize Resend client with safe fallback
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Zod payload validation
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // 2. Fallback simulation mode if API key is not yet set up
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_dummy") {
      console.warn("RESEND_API_KEY is not defined. Simulating message dispatch.");
      await new Promise((resolve) => setTimeout(resolve, 800)); // mock latency
      return NextResponse.json({
        success: true,
        message: "Message simulation completed successfully (Development Mode).",
      });
    }

    // 3. Dispatch email through Resend API
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "gestaolisboainfo@gmail.com",
      subject: `Novo Contato do Portfólio: ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\nMensagem:\n${message}`,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Resend API Error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
