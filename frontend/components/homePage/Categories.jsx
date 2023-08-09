import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RxPencil1 } from 'react-icons/rx';
import EditableInput from '../widgets/EditableInput';
import { useDispatch, useSelector } from 'react-redux';
import { setIsEditMode, setIsFileEdit } from '@/state';

export default function Categories({pageContent: { shopText, shopText2, btnShopText, shopImg, customText, customText2, btnCustomText ,customImg }}) {

  const [isActive, setIsActive] = useState(false);
  const [fieldName, setFieldName] = useState("");
  
  const classNameActive = isActive ? " active" : "";

  const isAdmin = useSelector(state => state.auth.isAdmin);
  const idEditMode = useSelector(state => state.auth.isEditMode);
  const isFileEdit = useSelector(state => state.auth.isFileEdit);

  const dispatch = useDispatch();

  function handleFieldEdit(e) {
    setFieldName(e.currentTarget.id);
    e.currentTarget.id.includes("Img") ? dispatch(setIsFileEdit(true)) : dispatch(setIsEditMode(true));
  }

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <div className="categories" onClick={() => setIsActive(!isActive)}>
      {idEditMode && <EditableInput name={fieldName} />}
      {isFileEdit && <EditableInput fileName={fieldName} />}
      <div className="container">
        <div className="car-shop">
        {isAdmin && <button className={`edit-btn bg-edit-btn${classNameActive}`} onClick={handleFieldEdit} id="shopImg" aria-label="Bewerken"><RxPencil1 /></button>}
          <Image src={`${API_URL}/assets/imgs/${shopImg}`} alt="Car Website Background" fill />
          <div className="shop-info">
            <div className="desc">
              <div className="heading editable">
                <h2>{shopText}</h2>
                {isAdmin && <button className={`edit-btn${classNameActive}`} onClick={handleFieldEdit} id="shopText" aria-label="Bewerken"><RxPencil1 /></button>}
              </div>
              <div className="sub editable">
                <p>{shopText2}</p>
                {isAdmin && <button className={`edit-btn${classNameActive}`} onClick={handleFieldEdit} id="shopText2" aria-label="Bewerken"><RxPencil1 /></button>}
              </div>
            </div>
            <div className="action editable">
              <Link href="/shop">{btnShopText}</Link>
              {isAdmin && <button className={`edit-btn${classNameActive}`} onClick={handleFieldEdit} id="btnShopText" aria-label="Bewerken"><RxPencil1 /></button>}
            </div>
          </div>
        </div>
        <div className="car-parts">
          {isAdmin && <button className={`edit-btn bg-edit-btn${classNameActive}`} onClick={handleFieldEdit} id="customImg" aria-label="Bewerken"><RxPencil1 /></button>}
          <Image src={`${API_URL}/assets/imgs/${customImg}`} alt="Car Website Background" fill />
          <div className="shop-info">
            <div className="desc">
              <div className="heading editable">
                <h2>{customText}</h2>
                {isAdmin && <button className={`edit-btn${classNameActive}`} onClick={handleFieldEdit} id="customText" aria-label="Bewerken"><RxPencil1 /></button>}
              </div>
              <div className="sub editable">
                <p>{customText2}</p>
                {isAdmin && <button className={`edit-btn${classNameActive}`} onClick={handleFieldEdit} id="customText2" aria-label="Bewerken"><RxPencil1 /></button>}
              </div>
            </div>
            <div className="action editable">
              <Link href="/customs">{btnCustomText}</Link>
              {isAdmin && <button className={`edit-btn${classNameActive}`} onClick={handleFieldEdit} id="btnCustomText" aria-label="Bewerken"><RxPencil1 /></button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
