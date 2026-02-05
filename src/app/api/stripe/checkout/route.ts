import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export async function POST(request: Request) {
  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY não configurada" },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const amount = Number(body.amount ?? 0);

  if (!amount || amount <= 0) {
    return NextResponse.json(
      { error: "Valor inválido para o checkout" },
      { status: 400 }
    );
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-06-20" as Stripe.LatestApiVersion,
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: body.currency ?? "brl",
          product_data: {
            name: body.description ?? "Sinal do agendamento",
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    metadata: body.metadata ?? {},
    success_url: body.successUrl ?? "http://localhost:3000/company/appointments",
    cancel_url: body.cancelUrl ?? "http://localhost:3000/company/appointments",
  });

  return NextResponse.json({ url: session.url });
}
