import React, { useState } from "react";

export default function AddReview() {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/review/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, review }),
      }
    )
      .then((data) => data.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.log(err));
    setName("");
    setReview("");
  };

  return (
    <div className="review-form">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          placeholder="Naam"
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          type="text"
          name="feedback"
          value={review}
          placeholder="Feedback"
          onChange={(e) => setReview(e.target.value)}
        />
        {message && <p className="validation">{message}</p>}
        <button type="submit">Verzenden</button>
      </form>
    </div>
  );
}
