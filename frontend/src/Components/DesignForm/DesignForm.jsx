import React, { useState } from 'react';
import './DesignForm.css';
import upload_area from '../Assets/upload_area.svg';

const DesignForm = () => {
  const [image, setImage] = useState(false);
  const [designDetails, setDesignDetails] = useState({
    name: "",
    image: "",
    category: "",
    gender: ""
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setDesignDetails({ ...designDetails, [e.target.name]: e.target.value });
  };

  const Submit_Design = async () => {
    console.log('Submitting Design:', designDetails);
    let responseData;
    let design = designDetails;

    let formData = new FormData();
    formData.append('design', image);

    try {
      const uploadResponse = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });
      
      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }

      responseData = await uploadResponse.json();
      
      if (responseData.success) {
        design.image = responseData.image_url;
        console.log('Design after image upload:', design);

        const submitResponse = await fetch('http://localhost:4000/submitdesign', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(design),
        });
        
        if (!submitResponse.ok) {
          throw new Error('Failed to submit design');
        }

        const submitData = await submitResponse.json();
        
        if (submitData.success) {
          alert("Design Submitted");
        } else {
          alert("Failed to submit design");
        }
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  };

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
        <select
          name="category"
          className='design-select'
          id="category"
          value={designDetails.category}
          onChange={changeHandler}
        >
          <option value="pant">Pants</option>
          <option value="tops">Tops</option>
          <option value="dresses">Dresses</option>
          <option value="ethnic">Ethnic</option>
        </select>
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select
          name="gender"
          className='design-selector'
          id="gender"
          value={designDetails.gender}
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
      <button type="button" onClick={Submit_Design}>
        Submit Design
      </button>
    </form>
  );
};

export default DesignForm;
