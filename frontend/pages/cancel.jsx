import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { closeCart } from "@/state/cart";
import Link from "next/link";
import Image from "next/image";

export default function Cancel() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeCart())
  }, [])

  return (
    <div className="post-payment">
      <div className="container">
        <div className="details">
          <Image src="/assets/payment-fail.webp" alt="Payment Failure" width={280} height={151}/>
          <span>Je betaling is mislukt!</span>
          <p>Kies alsjeblieft een andere betaalmethode of probeer het opnieuw.</p>
        </div>
        <Link className="redirect-btn" href="/shop">Verder Winkelen</Link>
      </div>
    </div>
  )
}
