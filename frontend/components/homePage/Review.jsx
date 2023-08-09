import React, { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft, FaRegTrashAlt, FaCheck } from "react-icons/fa";
import { useSelector } from 'react-redux';
import ReviewButtons from '../widgets/ReviewButtons';

export default function Review() {

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [walk, setWalk] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [approvedReviews, setApprovedReviews] = useState([]);
  const [unapprovedReviews, setUnapprovedReviews] = useState([]);

  const sliderRef = useRef();

  const token = useSelector(state => state.auth.token);
  const isAdmin = useSelector(state => state.auth.isAdmin);

  function handleMouseDown(e) {
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  }
  function handleMouseMove(e) {
    if (!isDown) return;
    e.preventDefault();
    setCurrentX(e.pageX - sliderRef.current.offsetLeft);
    setWalk((startX - currentX) * 3);
    sliderRef.current.scrollLeft = scrollLeft + walk;
  }
  function handleMouseUp() {
    setIsDown(false);
  }

  function handleReviewApprove(id) {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/review/approve/${id}`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(_ => setUnapprovedReviews(prevReviews => prevReviews.filter(review => review._id !== id)))
    .catch(err => console.error(err));
  }

  function handleReviewRemove(id) {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/review/delete/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      setApprovedReviews(prevReviews => prevReviews.filter(review => review._id !== id));
      setUnapprovedReviews(prevReviews => prevReviews.filter(review => review._id !== id));
    })
    .catch(err => console.error(err));
  }
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/review`);
        const reviews = await response.json();
        setApprovedReviews(reviews.filter(review => review.approved === true));
        setUnapprovedReviews(reviews.filter(review => !review.approved));
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, []);
  
  return (
    <div className="reviews">
      <div className="container" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        <h1 className="heading">Onze beoordelingen</h1>
        <div ref={sliderRef} className="reviews-list">
          {approvedReviews.length > 0 && approvedReviews.map(({ _id: id, name, review }, index) =>
          <div key={index} className="review">
            <div className="name">{name}</div>
            <FaQuoteLeft />
            <p className="quote">{review}</p>
            {token && isAdmin && <ReviewButtons onReviewRemove={handleReviewRemove} onReviewApprove={handleReviewApprove} id={id} />}
          </div>)}
          {token && isAdmin && unapprovedReviews.length > 0 &&  unapprovedReviews.map(({ _id: id, name, review }, index) =>
          <div key={index} className="review">
            <div className="name">{name}</div>
            <FaQuoteLeft />
            <p className="quote">{review}</p>
            {token && isAdmin && <ReviewButtons onReviewRemove={handleReviewRemove} onReviewApprove={handleReviewApprove} id={id} unapproved={unapprovedReviews.length > 0} />}
          </div>)}
        </div>
      </div>
    </div>
  )
}
