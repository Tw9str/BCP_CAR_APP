import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FaRegTrashAlt } from "react-icons/fa";;
import Dropzone from 'react-dropzone';
import Image from 'next/image';
import { useRouter } from 'next/router';


function AddCustom() {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [productInfo, setProductInfo] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  const token = useSelector(state => state.auth.token);

  const router = useRouter();


  const handleDrop = useCallback(acceptedFiles => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }));
    setFiles([...files, ...newFiles]);
  }, [files]);

  const handleRemove = index => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (files.length < 1) {
      setMessage("Please select a photo");
      return;
    }

    const formData = new FormData();

    const data = { title, description, price, details, productInfo };
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    files.forEach(file => {
      formData.append("images", file);
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/custom/add`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    .then(data => data.json())
    .then(data => {
      if (data.success) {
        setMessage(data.message);
        setTitle("");
        setDescription("");
        setPrice("");
        router.push("/customs");
      } else {
        setMessage(data.message);
      }
    })
    .catch(err => console.log('Error:', err));
  }

  return (
    token && <div className="add-form">
      <div className="container">
        <form onSubmit={handleFormSubmit}>
          <Dropzone 
            accept={{
              'image/jpeg': [],
              'image/png': [],
              'image/webp': [],
            }} 
            onDrop={handleDrop}
          >
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Klik of sleep bestanden hierheen</p>
                </div>
              </section>
            )}
          </Dropzone>
          {files.length > 0 && (
            <div className="thumbnails">
              {files.map((file, index) => (
                <div key={file.name} className="thumbnail">
                  <Image src={file.preview} alt={file.name} width={128} height={96} />
                  <button type="button" onClick={() => handleRemove(index)}><FaRegTrashAlt size={24} /></button>
                </div>
              ))}
            </div>
          )}
          <input type="text" name="title" value={title} placeholder="titel" onChange={e => setTitle(e.target.value)} required />
          <div className="form-inputs">
            <input type="text" name="price" value={price} placeholder="Prijs" onChange={e => setPrice(e.target.value)} required />
            <input type="text" name="description" value={description} placeholder="Beschrijving" onChange={e => setDescription(e.target.value)} required />
          </div>
          <textarea name="product-info" value={productInfo} placeholder="Gegevens" onChange={e => setProductInfo(e.target.value)} />
          <textarea name="details" value={details} placeholder="Details" onChange={e => setDetails(e.target.value)} required />
          {message && <p className='validation'>{message}</p>}
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default AddCustom;
