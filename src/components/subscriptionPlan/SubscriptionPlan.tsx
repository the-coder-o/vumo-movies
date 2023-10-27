import { AuthContext } from "@/context/auth.context";
import Image from "next/image";
import React, { useContext } from "react";
import { AiOutlineHourglass, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { RiVipCrown2Line } from "react-icons/ri";
import { SubscriptionPlanProps } from "./subsription.interface";
import PlanCard from "../plan-card/plan-card";

const SubscriptionPlan = ({products}:SubscriptionPlanProps) => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between border-b-2 border-gray-300/20 py-3 px-5 md:px-10">
        <Image
          src={"/Animate.svg"}
          alt="logo"
          width={56}
          height={56}
          className="object-contain cursor-pointer"
        />

        <div
          className="text-lg cursor-pointer hover:underline"
          onClick={logout}
        >
          Logout
        </div>
      </div>

      <div className="flex flex-col space-y-4 text-center text-shadow-sm pt-5">
        <h1 className="text-3xl md:text-5xl">
          Flexible pricing for teams of any size{" "}
        </h1>
        <p className="text-xl text-shadow-sm">
          Relax with watching your favourite movies and TV Shows
        </p>
      </div>

      <div className="flex items-center justify-center py-20">
        <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
{products.map(product=>(


        <PlanCard key={product.id} product={product}/>
)).reverse()}



          
  
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
