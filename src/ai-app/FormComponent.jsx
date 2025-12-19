import '../styles/App.css';
import Form from 'react-bootstrap/Form';

const FormComponent = ({ formData, handleChange, handleSubmit, error }) => {
    const skinTypeOptions = ['Dry','Oily']
    const skinConcernsOptions = ['Acne and/or Dark Spots', 'Redness and/or Wrinkles']
    const hairTypeOptions = ['Straight', 'Curly']
    const hairConcernsOptions = ['Damaged and/or Frizzy', 'Brittle and/or Color-treated']
    const makeupPrefOptions = ['Light/Daily', 'Bold/Glam']

  return (
    <>
    <Form method="post" onSubmit={handleSubmit} className='radio-wrapper' aria-multiselectable="true" aria-description='Form to select your skin, hair and makeup preferences for product reccomendations'>
        <div className='formComponentsList'>
        <div className="mb-3 b1">
        <p className='preferenceOptions' aria-labelledby='preferenceOptions'> Skin type:</p>
        {skinTypeOptions.map(option => (
          <Form.Check
            key={option}
            inline
            label={option}
            name="skin_types"
            type="radio"
            id={`skinType-${option}`}
            value={option}
            checked={formData.skin_types === option}
            onChange={handleChange}
            />
        ))}
          </div>
        
        <div className="mb-3 b2">
        <p className='preferenceOptions' aria-labelledby='preferenceOptions'>Skin concerns:</p>
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
        
        <div className="mb-3 b3">
        <p className='preferenceOptions' aria-labelledby='preferenceOptions'>Hair type:</p>
        {hairTypeOptions.map(option => (
        <Form.Check
            key={option}
            inline
            label={option}
            name="hair_types"
            type="radio"
            id={`hairType-${option}`}
            value={option}
            checked={formData.hair_types === option}
            onChange={handleChange}
          />
          ))}
        </div>
       
        <div className="mb-3 b4">
        <p className='preferenceOptions' aria-labelledby='preferenceOptions'>Hair concerns:</p>
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
        
        <div className="mb-3 b5">
        <p className='preferenceOptions' aria-labelledby='preferenceOptions'>Makeup preferences:</p>
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
        {error && <div className="formError">
        {error}
        </div>}
        </div>
        </Form>
        <div className='buttonDiv'>
          <button type="submit" id='button-1' onClick={handleSubmit} >Submit</button>
        </div>
      </>
  );
};

export default FormComponent;