import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FiUser, FiUserX } from "react-icons/fi";
import { MdOutlineLightMode, MdOutlineModeNight } from "react-icons/md";
import { useSelector } from 'react-redux';
import { setLogout, setIsLightMode } from '@/state';
import { useDispatch } from 'react-redux';
import { setIsCartOpen } from "@/state/cart"
import Cart from '../shop/Cart';
import Wishlist from '../shop/Wishlist';
import { setIsWishOpen } from '@/state/wishlist';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {

  const [isActive, setIsActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const isCartOpen = useSelector(state => state.cart.isCartOpen);
  const isWishOpen = useSelector(state => state.wishlist.isWishOpen);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const token = useSelector(state => state.auth.token);
  const isLightMode = useSelector(state => state.auth.isLightMode);
  const dispatch = useDispatch();

  function handleMenuClick() {
    setIsActive(!isActive)
  }

  useEffect(() => {
    if (isActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isActive]);

  useEffect(() => {
    const html = document.documentElement;
    html.className = isLightMode ? "light" : "";
  }, [isLightMode])

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    };


    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const header = document.querySelector(".header");
    header.classList.toggle("sticky", scrollY > 480);
  }, [scrollY]);

  return (
    <div className='header'>
      <div className="container">
        <nav>
          <div className="nav-menu">
            <div className="mob-nav">
              <button aria-label="Menu Openen" className="menu-icon" onClick={handleMenuClick}>
                {isActive ? <AiOutlineClose/> : <AiOutlineMenu/>}
              </button>
              <ul className={`menu-container ${isActive ? "active" : ""}`} onClick={handleMenuClick}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/occasions">Occasions</Link></li>
                <li><Link href="/shop">Shop</Link></li>
                <li><Link href="/customs">Customs</Link></li>
                <li><Link href="/over-ons">Over ons</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className='logo'>
              <Link aria-label="logo" href="/"><Image src="/assets/Logo.png" width={78} height={72} alt="BCP Logo" priority /></Link>
            </div>
            <ul className="menu">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/occasions">Occasions</Link></li>
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/customs">Customs</Link></li>
              <li><Link href="/over-ons">Over ons</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <button aria-label="Switch Theme" onClick={() => dispatch(setIsLightMode())}>{isLightMode ? <MdOutlineModeNight size={24} /> : <MdOutlineLightMode size={24} />}</button>
          <div className="account">
            {token ? <Link href="/"><button aria-label="Uitloggen" className="log-out" onClick={() => dispatch(setLogout())}><FiUserX size={24} /></button></Link> : <Link href="/auth/login"><button aria-label="Inloggen"><FiUser size={24}/></button></Link>}
            <button className="wish-btn" onClick={() => dispatch(setIsWishOpen())} aria-label="Wishlist Bekijken"><AiOutlineHeart size={24}/></button>
            <button className="cart-btn" onClick={() => dispatch(setIsCartOpen())} aria-label="Winkelwagen Bekijken"><AiOutlineShoppingCart size={24}/>{totalQuantity > 0 && <span>{totalQuantity}</span>}</button>
          </div>
          <Cart className={isCartOpen ? " open" : ""} />
          <Wishlist className={isWishOpen ? " open" : ""} />
        </nav>
      </div>
    </div>
  )
}

export default Header