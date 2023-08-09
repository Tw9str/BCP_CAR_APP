import React, { useState } from 'react';
import Link from 'next/link';
import Car from '../carDetailsPage/Car';
import Social from '../widgets/Social';
import { useSelector } from 'react-redux';
import { AiOutlinePlusSquare } from "react-icons/ai";
import Breadcrumb from '../widgets/Breadcrumb';
import Filter from '../widgets/Filter';

export default function Listings ({ cars }) {
  
  const [carList, setCarList] = useState(cars);
  const token = useSelector(state => state.auth.token);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  
  function handleCarSold(id) {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/car/update/${id}`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`
      }
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

  const filters = {
    val1: "km",
    val2: "year",
    title1: "KM stand",
    title2: "Bouwjaar"
  }

  return (
    <div className="cars-page">
      <div className="container">
        <div className="panel-wrapper">
          <Breadcrumb />
          <Filter filters={filters} />
        </div>
        <h1 className="heading">Occasions</h1>
        <div className="cars" >
          {carList.length < 1 && <p className="no-results">Er zijn momenteel geen producten...</p>}
          {carList && carList.length > 0 && carList.map(({ _id, make, model, year, km, fuel, price, transmission, description, imagesPath, sold, slug }) => 
          <Car key={_id} onCarRemove={handleCarRemove} onCarSold={handleCarSold} id={_id} make={make} model={model} year={year} km={km} fuel={fuel} price={price} transmission={transmission} description={description} imagesPath={imagesPath} sold={sold} slug={slug} />)}
          {token && isAdmin && <Link aria-label="Toevoegen" className="plus-icon" href="/add/car"><AiOutlinePlusSquare/></Link>}
        </div>
        <div className="social">
          <div>Volg ons</div>
          <Social />
        </div>
      </div>
    </div>
  )
}

