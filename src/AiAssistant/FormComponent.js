import React from 'react';
import Form from 'react-bootstrap/Form';
import formDataHandler from './formDataHandler'; 


const function_url = 'https://receive-query-dy3kdkbuyq-uc.a.run.app'

const FormComponent = () => {
    const { formData, handleChange, handleSubmit } = formDataHandler(function_url);


    const skinTypeOptions = ['Dry','Oily']
    const skinConcernsOptions = ['Acne and/or Dark Spots', 'Redness and/or Wrinkles']
    const hairTypeOptions = ['Straight', 'Curly']
    const hairConcernsOptions = ['Damaged and/or Frizzy', 'Brittle and/or Color-treated']
    const makeupPrefOptions = ['Light/Daily', 'Bold/Glam']

  return (
    <Form onSubmit={handleSubmit}>
        <div key={`inline-${type}`} className="mb-3">
        {skinTypeOptions.map(option => (
          <Form.Check
            key={option}
            inline
            label={option}
            name="skin_type"
            type="radio"
            id={`skinType-${option}`}
            value={option}
            checked={formData.skin_types === option}
            onChange={handleChange}
            />
        ))}
          </div>
        <div key={`inline-${type}`} className="mb-3">
        {skinConcernsOptions.map(option => (
            <Form.Check
            key={option}
            inline
            label={option}
            name="skin_concerns"
            type="radio"
            id={`skinConcerns-${option}`}
            value={option}
            checked={formData.skin_concerns === option}
            onChange={handleChange}
          />
          ))}
        </div>
        <div key={`inline-${type}`} className="mb-3">
        {hairTypeOptions.map(option => (
        <Form.Check
            key={option}
            inline
            label={option}
            name="hair_type"
            type="radio"
            id={`hairType-${option}`}
            value={option}
            checked={formData.hair_types === option}
            onChange={handleChange}
          />
          ))}
        </div>
        <div key={`inline-${type}`} className="mb-3">
        {hairConcernsOptions.map(option => (
        <Form.Check
            key={option}
            inline
            label={option}
            name="hair_concerns"
            type="radio"
            id={`hairConcerns-${option}`}
            value={option}
            checked={formData.hair_concerns === option}
            onChange={handleChange}
          />
          ))}
        </div>
        <div key={`inline-${type}`} className="mb-3">
        {makeupPrefOptions.map(option => (
        <Form.Check
            key={option}
            inline
            label={option}
            name="makeup_preferences"
            type="radio"
            id={`makeupPreferences-${option}`}
            value={option}
            checked={formData.makeup_preferences === option}
            onChange={handleChange}
          />
          ))}
        </div>
      <button type="submit">Submit</button>
    </Form>     
  );
};

export default FormComponent;
