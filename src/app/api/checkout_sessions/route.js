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

    // Authenticate user
    const sessionResponse = await auth.api.getSession({ headers: headersList });
    const userEmail = sessionResponse?.user?.email || "anonymous";

    const { amount, donorName } = await req.json();

    if (!amount || amount <= 0 || !donorName) {
      return NextResponse.json({ message: "Invalid amount or donor name" }, { status: 400 });
    }

    // Create Checkout Session from body params
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
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
        userId: userEmail,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
