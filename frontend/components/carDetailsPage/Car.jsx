import Image from "next/image";
import { useState } from "react";
import { BsFuelPump, BsCalendar } from "react-icons/bs";
import { TbManualGearbox } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineSell } from "react-icons/md";
import { GiRoad } from "react-icons/gi";
import { useSelector } from 'react-redux';
import Link from "next/link";


export default function Car({onCarRemove, onCarSold, id, make, model, year, km, fuel, price, transmission, description, imagesPath, slug, sold, forwardedRef}) {

  const [isSold, setIsSold] = useState(sold);
  const token = useSelector(state => state.auth.token);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  
  const options = {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  };

  const kmOptions = {
    style: 'decimal',
    minimumFractionDigits: 0
  };

  const formatter = new Intl.NumberFormat('nl-NL', kmOptions);

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <Link ref={forwardedRef} key={id} className="car" href={`/occasions/${slug}`} >
      <div className="img-frame">
        <Image src={`${API_URL}/assets/imgs/${imagesPath[0]}`} alt={`${make} ${model}`} fill priority />
        {token && isAdmin && <div className="car-manage">
          <button aria-label="Verkocht zetten" onClick={(e) => {
            e.preventDefault();
            onCarSold(id);
            setIsSold(!isSold);
          }}><MdOutlineSell/></button>
          <button aria-label="Verwijder" onClick={(e) => {
            e.preventDefault();
            onCarRemove(id);
        }}><FaRegTrashAlt/></button>
        </div>}
        {isSold && <div className="sold">Verkocht</div>}
      </div>
      <div className="car-details">
        <div className="upper-row">
          <div className="car-title">
            <h1>{make}</h1>
            <h2>{model}</h2>
          </div>
        </div>
        <div className="lower-row">
          <div className="car-info">
            <div className="upper-col">
              <div><BsFuelPump size={24}/>{fuel}</div>
              <div><TbManualGearbox size={24}/>{transmission}</div>
            </div>
            <div className="lower-col">
              <div><BsCalendar size={24}/>{year}</div>
              <div><GiRoad size={24}/>{formatter.format(km) + " KM"}</div>
            </div>
          </div>
          <div className="price">
            <div>{price.toLocaleString("nl-NL", options) + ",-"}</div>
          </div>
        </div>
      </div>
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": ${make},
            "image": "${API_URL}/assets/${imagesPath[0]}",
            "description": "${make}- ${model} ${description}.",
            "make": {
              "@type": "make",
              "name": "${make}"
            },
            "offers": {
              "@type": "Offer",
              "url": "${API_URL}/occasions/${slug}",
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
