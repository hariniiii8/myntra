import React, { useState } from 'react';

import './DesignForm.css';
import upload_area from '../Assets/upload_area.svg'

const DesignForm = () => {
  const [image, setImage] = useState(false);
  const [designDetails, setDesignDetails] = useState({
    name: "",
    image: "",
    category: "",
    gender: ""
  })

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) => {
    setDesignDetails({ ...designDetails, [e.target.name]: e.target.value })
  }
  const Submit_Design = async () => {
    console.log(designDetails);
    let responseData;
    let design = designDetails;

    let formData = new FormData();
    formData.append('design', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,

    }).then((resp) => resp.json()).then((data) => { responseData = data })
    if (responseData.success) {
      design.image = responseData.image_url;
      console.log(design);

      await fetch('http://localhost:4000/submitdesign', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(design),

      }).then((resp) => resp.json()).then((data) => {
        data.success ? alert("Design Submitted") : alert("Failed to submit")
      })
    }

  }

  return (
    <form>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          value={designDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          required
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select name="category" className='design-select' id="category" value={designDetails.category}
          onChange={changeHandler}
        >
          <option value="pant">Pants</option>
          <option value="top">Tops</option>
          <option value="dress">Dresses</option>
          <option value="ethnic">Ethnic</option>
        </select>
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select name="gender" className='design-selector' id="gender" value={designDetails.gender}
          onChange={changeHandler}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="girl">Girls</option>
          <option value="boy">Boys</option>
        </select>
      </div>
      <div>
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} className="thumbnail-image" alt="Upload Preview" />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>
      <button type="button" onClick={() => Submit_Design()}>
        Submit Design
      </button>
    </form>

  );
};

export default DesignForm;
