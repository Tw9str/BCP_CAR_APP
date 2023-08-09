import React from 'react'
import { FaCheck, FaRegTrashAlt } from 'react-icons/fa'

export default function ReviewButtons({onReviewRemove, onReviewApprove, id, unapproved}) {
  return (
    <div className="review-manage">
      {unapproved && <button aria-label="Akkoord" className="approve" onClick={() => onReviewApprove(id)}><FaCheck size={24}/></button>}
      <button aria-label="Verwijder" className="remove" onClick={() => onReviewRemove(id)}><FaRegTrashAlt size={24}/></button>
    </div>
  )
}
