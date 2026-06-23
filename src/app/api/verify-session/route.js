import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const { sessionId } = await req.json();
    
    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    // Retrieve the session from Stripe to verify payment status
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const backendUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9000";
      
      const payload = {
        donorName: session.metadata.donorName || "Anonymous",
        amount: session.amount_total / 100,
        transactionId: session.payment_intent,
        paymentIntentId: session.payment_intent,
        stripeSessionId: session.id,
        userId: session.metadata.userId || "anonymous",
        status: session.payment_status,
      };

      // Forward to your Express backend
      const response = await fetch(`${backendUrl}/api/internal/funds/record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Backend failed to save funding record.");
      }

      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ success: false, message: "Payment not completed" });
  } catch (error) {
    console.error("Error verifying session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
