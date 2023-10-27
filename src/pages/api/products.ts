import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_API as string, {
  apiVersion: "2023-10-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  if (method === "GET") {
    const products = await stripe.products.list({
      expand: ["data.default_price"],
    });
    return res.status(200).json({ products });
  } else {
    return res.status(400).json({ message: "Method is not allowed" });
  }
}

type Data = {
  message?: string;
  products?: Stripe.Response<Stripe.ApiList<Stripe.Product>>;
};
