import React, { useState, useRef, useEffect } from "react";
import Social from "../widgets/Social";
import Image from "next/image";
import Map from "../widgets/Map";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../widgets/Loader";
import Breadcrumb from "../widgets/Breadcrumb";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { addCartItem, setIsCartOpen } from "@/state/cart";
import { addWishItem, removeWishItem } from "@/state/wishlist";

export default function ProductDetails({product: {_id: id, title, description, price, details, productInfo, imagesPath, inStock, slug}}) {

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [itemWidth, setItemWidth] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);


  const token = useSelector(state => state.auth.token);
  const items = useSelector(state => state.wishlist.items);


  const elementWidth = useRef();
  const carImgs = useRef();
  const currentImg = useRef();
  const currentSlide = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (elementWidth.current) {
      setItemWidth(elementWidth.current.clientWidth + 4);
    }
    if (currentSlide.current) {
      setImgWidth(currentSlide.current.offsetWidth);
    }
  }, [])


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

  const item = {
    id,
    title,
    price,
    imagesPath: imagesPath[0],
    slug,
  }

  const isInWishlist = items.some(item => item.id === id);


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

  const kmOptions = {
    style: 'decimal',
    minimumFractionDigits: 0
  };

  const formatter = new Intl.NumberFormat('nl-NL', kmOptions);

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <div className="product-page">
      <div className="container">
        <Breadcrumb make={title} slug={slug} />
        <div className="product-title">
          <h1>{title}</h1>
          <h2>{description}</h2>
        </div>
        <div className="product-info-cols">
          <div className="left-col">
            <div className="slider-container">
              <div ref={currentImg} className="current-img" onScroll={handleSliderScroll}>
                {imagesPath.map((src, index) => <div key={index} ref={currentSlide} className="current-slide"><Image src={`${API_URL}/assets/imgs/${src}`} alt={`${title} ${description}`}
                  className={index === currentIndex ? "selected" : ""} priority fill /></div>)}
              </div>
                <button aria-label="Vorige" onClick={handleButtonPrev}>&#10094;</button>
                <button aria-label="Volgende" onClick={handleButtonNext}>&#10095;</button>
                <div className="imgs-count">
                {currentIndex + 1}/{imagesPath.length}
                </div>
            </div>
            <div ref={carImgs} className="product-imgs">
              {isLoading && <Loader/>}
              {imagesPath && imagesPath.map((src, index) =><div ref={elementWidth} key={index} className={`img-frame ${index === currentIndex ? "active" : ""}`}>{!hasError && ( <Image src={`${API_URL}/assets/imgs/${src}`} alt={`${title} ${description}`}
                onLoad={handleLoad}
                onError={handleError}
                onClick={() => handleImageClick(index)}
                fill
              />)}</div>)}
              {hasError && <p>Error loading image</p>}
            </div>
            {!inStock && <div className="sold">Niet op voorraad</div>}
          </div>
          <aside className="right-col">
            <div className="product-info-row">
              <div className="price">{price.toLocaleString("nl-NL", options) + ",-"}</div>
            </div>
            <div className="product-info-row">
              {inStock ? <div className="stock">Op voorraad</div> : <div className="out">Niet op voorraad</div>}
            </div>
            <div className="product-info-row">
              <p className="info">{productInfo}</p>
            </div>
            <div className="product-info-row">
              <div className="shipping">{inStock && "Vandaag besteld, morgen in huis"}</div>
            </div>
            <div className="checkout">
              <button onClick={handleWishAdd} aria-label="In wishlist">{isInWishlist ? <AiFillHeart /> : <AiOutlineHeart />}</button>
              <button onClick={handleItemAdd} aria-label="In Winkelwagen"><FaCartPlus /></button>
            </div>
            <Social/>
          </aside>
        </div>
        <div className="description">
          <h1>{title}</h1>
          <h2>{description}</h2>
          <p>
            {details}
          </p>
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
      <Map/>
      </div>
    </div>
  )
}
