import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import rateLimit from "next-rate-limit";
import prisma from "@/utils/connect";

// Initialize Resend Email
const resend = new Resend(process.env.RESEND_API_KEY);

// Set up Rate Limiting (5 requests per 10 minutes per IP)
const limiter = rateLimit({
  interval: 600000, // 10 minutes
  uniqueTokenPerInterval: 1000, // Adjust as needed
});

// Input Validation Schema
const emailSchema = z.object({
  from: z.string().email(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  captchaToken: z.string().min(1),
});

// reCAPTCHA Verification Function
async function verifyCaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secret}&response=${token}`,
  });
  const data = await res.json();
  return data.success;
}

export async function POST(req) {
  try {
    // CSRF Token Check (For extra security)
    const csrfHeader = req.headers.get("x-csrf-token");
    if (csrfHeader !== process.env.CSRF_TOKEN) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Rate Limiting (Prevent spam)
    let headers;
    try {
      headers = limiter.checkNext(req, 5);
    } catch {
      return NextResponse.json({ message: "Rate limit exceeded" }, { status: 429 });
    }

    // Validate Request Payload
    const body = await req.json();
    console.log("Received Body:", body); // Debugging Log
    const parsed = emailSchema.safeParse(body);
    if (!parsed.success) {
      console.error("Validation Errors:", parsed.error.flatten());
      return NextResponse.json({ message: "Invalid input", errors: parsed.error.flatten() }, { status: 400 });
    }
    const { from, subject, message, captchaToken } = parsed.data;

    // Verify reCAPTCHA
    const captchaValid = await verifyCaptcha(captchaToken);
    if (!captchaValid) {
      return NextResponse.json({ message: "Captcha verification failed." }, { status: 403 });
    }

    // Fetch admin emails from database
    const admins = await prisma.user.findMany({ where: { role: "ADMIN" }, select: { email: true } });
    const adminEmails = admins.map((admin) => admin.email).join(", ");

    // Send Email
    const emailData = {
      from,
      to: adminEmails,
      subject,
      text: message,
    };
    const result = await resend.emails.send(emailData);
    console.log(result);

    return NextResponse.json({ message: "Email sent successfully", result }, { status: 200, headers });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ message: "Failed to send email", error: error.message }, { status: 500 });
  }
}
