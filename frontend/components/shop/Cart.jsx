import { useSelector, useDispatch } from "react-redux";
import { increaseItemQuantity, decreaseItemQuantity, removeCartItem, closeCart } from "@/state/cart";
import { loadStripe } from '@stripe/stripe-js';
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";


export default function Cart({ className }) {

  const dispatch = useDispatch();

  const { items, totalPrice, totalQuantity, } = useSelector(state => ({
    items: state.cart.items,
    totalPrice: state.cart.totalPrice,
    totalQuantity: state.cart.totalQuantity
  }));

  
  function handleItemIncrease(id) {
    dispatch(increaseItemQuantity({id}))
  }
  function handleItemDecrease(id) {
    dispatch(decreaseItemQuantity({id}))
  }
  function handleItemRemove(id) {
    dispatch(removeCartItem({id}))
  }
  const handleCartCheckout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });
      const { sessionId } = await response.json();
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error(err);
    }
  };
  
  const options = {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  };

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <div className={`cart${className}`}>
      <div className="cart-container">
        <button aria-label="Sluiten" className="cart-close" onClick={() => dispatch(closeCart())}><AiOutlineClose size={24} /></button>
        <h2>Winkelwagentje</h2>
        {items.length > 0 && <div className="cart-items">
          {items.map(({id, title, price, quantity, img, slug}) => 
          <div className="cart-item" key={id}>
            <Link href={`/shop/${slug}`} className="img-frame">
              <Image src={`${API_URL}/assets/imgs/${img}`} alt={title} fill />
            </Link>
            <div className="item-details">
              <h3 className="item-title">{title}</h3>
              <p className="item-price">{price.toLocaleString("nl-NL", options) + ",-"}</p>
            </div>
            <div className="item-quantity">
              <button aria-label="Minder" onClick={() => handleItemDecrease(id)}><AiOutlineMinus/></button>
              <span>{quantity}</span>
              <button aria-label="Meer" onClick={() => handleItemIncrease(id)}><AiOutlinePlus/></button>
            </div>
            <button aria-label="Verwijder" onClick={() => handleItemRemove(id)}><FaRegTrashAlt/></button>
          </div>
          )}
        </div>}
        {items.length > 0 && <div className="cart-overview">
        <p className="cart-total-label">Artikelen ({totalQuantity})<span>{totalPrice.toLocaleString("nl-NL", options) + ",-"}</span></p>
        <p className="cart-total">Nog te betalen: <span>{totalPrice.toLocaleString("nl-NL", options) + ",-"}</span></p>
        <button onClick={handleCartCheckout} className="checkout">Verder naar bestellen</button>
        </div>}
        {items.length === 0 && <p>Je winkelwagentje is leeg</p>}
      </div>
    </div>
  )
}
