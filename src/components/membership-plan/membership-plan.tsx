import React, { useState } from "react";
import { MembershipPlanProps } from "./membership-plan.props";
import moment from "moment";

const MembershipPlan = ({ subscription }: MembershipPlanProps) => {
  const [isLoading, setIsLoading]=useState(false)

  const openPortal = async () => {
		setIsLoading(true)
		const paylaod = { user_id: subscription.customer.metadata.user_id };

		const response = await fetch('/api/subscription/manage', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(paylaod),
		});

		const data = await response.json();
		window.open(data.portal); 
    setIsLoading(false)
	};


  
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-1 md:border-t md:border-b-0  md:pb-0">
      <div className="space-y-4 py-4">
        <h4 className="text-lg text-[gray]">Membership & Billing</h4>
        <button
          onClick={openPortal}
          className="bg-gray-300 hover:bg-gray-200 tansition-all font-medium text-black py-2 whitespace-nowrap h-10 w-3/5 md:w-4/5 shadow-md text-sm "
        >
          {isLoading?'Loading...':' Cancel Membership'}
         
        </button>
      </div>

      <div className="col-span-3">
        <div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
          <div className="">
            <p className="font-semibold">
              Email:{" "}
              {subscription.customer.email}
            </p>
            <p className="text-[gray]">
              Password:{" "}
              *********
            </p>
          </div>

          <div className="text-right">
            <p className={"membershipLink"}>Change email</p>
            <p className={"membershipLink"}>Change password</p>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
          <div className="">
            <div className="flex items-center gap-2">
              <span className="py-1 px-3 uppercase rounded-sm bg-white/30">
                {subscription.default_payment_method? subscription.default_payment_method.card.brand: subscription.customer.invoice_settings.default_payment_method.card.brand}
              </span>
              <p>
                **** **** ****{subscription.default_payment_method? subscription.default_payment_method.card.last4: subscription.customer.invoice_settings.default_payment_method.card.last4}
              </p>
            </div>
            <p className="mt-3">
              Your next billing date is on{" "}
              {moment(subscription.current_period_end * 1000).format(
                "DD MMM yyyy"
              )}
            </p>
          </div>
            {isLoading?'Loading...':  
          <div className="md:text-right">
            <p onClick={openPortal} className="membershipLink">Manage payment info</p>
            <p onClick={openPortal} className="membershipLink">Add backup payment method</p>
            <p onClick={openPortal} className="membershipLink">Billing details </p>
            <p onClick={openPortal} className="membershipLink">Change billing day</p>
          </div>
            }
        </div>
      </div>
    </div>
  );
};

export default MembershipPlan;
