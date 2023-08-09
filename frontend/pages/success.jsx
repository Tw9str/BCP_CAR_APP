import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { clearCart } from "@/state/cart"
import Link from "next/link";
import Image from "next/image";


export default function Success() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart())
  }, [])

  return (
    <div className="post-payment">
      <div className="container">
        <div className="details">
          <Image src="/assets/payment-success.svg" alt="Payment Success" width={280} height={151}/>
          <span>Je betaling is gelukt!</span>
          <p>Bedankt voor uw betaling.</p>
        </div>
        <Link className="redirect-btn" href="/shop">Verder Winkelen</Link>
      </div>
    </div>
  )
}
