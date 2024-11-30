import { toast } from "@/hooks/use-toast";
import { backenClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { MetaData } from "../../../../actions/createCheckoutSession";
import stripe from "@/lib/stripe";
export async function POST(req: NextRequest) {
 const body = await req.text();
 const headersList = headers();
 const slg = headersList.get("stripe-signature");

 if (!slg) {
  return NextResponse.json({ error: "No Signature" }, { status: 200 });
 }
 const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

 if (!webhookSecret) {
  console.log("^ Stripe webhook secret is not set");
  return NextResponse.json(
   { error: "Stripe webhook secret is not set" },
   { status: 400 }
  );
 }

 let event: Stripe.Event;
 try {
  event = Stripe.webhooks.constructEvent(body, slg, webhookSecret);
 } catch (error) {
  toast({
   variant: "destructive",
   title: "Webhook signature",
   description: "Webhook signature validation failed",
  });
  console.error("Webhook signature validation failed", error);
  return NextResponse.json(
   { error: "Webhook Error :" + error },
   { status: 400 }
  );
 }

 if (event.type == "checkout.session.completed") {
  const session = event.data.object as Stripe.Checkout.Session;

  try {
   const order = await createOrderInSanity(session);
   console.log("Order created in sanity", order);
  } catch (error) {
   console.log(error);
   toast({
    variant: "destructive",
    title: "Order creating",
    description: "Error creating order in sanity",
   });
   NextResponse.json({ error: "Error creating order" }, { status: 500 });
  }
 }

 return NextResponse.json({ received: true });
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
 const {
  id,
  amount_total,
  currency,
  metadata,
  payment_intent,
  customer,
  total_details,
 } = session;
 const { clerkUserId, customerEmail, customerName, orderNumber } =
  metadata as MetaData;

 const lineItemsWithProuct = await stripe.checkout.sessions.listLineItems(id, {
  expand: ["data.price.product"],
 });

 const sanityProducts = lineItemsWithProuct.data.map((item) => ({
  _key: crypto.randomUUID(),
  product: {
   _type: "reference",
   _ref: (item.price?.product as Stripe.Product)?.metadata.id,
  },
  quantity: item.quantity || 0,
 }));

 const order = await backenClient.create({
  _type: "order",
  orderNumber,
  stripeCheckoutSessionId: id,
  stripePaymentIntentId: payment_intent,
  customerName,
  stripeCustomerId: customer,
  clerkUserId: clerkUserId,
  email: customerEmail,
  currency,
  ammountDiscount: total_details?.amount_discount
   ? total_details?.amount_discount / 100
   : 0,
  products: sanityProducts,
  totalPrice: amount_total ? amount_total / 100 : 0,
  status: "paid",
  orderDate: new Date().toISOString(),
 });
 return order;
}
