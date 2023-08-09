import React, { useState, useRef, useEffect } from "react";
import Social from "../widgets/Social";
import Modal from "./Modal";
import Image from "next/image";
import Map from "../widgets/Map";
import Link from "next/link";
import { BsFuelPump, BsCalendar } from "react-icons/bs";
import { TbManualGearbox } from "react-icons/tb";
import { GiRoad, GiMoneyStack } from "react-icons/gi";
import { FiPhoneCall } from "react-icons/fi"
import { useSelector } from 'react-redux';
import Loader from "../widgets/Loader";
import Breadcrumb from "../widgets/Breadcrumb";

export default function CarDetails({car: {make, model, year, km, fuel, price, transmission, description, imagesPath, sold, slug}}) {

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [itemWidth, setItemWidth] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useSelector(state => state.auth.token);

  const elementWidth = useRef();
  const carImgs = useRef();
  const currentImg = useRef();
  const currentSlide = useRef();

  useEffect(() => {
    if (elementWidth.current) {
      setItemWidth(elementWidth.current.clientWidth + 4);
    }
    if (currentSlide.current) {
      setImgWidth(currentSlide.current.offsetWidth);
    }
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isModalOpen]);

  function handleButtonPrev() {
    carImgs.current.scrollBy({
      left: -itemWidth,
      behavior: "smooth",
    });
    currentImg.current.scrollLeft = imgWidth * (currentIndex - 1);
}

  function handleButtonNext() {
    carImgs.current.scrollBy({
      left: itemWidth,
      behavior: "smooth",
    });
    currentImg.current.scrollLeft = imgWidth * (currentIndex + 1);
}

  function handleSliderScroll() {
    const itemsLength = currentImg.current.children.length;

    for (let i = 0; i < itemsLength; i++) {
      const rect = currentImg.current.children[i].getBoundingClientRect();
      const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
      if (rect.left >= 0 && rect.right - scrollWidth <= window.innerWidth) {
        setCurrentIndex(i);
        break;
      }
    }
  }

  function handleImageClick(index) {
    setCurrentIndex(index);
    currentImg.current.scrollLeft = imgWidth * index;
  }

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

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
    <div className="car-page">
      <div className="container">
        <Breadcrumb make={make} slug={slug} />
        <div className="car-title">
          <h1>{make}</h1>
          <h2>{model}</h2>
        </div>
        <div className="car-info-cols">
          <div className="left-col">
            <div className="slider-container">
              <div ref={currentImg} className="current-img" onScroll={handleSliderScroll}>
                {imagesPath.map((src, index) => <div key={index} ref={currentSlide} className="current-slide"><Image src={`${API_URL}/assets/imgs/${src}`} alt={`${make} ${model}`} onClick={() => {setIsModalOpen(true)}} 
                  className={index === currentIndex ? "selected" : ""} priority fill /></div>)}
              </div>
                <button aria-label="Vorige" onClick={handleButtonPrev}>&#10094;</button>
                <button aria-label="Volgende" onClick={handleButtonNext}>&#10095;</button>
                <div className="imgs-count">
                {currentIndex + 1}/{imagesPath.length}
                </div>
            </div>
            {isModalOpen && 
            <Modal imagesPath={imagesPath} onClose={() => setIsModalOpen(false)}/>}
            <div ref={carImgs} className="car-imgs">
              {isLoading && <Loader/>}
              {imagesPath && imagesPath.map((src, index) =><div ref={elementWidth} key={index} className={`img-frame ${index === currentIndex ? "active" : ""}`}>{!hasError && ( <Image src={`${API_URL}/assets/imgs/${src}`} alt={`${make} ${model}`}
                onLoad={handleLoad}
                onError={handleError}
                onClick={() => handleImageClick(index)}
                fill
              />)}</div>)}
              {hasError && <p>Error loading image</p>}
            </div>
            {sold && <div className="sold">Verkocht</div>}
          </div>
          <aside className="right-col">
            <div className="car-info-row">
              <div><BsFuelPump size={24}/>Brandstof:</div><div>{fuel}</div>
            </div>
            <div className="car-info-row">
              <div><TbManualGearbox size={24}/>Transmissie:</div><div>{transmission}</div>
            </div>
            <div className="car-info-row">
              <div><BsCalendar size={24}/>Bouwjaar:</div><div>{year}</div>
            </div>
            <div className="car-info-row">
              <div><GiRoad size={24}/>KM stand:</div><div>{formatter.format(km) + " KM"}</div>
            </div>
            <div className="car-info-row">
              <div><GiMoneyStack size={24}/>Prijs: </div><div>{price.toLocaleString("nl-NL", options) + ",-"}</div>
            </div>
            <Link href="tel: +31634025584"><FiPhoneCall size={24}/> 0634025584</Link>
            <Social/>
          </aside>
        </div>
        <div className="description">
          <h1>{make}</h1>
          <h2>{model}</h2>
          <p>
            {description}
          </p>
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
      <Map/>
      </div>
    </div>
  )
}
