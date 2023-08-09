import Image from "next/image";
import { addCartItem } from "@/state/cart";
import { addWishItem, removeWishItem } from "@/state/wishlist";
import { setIsCartOpen } from "@/state/cart";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { useState } from "react";
import Link from "next/link";
import { FaRegTrashAlt, FaCartPlus } from "react-icons/fa";
import { MdOutlineSell } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


export default function Product({ id, title, price, description, imagesPath, slug, inStock, onProductRemove, onProductSold }) {

  const [isInstock, setIsInstock] = useState(inStock);
  const token = useSelector(state => state.auth.token);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const items = useSelector(state => state.wishlist.items);

  const isInWishlist = items.some(item => item.id === id);

  const dispatch = useDispatch();

  const item = {
    id,
    title,
    price,
    imagesPath: imagesPath[0],
    slug,
  }

  function handleItemAdd(e) {
    e.preventDefault();
    dispatch(addCartItem({
      newItem: item,
    }))
    dispatch(setIsCartOpen())
  }
  
  function handleWishAdd(e) {
    e.preventDefault();
    if (isInWishlist) {
      dispatch(removeWishItem({
        id,
      }));
    } else {
      dispatch(addWishItem({
        newItem: item,
      }));
    }
  }
  

  const options = {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  };

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <Link className="product" href={`/shop/${slug}`} >
      <div className="img-frame">
        <Image src={`${API_URL}/assets/imgs/${imagesPath[0]}`} alt={`he`} fill priority />
        {token && isAdmin && <div className="product-manage">
          <button aria-label="Verkocht zetten" onClick={(e) => {
            e.preventDefault();
            onProductSold(id);
            setIsInstock(!isInstock);
          }}><MdOutlineSell/></button>
          <button aria-label="Verwijder" onClick={(e) => {
            e.preventDefault();
            onProductRemove(id);
        }}><FaRegTrashAlt/></button>
        </div>}
        {!isInstock && <div className="sold">Niet op voorraad</div>}
      </div>
      <div className="product-details">
        <div className="product-title">
          <h1>{title}</h1>
          <h2>{description}</h2>
        </div>
        <div className="price">
          <div>{price.toLocaleString("nl-NL", options) + ",-"}</div>
        </div>
        <div className="checkout">
          <button onClick={handleWishAdd} aria-label="In wishlist">{isInWishlist ? <AiFillHeart /> : <AiOutlineHeart />}</button>
          <button onClick={handleItemAdd} aria-label="In Winkelwagen"><FaCartPlus/></button>
        </div>
      </div>
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": ${title},
            "image": "${API_URL}/assets/${imagesPath[0]}",
            "description": "${title}- ${description} ${description}.",
            "make": {
              "@type": "make",
              "name": "${title}"
            },
            "offers": {
              "@type": "Offer",
              "url": "${API_URL}/shop/${slug}",
              "priceCurrency": "EUR",
              "price": "${price}",
              "priceValidUntil": "2030-12-31",
              "availability": "http://schema.org/InStock"
            }
          }
        `}
      </script>
    </Link>
  )
}
