import React, { useState, useEffect, useRef } from 'react';
import Car from '../carDetailsPage/Car';
import Social from '../widgets/Social';
import { useSelector } from 'react-redux';
import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from 'next/link';

const Listings = ({ cars }) => {
  
  const [carList, setCarList] = useState(cars);
  const [isDown, setIdDown] = useState(false)
  const [x, setX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [walk, setWalk] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const token = useSelector(state => state.auth.token);
  const isAdmin = useSelector(state => state.auth.isAdmin);

  const sliderContainer = useRef(null);

  function handleButtonPrev() {
    sliderContainer.current.scrollBy({
      left: -sliderContainer.current.offsetWidth,
      behavior: 'smooth'
    });
}

  function handleButtonNext() {
    sliderContainer.current.scrollBy({
      left: sliderContainer.current.offsetWidth,
      behavior: 'smooth'
    });
}

  function handleMouseDown(e) {
    setIdDown(true);
    setX(e.pageX);
    setScrollLeft(sliderContainer.current.scrollLeft);
  }
  function handleMouseLeave() {
    setIdDown(false)
  }
  function handleMouseUp() {
    setIdDown(false);
  }
  function handleMouseMove(e) {
    if (!isDown)  return;
    e.preventDefault();
    setCurrentX(e.pageX);
    setWalk((currentX - x) * 3);
    sliderContainer.current.scrollLeft = scrollLeft - walk;
  }

  function handleCarSold(id) {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/car/update/${id}`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
    })
    .catch(err => console.error(err));
  }

  function handleCarRemove(id) {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/car/delete/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      setCarList(prevCars => prevCars.filter(car => car._id !== id));
    })
    .catch(err => console.error(err));
  }

  return (
    <div id="occasions" className="listings">
      <div className="container">
        <h1 className="heading">Occasions</h1>
        <Link className="view-all" href="/occasions">Alles bekijken</Link>
        <div ref={sliderContainer} className="cars" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp} >
        {carList.length < 1 && <p className="no-results">Er zijn momenteel geen producten...</p>}
          {carList && carList.length > 0 && carList.map(({ _id, make, model, year, km, fuel, price, transmission, description, imagesPath, sold, slug }) => 
          <Car key={_id} onCarRemove={handleCarRemove} onCarSold={handleCarSold} id={_id} make={make} model={model} year={year} km={km} fuel={fuel} price={price} transmission={transmission} description={description} imagesPath={imagesPath} sold={sold} slug={slug} />)}
          {token && isAdmin && <Link aria-label="Toevoegen" className="plus-icon" href="/add/car"><AiOutlinePlusSquare/></Link>}
        </div>
        <div className="slider-btns">
          <button aria-label="Prevoius Slide" className="prev-button" onClick={handleButtonPrev}><FaChevronLeft /></button>
          <button aria-label="Next Slide" className="next-button" onClick={handleButtonNext}><FaChevronRight /></button>
        </div>
        <div className="social">
          <div>Volg ons</div>
          <Social />
        </div>
      </div>
    </div>
  )
}

export default Listings
