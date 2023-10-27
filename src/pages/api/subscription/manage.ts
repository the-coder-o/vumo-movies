import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_API as string, {
	apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method === 'POST') {
		try {
			const { user_id } = req.body;

			const customers = await stripe.customers.list({ limit: 100 });
			const customer = customers.data.find(c => c.metadata.user_id === user_id) as Stripe.Customer;

			const portal = await stripe.billingPortal.sessions.create({
				customer: customer.id,
				return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/account`,
			});

			return res.status(200).json({ portal: portal.url });
		} catch (error) {
			const result = error as Error;
			return res.status(400).json({ message: result.message });
		}
	}
}

interface Data {
	portal?: string;
	message?: string;
}