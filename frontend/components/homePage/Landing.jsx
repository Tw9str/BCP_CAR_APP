import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RxDoubleArrowDown, RxPencil1 } from "react-icons/rx";
import EditableInput from "../widgets/EditableInput";
import { useSelector, useDispatch } from "react-redux";
import { setIsEditMode, setIsFileEdit } from "@/state";

const Landing = ({ pageContent: { bannerText, bannerText2, btnText, bannerImg } }) => {

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
    <div className="landing" onClick={() => setIsActive(!isActive)}>
      <div className="container">
      {isAdmin && <button className={`edit-btn bg-edit-btn${classNameActive}`} onClick={handleFieldEdit} id="bannerImg" aria-label="Bewerken"><RxPencil1 /></button>}
        <Image src={`${API_URL}/assets/imgs/${bannerImg}`} alt="Car Website Background" priority fill />
        <div className="hero-banner">
          {idEditMode && <EditableInput name={fieldName} />}
          {isFileEdit && <EditableInput fileName={fieldName} />}
          <div className="hero-title">
            <div className="headlines">
              <div className="heading editable">
                <h1>{bannerText}</h1>
                {isAdmin && <button className={`edit-btn ${classNameActive}`} onClick={handleFieldEdit} id="bannerText" aria-label="Bewerken"><RxPencil1 /></button>}
              </div>
              <div className="sub editable">
                <h2>{bannerText2}</h2>
                {isAdmin && <button className={`edit-btn ${classNameActive}`} onClick={handleFieldEdit} id="bannerText2" aria-label="Bewerken"><RxPencil1 /></button>}
              </div>
            </div>
            <div className="action editable">
              <Link href="/occasions">{btnText}</Link>
              {isAdmin && <button className={`edit-btn ${classNameActive}`} onClick={handleFieldEdit} id="btnText" aria-label="Bewerken"><RxPencil1 /></button>}
            </div>
          </div>
          <Link aria-label="Occasions" href="#occasions">
            <RxDoubleArrowDown />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
