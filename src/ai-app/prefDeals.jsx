import React from 'react';
import '../styles/App.css';

const PrefDeals = ({response}) => {
    return ( <>
    <div className='ai-title-header'> Based on your preferences, here are the top deals at Ulta</div>
    <div className='ai-subtitle-header'>PS: Click on the product name to navigate to the product website</div>
    <div className='aiListDiv'>
    {Object.keys(response || {}).map((categoryName) => {
    const products = response?.[categoryName] || [];
        return(
            <>
                <div className='category-header'>
                  <h4>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h4>
                  </div>
                  <div className='aiListDiv'>
                    <ol>
                        {products.map((p) => (
                          <li className='aiListNumber' key={p.url || p.name || i}>
                            <div className='aiListItem'>
                          <div className='aiListProdName'>
                            <a href={p.url} className='prodLink' target="_blank" rel="noopener noreferrer">
                            <p>{p.name}</p>
                            </a></div>
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
                    </div>
                    </> 
        );
    })}
    </div>
  <div className='respImg'> 
  <img src="/eye-shadow.png" width={300} height={300} alt='cute image of an eyeshadow palette'></img>
  </div>
  </>
)}

export default PrefDeals