import React from 'react';
import { Link } from 'react-router-dom';
import './style8.css'

const SearchResults = ({ searchResults, searchText }) => {
    if (searchResults.length > 0) {
        return (
            <div>
                <div><p style={{ fontSize: '12', color: '#333', fontWeight: '800' }}>{searchText}</p></div>
                <div className='results'>
                    {
                        searchResults.map((product, index) =>
                            <div className='thumbCard' key={index}>
                                <Link to={`/${product.category.slug}/${product.slug}/${product._id}/p`}>
                                    {
                                        product.productPics[0] ? <img className='thumbImg' src={product.productPics[0].img} alt='tumbImg' />: null
                                    }
                                </Link>
                                <div className='thumbData'>
                                    <a href={`/${product.category.slug}/${product.slug}/${product._id}/p`}><h6 style={{ color: '#000' }}>{product.name}</h6></a>
                                    <p style={{ fontSize: '12px' }}>LKR {parseFloat(product.price).toFixed(2)}</p>
                                    <div>
                                        <p style={{ fontSize: '12px', margin: '0', color: '#333', fontWeight: '800' }}>Brand : {product.brand}</p>
                                        <p style={{ fontSize: '12px', margin: '0', color: '#333', fontWeight: '800' }}>Color : {product.color}</p>
                                    </div>
                                </div>
                            </div>

                        )
                    }
                </div>
            </div>
        )
    }
    else if (searchResults.length === 0){
        return (
            <div>
                <div><p style={{ fontSize: '12', color: '#333', fontWeight: '800' }}>{searchText}</p></div>
                <div><h2>Sorry, No Matching Products</h2></div>
            </div>
        )
    }
}

export default SearchResults;
