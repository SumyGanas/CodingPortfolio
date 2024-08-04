import React from 'react';
import useFormData from './useFormData'; // Import the custom hook

const function_url = ''; // Set your function URL here

const ResponseComponent = () => {
  const { response } = useFormData(function_url);

  const ai_response = JSON.stringify(response, null, 2)

  return (
    <div>
      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{ai_response}</pre>
        </div>
      )}
    </div>
  );
};

export default ResponseComponent;