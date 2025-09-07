import React from 'react';
import '../styles/App.css';

function getSku(url_string) {
  try {
    const url = new URL(url_string); 
    const params = new URLSearchParams(url.search); 
    return params.get('sku'); 
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}

const TopDeals = ({ response } ) => {
  
    return (
        <>
        <div className='ai-title-header'> Based on your preferences, here are the top deals at Ulta</div>
        <div className='ai-subtitle-header'>PS: Click on the product name to navigate to the product website</div>
          <div className='aiListDiv'>
          {response && Object.values(response).length > 0 ? (
            <ol>
              {Object.values(response).map(p => (
                      <li className='aiListNumber' key={getSku(p.url) || p.name}>
                        <div className='aiListItem'>
                          <div className='aiListProdName'>
                            <a href={p.url} target="_blank" rel="noopener noreferrer" className='prodLink'>
                            <p>{p.name}:</p>
                            </a>
                            </div>

                            <div className='prices'>
                              <span><s>{"$"+p.list_price}</s> </span>
                              <span> {"$"+p.sale_price}</span>
                            </div>
                          </div>
                          <div className='aiListContent'>
                                <p>{p.product_relevance_for_customer}</p>  
                          </div>
                        </li>  
            ))}
            </ol>
            ) : <></>}
            </div>
            <div className='respImg'> 
            <img src="/online-shopping.png" width={300} height={300}></img>
            </div>
        </>
    );
}

export default TopDeals;