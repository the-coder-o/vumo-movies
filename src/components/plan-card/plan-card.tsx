import React, { useContext, useState } from 'react'
import { PlanCardProps } from './plan-card.props'
import { RiVipCrown2Line } from 'react-icons/ri'
import { AiOutlineHourglass, AiOutlineVideoCameraAdd } from 'react-icons/ai'
import { AuthContext } from '@/context/auth.context'
import Image from 'next/image'

const PlanCard = ({product}:PlanCardProps) => {
const [loading, setLoading] = useState<boolean>(false)
  const { user } = useContext(AuthContext)

  const onSubmitSubscription = async(priceId:string)=>{
    setLoading(true)
    const payload = {email: user?.email, priceId}

    try {
      const response = await fetch('/api/subscription',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
      })
      const data = await response.json()
      window.open(data.subscription.url)

setLoading(false)      
    } catch (error) {
      setLoading(false)
    }
    
  }

  return (
  
    <div key={product.id} className="max-w-sm cursor-pointer bg-white/20 px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
            <h3 className="text-[#e10865] mb-3 text-xl font-bold">{product.name}</h3>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                alt="Colors"
                width={300}
                height={450}
                className="rounded-xl w-full"
              />
              <p className="absolute top-0 bg-black/90 text-white font-bold py-1 px-3 rounded-br-lg rounded-tl-lg">
                {(product.default_price.unit_amount / 100).toLocaleString('en-US', {style:'currency', currency:'USD'})}
              </p>
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/20 w-full h-full" />
            </div>

            <div className="border-[1px] border-white/20 mt-4" />
            <button onClick={()=>onSubmitSubscription(product.default_price.id)} className="font-semibold w-full rounded-lg py-4 mt-4 bg-[#e10865] hover:opacity-75">{loading? 'Loading...' :'BUY PLAN'}</button>
            <div className="my-4">
              {product.metadata.adv.split(',').map((c, id)=>(

              <div key={id} className="flex space-x-2 items-center ">
               
                {id==0 &&  <RiVipCrown2Line className="w-5 h-5" /> }
                {id==1 &&  <AiOutlineHourglass className="w-5 h-5" /> }
                {id==2 &&  <AiOutlineVideoCameraAdd className="w-5 h-5" /> }
                <p>{c}</p>
              </div>
              ))}

             

            </div>
          </div>
  )
}

export default PlanCard