import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(req) {
  try {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
    const origin = `${protocol}://${host}`;

    // Authenticate user from session headers (server-side safety check)
    const sessionResponse = await auth.api.getSession({ headers: headersList });
    const sessionEmail = sessionResponse?.user?.email;

    // Extract values sent from the frontend
    const { amount, donorName, email: frontendEmail } = await req.json();

    if (!amount || amount <= 0 || !donorName) {
      return NextResponse.json({ message: "Invalid amount or donor name" }, { status: 400 });
    }

    // Determine the best email to use (Prefer Server Session > Frontend Form Input)
    let validatedEmail = sessionEmail || frontendEmail;

    // Safety Check: If the email is empty, null, or "anonymous", set it to undefined.
    // Stripe expects `customer_email` to either be a valid string or completely absent.
    if (!validatedEmail || typeof validatedEmail !== "string" || validatedEmail.trim() === "" || validatedEmail === "anonymous") {
      validatedEmail = undefined;
    }

    // Create Checkout Session from body params
    const sessionPayload = {
      payment_method_types: ["card"],
      // Conditionally inject `customer_email` ONLY if we have a valid string. 
      // This prevents passing `null` or `""` which breaks Stripe.
      ...(validatedEmail && { customer_email: validatedEmail }),
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Organization Funding",
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/funding/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/funding/give`,
      metadata: {
        donorName,
        userId: validatedEmail || "anonymous", // Fallback to anonymous for metadata tracking
      },
    };

    const session = await stripe.checkout.sessions.create(sessionPayload);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
