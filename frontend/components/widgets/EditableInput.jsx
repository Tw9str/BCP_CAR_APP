import { setIsEditMode, setIsFileEdit } from "@/state";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";

export default function EditableInput({ name, fileName }) {

  const [editedValue, setEditedValues] = useState("");
  const [inputFileName, setInputFileName] = useState("");
  const [message, setMessage] = useState("");

  const token = useSelector(state => state.auth.token);
  
  const dispatch = useDispatch();

  function handleEditOff() {
    dispatch(setIsEditMode(false));
    dispatch(setIsFileEdit(false));
  }

  const formData = new FormData();

  formData.append(name ?? fileName, editedValue);

  function handleFormSubmit(e) {
    e.preventDefault();
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pageContent/update`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.log(err));
  }
  
  return (
    <div className="edit-input">
      <form onSubmit={handleFormSubmit}>
        {!fileName && <input type="text" value={editedValue} placeholder={name} onChange={(e) => setEditedValues(e.target.value)} required />}
        {fileName && <label>{inputFileName.split("\\")[2] ?? "Geen bestand gekozen"}<input type="file" required onChange={(e) => {
          setEditedValues(e.target.files[0]);
          setInputFileName(e.target.value);
          }}/></label>}
        <div className="panel-btns">
          <button className="exit" onClick={handleEditOff}><AiOutlineClose size={24} /></button>
          <input type="submit" value="OK" />
        </div>
        <p>{message}</p>
      </form>
    </div>
  )
}
