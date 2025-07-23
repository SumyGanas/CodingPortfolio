import React from 'react';
import Form from 'react-bootstrap/Form';
import useFormdata from './formDataHandler'; 
import '../styles/App.css';
import BeatLoader from "react-spinners/BeatLoader";

const function_url = 'https://receive-query-dy3kdkbuyq-uc.a.run.app'

const CommonAncestor = () => {
  const { formData, handleChange, handleSubmit, response, loading, err, initialScreen, handleDealSubmit, error } = useFormdata(function_url);

  return (
    <div className="card-deck mt-3 mb-3 gx-5 px-5 text-center" id="ancestor_component">
    <div className="card mb-4 box-shadow">
      <div className="card-header"> <h4 className="lead my-1">Configure your options here </h4> </div>
      <div className="card-body" id="aicol">  
      <FormComponent formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} error={error}/>
      <div className='form-or'></div>
      <img src="/or-gate.png" height={35} width={35} style={{marginRight : "5px"}}></img> OR 
      <img src="/or-gate1.png" height={35} width={35} style={{marginLeft : "5px"}}></img>
      <div className='buttonDiv'>
          <button type="submit" id='button-1' onClick={handleDealSubmit}>Click here to get the best value deals</button>
      </div>
      </div>
    </div>
    <div className="card mb-4 box-shadow responseOverlayContainer">
      <div className="card-header"> <h4 className="lead my-1">AI Response (from Google's Gemini)</h4> </div>
      <div className="card-body" id="airesponse">
        <ResponseComponent response={response} loading={loading} error={error} initialScreen={initialScreen}/>
      </div> 
    </div>
    </div>
  );
};

const FormComponent = ({ formData, handleChange, handleSubmit, error }) => {
    const skinTypeOptions = ['Dry','Oily']
    const skinConcernsOptions = ['Acne and/or Dark Spots', 'Redness and/or Wrinkles']
    const hairTypeOptions = ['Straight', 'Curly']
    const hairConcernsOptions = ['Damaged and/or Frizzy', 'Brittle and/or Color-treated']
    const makeupPrefOptions = ['Light/Daily', 'Bold/Glam']

  return (
    <>
    <Form method="post" onSubmit={handleSubmit} className='radio-wrapper'>
        <div className='formComponentsList'>
        <div className="mb-3 b1">
        <p className='preferenceOptions'> Skin type:</p>
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
        <p className='preferenceOptions'>Skin concerns:</p>
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
        <p className='preferenceOptions'>Hair type:</p>
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
        <p className='preferenceOptions'>Hair concerns:</p>
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
        <p className='preferenceOptions'>Makeup preferences:</p>
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

const ResponseComponent = ({ response, loading, error, initialScreen} ) => {

  if (error) {
    return <div>An unexpected error occured! Please try again later :&#40;</div>
  }

  if (loading && initialScreen) {
    return (
      <>
    <div className='initScreen formComponentsBox'>Please select your preferences from the options above so the AI can look for custom deals for you</div>
    </>
    )
  }
  
  if (loading && (initialScreen === false)) {
    return (
      <>
      <BeatLoader color="#f774d7" speedMultiplier={0.75}/>
      <div>Please wait a few moments while the AI loads your response...</div>
    </>
    )
  }

if (response){
if(Object.keys(response).length === 3){
    return (
        <div> 
          <div className='ai-title-header'> Based on your preferences, here are the top deals at Ulta</div>
          <div className='ai-subtitle-header'>PS: Click on the product name to navigate to the product website</div>
            {Object.keys(response).map((categoryName) => {
                const products = response[categoryName];
                return (
                    <div>
                      <div className='category-header'>
                        <h4>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h4>
                        </div>
                        <div className='aiListDiv'>
                          <ol>
                              {products.map((product, idx) => { 
                                return (
                                <li className='aiListNumber'>
                                  <div className='aiListItem'>
                                <div className='aiListProdName'>
                                  <a href={product.product_link} className='prodLink' target="_blank" rel="noopener noreferrer">
                                  <p>{product.product_name}</p>
                                  </a></div>
                                  <p className='prices'>
                                    <div><s>{product.product_original_price.charAt(0) === "$"? product.product_original_price : "$ "+product.product_original_price}</s></div>  
                                  <div>{product.product_sale_price.charAt(0) === "$"? product.product_sale_price : "$"+product.product_sale_price}</div>
                                  </p>
                                </div>
                                      <div className='aiListContent'>
                                      <p>{product.product_relevance_for_customer}</p>  
                                      </div>
                                  </li>
                              )})}
                          </ol>
                          </div>
                    </div>
                );
            })}
        <div className='respImg'> 
        <img src="/eye-shadow.png" width={300} height={300}></img>
        </div>
        </div>
    );
} else {
  return (
    <>
    <div className='ai-title-header'>Here are the top 10 best deals today at Ulta (click to shop) </div>
    <div className='ai-subtitle-header c2s-popup'>(P.S: Click on the product name to navigate to the product website)</div>
    <div>
      <div className='aiListDiv'>
        <ol>
          {response[Object.keys(response)].map((product) => (
                <div>
                  <li className='aiListNumber'>
                    <div className='aiListItem'>
                      <div className='aiListProdName'>
                        {(product.product_link ? <a href={product.product_link} target="_blank" rel="noopener noreferrer" className='prodLink'>
                        <p>{product.product_name}</p>
                        </a> : <p className='promoProdName'>{product.product_name}</p>)}
                        </div>
                        <p className='prices'>
                          <div><s>{product.product_original_price === '' ? '' : product.product_original_price.charAt(0) === "$"? product.product_original_price : "$"+product.product_original_price}</s></div> 
                        <div>{product.product_sale_price === '' ? 'promo': product.product_sale_price.charAt(0) === "$"? product.product_sale_price : "$"+product.product_sale_price}</div>
                        </p>
                      </div>
                      <div className='aiListContent'>
                            <p>{product.deal_analysis}</p>  
                      </div>
                    </li>
                </div>
            )
        )}
        </ol>
        </div>
        <div className='respImg'> 
        <img src="/online-shopping.png" width={300} height={300}></img>
        </div>
    </div>
    </>
);
}
} else {
  return( 
    <>
    <div className='errorDiv'>Incorrect response generated. Please try again.</div>
    <div className='errorDiv1'>Gemini AI can return incomplete data due to its limitations as an LLM. Please try again to send it a new prompt.</div>
    </>
  

  )
}
}


export default CommonAncestor;
