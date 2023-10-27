import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_API as string, {
	apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
if(req.method==='GET'){
	const {id} = req.query

	const customers = await stripe.customers.list({limit:100})
	const customer = customers.data.find(c=>c.metadata.user_id===id)

	const subscription = await stripe.subscriptions.list({
		limit:1,
		customer: customer?.id,
		expand:['data.default_payment_method', 'data.customer.invoice_settings.default_payment_method']
	})
	return res.status(200).json({subscription})
}
}

interface Data {
	message?: string;
	subscription?: Stripe.Response<Stripe.ApiList<Stripe.Subscription>>;
}