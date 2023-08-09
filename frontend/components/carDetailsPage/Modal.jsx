import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Modal({ imagesPath, onClose }) {

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [walk, setWalk] = useState(0);
  const [sliderPos, setSliderPos] = useState(0)
  const [slideWidth, setSlideWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const sliderRef = useRef();
  const slideRef = useRef();

  useEffect(() => {
    slideRef.current && setSlideWidth(slideRef.current.offsetWidth);
  }, [])

  function handleButtonPrev() {
    sliderRef.current.scrollLeft -= slideWidth;
  }
  function handleButtonNext() {
    sliderRef.current.scrollLeft += slideWidth;
  }
  function handleSliderScroll() {
    const itemsLength = sliderRef.current.children.length;

    for (let i = 0; i < itemsLength; i++) {
      const rect = sliderRef.current.children[i].getBoundingClientRect();
      const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
      if (rect.left >= 0 && rect.right - scrollWidth <= window.innerWidth) {
        setCurrentIndex(i + 1);
        break;
      }
    }
  }
  function handleMouseDown(e) {
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setSliderPos(sliderRef.current.scrollLeft)
  }
  function handleMouseMove(e) {
    if (!isDown) return;
    e.preventDefault();
    setCurrentX(e.pageX - sliderRef.current.offsetLeft)
    setWalk((startX - currentX) * 6);
    sliderRef.current.scrollLeft = sliderPos + walk;
  }
  function handleMouseUp() {
    setIsDown(false)
  }

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <div className="modal">
      <div className="modal-content">
        <div ref={sliderRef} className={`imgs-slider ${isDown ? "grabbing" : ""}`} onScroll={handleSliderScroll} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
          {imagesPath.map(img => <div ref={slideRef} key={img} className="slide"><Image src={`${API_URL}/assets/imgs/${img}`} alt="" fill /></div>)}
        </div>
        <button aria-label="Sluiten" onClick={onClose}>&#10006;</button>
        <button aria-label="Vorige" onClick={handleButtonPrev}>&#10094;</button>
        <button aria-label="Volgende" onClick={handleButtonNext}>&#10095;</button>
        <div className="imgs-count">
          {currentIndex}/{imagesPath.length}
        </div>
      </div>
    </div>
  );
};
