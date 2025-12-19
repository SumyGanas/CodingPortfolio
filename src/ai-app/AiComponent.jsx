import useFormdata from './formDataHandler'; 
import ResponseComponent from './ResponseComponent';
import FormComponent from './FormComponent';
import '../styles/App.css';

const function_url = 'https://receive-query-dy3kdkbuyq-uc.a.run.app'

const AiComponent = () => {
  const { formData, handleChange, handleSubmit, response, loading, err, initialScreen, handleDealSubmit, error } = useFormdata(function_url);

  return (
    <div className="card-deck mt-3 mb-3 gx-5 px-5 text-center" id="ancestor_component">
    <div className="card mb-4 box-shadow">
      <div className="card-header"> <h4 className="lead my-1" >Configure your options here </h4> </div>
      <div className="card-body" id="aicol">  
      <FormComponent formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} error={error}/>
      <div className='form-or'></div>
      <img src="/or-gate.png" height={35} width={35} style={{marginRight : "5px"}} alt='or gate icon'></img> OR 
      <img src="/or-gate1.png" height={35} width={35} style={{marginLeft : "5px"}} alt='or gate icon'></img>
      <div className='buttonDiv'>
          <button type="submit" id='button-1' onClick={handleDealSubmit} role='button' aria-labelledby='Get promotions button'>Click here to get the best value deals</button>
      </div>
      </div>
    </div>
    <div className="card mb-4 box-shadow responseOverlayContainer">
      <div className="card-header"> <h4 className="lead my-1">AI Response (from Google's Gemini)</h4> </div>
      <div className="card-body" id="airesponse" aria-labelledby='AI response for query'>
        <ResponseComponent response={response} loading={loading} error={error} initialScreen={initialScreen}/>
      </div> 
    </div>
    </div>
  );
};

export default AiComponent;
