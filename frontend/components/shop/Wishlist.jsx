import { useSelector } from "react-redux";
import { removeWishItem, closeWish } from "@/state/wishlist";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";


export default function Wishlist({ className }) {

  const dispatch = useDispatch();

  const items = useSelector(state => state.wishlist.items);

  
  function handleItemRemove(id) {
    dispatch(removeWishItem({id}))
  }
  
  const options = {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  };

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <div className={`wishlist${className}`}>
      <div className="wishlist-container">
        <button aria-label="sluiten" className="wishlist-close" onClick={() => dispatch(closeWish())}><AiOutlineClose size={24} /></button>
        <h2>Verlanglijstje</h2>
        {items.length > 0 && <div className="wishlist-items">
          {items.map(({id, title, price, img, slug}) => 
          <div className="wishlist-item" key={id}>
            <Link href={`/shop/${slug}`} className="img-frame">
              <Image src={`${API_URL}/assets/imgs/${img}`} alt={title} fill />
            </Link>
            <div className="item-details">
              <h3 className="item-title">{title}</h3>
              <p className="item-price">{price.toLocaleString("nl-NL", options) + ",-"}</p>
            </div>
            <button aria-label="Verwijder" onClick={() => handleItemRemove(id)}><FaRegTrashAlt/></button>
          </div>
          )}
        </div>}
        {items.length === 0 && <p>Je verlanglijstje is leeg</p>}
      </div>
    </div>
  )
}
