import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FcCheckmark } from "react-icons/fc";
import Home from ".";

const Success = () => {
 
  return (
    <>
      <div className="flex justify-start py-2 px-4">
        <Image
          src={"/Animate.svg"}
          alt="logo"
          width={56}
          height={56}
          className="object-contain cursor-pointer"
        />
      </div>
      <div className="h-[70vh] flex flex-col justify-center items-center">
        <FcCheckmark className="w-40 h-40 " />
        <h1 className="md:text-4xl text-2xl mt-4">Subscription completed successfully!</h1>
        <Link href={"/"}>
          <button className="mt-3 bg-geen-500 py-2 px-3 bg-green-500 outline-none rounded-full">
           Dashboard
          </button>
        </Link>
      </div>
    </>
  );
};

export default Success;
