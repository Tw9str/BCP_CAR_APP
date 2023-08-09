import Image from "next/image";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineSell } from "react-icons/md";
import { useSelector } from 'react-redux';
import Link from "next/link";


export default function Custom({ id, title, price, description, imagesPath, slug, inStock, onCustomRemove, onCustomSold }) {
  
  const [isInstock, setIsInstock] = useState(inStock);
  const token = useSelector(state => state.auth.token);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  
  const options = {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  };

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <Link className="custom" href={`/customs/${slug}`} >
      <div className="img-frame">
        <Image src={`${API_URL}/assets/imgs/${imagesPath[0]}`} alt={`he`} fill priority />
        {token && isAdmin && <div className="custom-manage">
          <button aria-label="Verkocht zetten" onClick={(e) => {
            e.preventDefault();
            onCustomSold(id);
            setIsInstock(!isInstock);
          }}><MdOutlineSell/></button>
          <button aria-label="Verwijder" onClick={(e) => {
            e.preventDefault();
            onCustomRemove(id);
        }}><FaRegTrashAlt/></button>
        </div>}
        {!isInstock && <div className="sold">Niet op voorraad</div>}
      </div>
      <div className="custom-details">
        <div className="custom-title">
          <h1>{title}</h1>
          <h2>{description}</h2>
        </div>
        <div className="price">
          <div>{price.toLocaleString("nl-NL", options) + ",-"}</div>
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
              "url": "${API_URL}/customs/${slug}",
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
