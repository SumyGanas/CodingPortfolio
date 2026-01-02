import { useState } from 'react';
import axios from 'axios';

const useFormdata = (functionUrl) => {
    const [formData, setFormData] = useState({
      skin_types: '',
      skin_concerns: '',
      hair_types: '',
      hair_concerns: '',
      makeup_preferences: '',
    });
  
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [initialScreen, setInitialScreen] = useState(true);
    const [error, setError] = useState('');
   
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData( prev => ({
        ...prev,
        [name]: value
      }));
    };

    var err = null;
    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      setError('');
    if (
      !formData.skin_types ||
      !formData.skin_concerns ||
      !formData.hair_types ||
      !formData.hair_concerns ||
      !formData.makeup_preferences
    ) {
      setError('Please select all options');
      return;
    }
      console.log('Form Data:', formData);
      try {
        setInitialScreen(false);
        const res = await axios.post(functionUrl, formData);
        console.log('Response:', res.data);
        setResponse(res.data);
        setLoading(false);
      } catch (error) {
          console.log(err)
          setError('The server is having internal issues. Plase try again.');
          setInitialScreen(false);
          setLoading(false);
          err = error
      }
    };

    const handleDealSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      try {
        setInitialScreen(false);
        const res = await axios.post(functionUrl, {todays_deals: 'todays_deals'});
        console.log('Response:', res.data);
        setResponse(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        err = error
        setInitialScreen(false);
        setLoading(false);
      }
    };
  
    return {
      initialScreen,
      response,
      loading,
      err,
      formData,
      handleChange,
      handleSubmit,
      error,
      handleDealSubmit
    };
    

  };
  
  
  export default useFormdata;