import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FcCancel } from "react-icons/fc";

const Cancel = () => {
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
          <FcCancel className="w-40 h-40 " />
          <h1 className="md:text-4xl text-2xl mt-4">Cancel Subsription</h1>
          <Link href={"/"}>
            <button className="mt-3 bg-[#e10865] py-2 px-3 outline-none rounded-full">
              Choose Plan
            </button>
          </Link>
        </div>
      
    </>
  );
};

export default Cancel;
