import React from 'react';
import '../styles/App.css';
import TopDeals  from './topDeals';
import PrefDeals from './prefDeals';
import BeatLoader from "react-spinners/BeatLoader";


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
      <div>Please wait a few moments while the AI loads your response... It may take up to a minute</div>
    </>
    )
  }

if (response){
if(Object.values(response).length < 10){
    return (
        <PrefDeals response={response}/>
    );
} else {
  return (
    <>
         <TopDeals response={response}/>
    </>
        
);
}
} else {
  return( 
    <>
    <div className='errorDiv' aria-errormessage='errorDiv'>Invalid response generated. Please try again.</div>
    <div className='errorDiv1' aria-errormessage='errorDiv1'>Gemini AI can return incomplete data due to its limitations as an LLM. Please try again to send it a new prompt.</div>
    </>
  

  )
} 
}

export default ResponseComponent