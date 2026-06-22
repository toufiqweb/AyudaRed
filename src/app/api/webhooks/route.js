import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  let event;

  try {
    const rawBody = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      // Securely forward to Express Backend using Internal Secret
      const backendUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9000";
      
      const response = await fetch(`${backendUrl}/api/internal/funds/record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-secret": process.env.INTERNAL_API_SECRET,
        },
        body: JSON.stringify({
          donorName: session.metadata.donorName || "Anonymous",
          amount: session.amount_total / 100,
          transactionId: session.payment_intent,
          paymentIntentId: session.payment_intent,
          stripeSessionId: session.id,
          userId: session.metadata.userId || "anonymous",
          status: session.payment_status,
        }),
      });

      if (!response.ok) {
        throw new Error("Backend failed to save funding record.");
      }

      return NextResponse.json({ received: true });
    } catch (err) {
      console.error("Failed to forward webhook to backend:", err);
      return NextResponse.json(
        { error: "Failed to save record" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
