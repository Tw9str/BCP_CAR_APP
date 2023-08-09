import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FaRegTrashAlt } from "react-icons/fa";;
import Dropzone from 'react-dropzone';
import Image from 'next/image';
import { useRouter } from 'next/router';

function AddCar() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [km, setKm] = useState('');
  const [year, setYear] = useState('');
  const [fuel, setFuel] = useState('Benzine');
  const [price, setPrice] = useState('');
  const [transmission, setTransmission] = useState('Handgeschakeld');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (files.length < 1) {
      setMessage("Please select a photo");
      return;
    }

    const formData = new FormData();

    const data = { make, model, km, year, fuel, price, transmission, description };
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    files.forEach(file => {
      formData.append("images", file);
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/car/add`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setMessage(data.message);
        setMake('');
        setModel('');
        setKm('');
        setYear('');
        setPrice('');
        setDescription('');
        setFiles([]);
        router.push("/occasions");
      } else {
        setMessage(data.message);
      }
    })
    .catch(err => console.log('Error:', err));
  };

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
            <input type="text" aria-label="Merk" name="make" value={make} placeholder="Merk" onChange={e => setMake(e.target.value)} required />
          <div className="form-inputs">
            <div>
              <input type="text" aria-label="Model" name="model" value={model} placeholder="Model" onChange={e => setModel(e.target.value)} required />
              <input type="text" aria-label="Jaar" name="year" value={year} placeholder="Bouwjaar" onChange={e => setYear(e.target.value)} required />
              <input type="text" aria-label="KM stand" name="km" value={km} placeholder="KM stand" onChange={e => setKm(e.target.value)} required />
            </div>
            <div>
              <input type="text" aria-label="Prijs" name="price" value={price} placeholder="Prijs" onChange={e => setPrice(e.target.value)} required />
              <select onChange={e => setFuel(e.target.value)}>
                <option value="Benzine">Benzine</option>
                <option value="Diesel">Diesel</option>
                <option value="Elektrisch">Elektrisch</option>
                <option value="Hybride">Hybride</option>
              </select>
              <select onChange={e => setTransmission(e.target.value)}>
                <option value="Handgeschakeld">Handgeschakeld</option>
                <option value="Automaat">Automaat</option>
              </select>
            </div>
          </div>
          <textarea name="description" aria-label="Beschrijving" value={description} placeholder="Beschrijving" onChange={e => setDescription(e.target.value)} required />
          {message && <p className='validation'>{message}</p>}
          <button aria-label="Akkoord" type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default AddCar;
