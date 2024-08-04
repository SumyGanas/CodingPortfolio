import React, { useState } from 'react';
import axios from 'axios';


const function_url = 'https://receive-query-dy3kdkbuyq-uc.a.run.app'

const formDataHandler = (functionUrl) => {
    const [formData, setFormData] = useState({
      skin_types: '',
      skin_concerns: '',
      hair_types: '',
      hair_concerns: '',
      makeup_preferences: '',
    });
  
    const [response, setResponse] = useState(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Form Data:', formData);
      try {
        const res = await axios.post(functionUrl, formData);
        console.log('Response:', res.data);
        setResponse(res.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return {
      formData,
      response,
      handleChange,
      handleSubmit
    };
  };
  
  export default formDataHandler;