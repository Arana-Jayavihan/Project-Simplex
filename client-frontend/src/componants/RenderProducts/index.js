import React from 'react';
import { Link } from "react-router-dom";
import { FaRegStar, FaStar } from 'react-icons/fa'
import "./style7.css"
import { AiOutlineExpandAlt, AiOutlineHeart } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi'
import { IoIosArrowForward } from 'react-icons/io';

const scrollToProducts = (page) => {
    window.scrollTo({
        top: page,
        behavior: 'smooth'
    })
}

const renderStars = (rating) => {
    switch (rating) {
        case 5:
            return (
                <div className="rating">
                    <FaStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaStar style={{ fontSize: '12', color: 'gold' }} />
                </div>
            )

        case 4:
            return (
                <div className="rating">
                    <FaStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaRegStar style={{ fontSize: '12', color: 'gold' }} />
                </div>
            )

        case 3:
            return (
                <div className="rating">
                    <FaStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaRegStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaRegStar style={{ fontSize: '12', color: 'gold' }} />
                </div>
            )

        case 2:
            return (
                <div className="rating">
                    <FaStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaRegStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaRegStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaRegStar style={{ fontSize: '12', color: 'gold' }} />
                </div>
            )

        case 1:
            return (
                <div className="rating">
                    <FaStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaRegStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaRegStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaRegStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaRegStar style={{ fontSize: '12', color: 'gold' }} />
                </div>
            )

        default:
            return (
                <div className="rating">
                    <FaRegStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaRegStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaRegStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaRegStar style={{ fontSize: '12', color: 'gold' }} />
                    <FaRegStar style={{ fontSize: '12', color: 'gold' }} />
                </div>
            )
    }
}

const noProducts = (pCats, title, childCats) => {
    return (
        <div style={{ marginTop: '0', marginBottom: '5%' }}>
            <div className='breed2'>
                <ul>
                    {
                        pCats.map((cat, index) => (
                            <li key={index}>
                                <a key={index} href={`/${cat.slug}`}>{cat.name}</a>
                                <IoIosArrowForward />
                            </li>
                        ))
                    }
                </ul>
            </div>
            {
                childCats.length > 0 ?
                    <div className='childCats'>
                        {
                        childCats.length > 0 && childCats.length < 9 ?
                            <div className='childCatsLess'>
                                {
                                    childCats.map((cate, index) => (
                                        <a key={index} href={`/${cate.slug}`}>
                                            <div className='childInstance' key={index}>
                                                <div className='childImg'>
                                                    <img src={cate.catImg} />
                                                </div>
                                                <div>
                                                    <h6>{cate.name}</h6>
                                                </div>
                                            </div>
                                        </a>

                                    ))
                                }
                            </div>
                            : 
                            childCats.length > 0 && childCats.length > 9 ?
                            <div className='childCatsMore'>
                                {
                                    childCats.map((cate, index) => (
                                        <a key={index} href={`/${cate.slug}`}>
                                            <div className='childInstance' key={index}>
                                                <div className='childImg'>
                                                    <img src={cate.catImg} />
                                                </div>
                                                <div>
                                                    <h6>{cate.name}</h6>
                                                </div>
                                            </div>
                                        </a>

                                    ))
                                }
                            </div>
                            :
                            null
                    }
                    </div>
                    : null
            }
            <div class="section-title">
                <h4>{title}</h4>
            </div>
            <hr style={{ height: '5px', background: '#333', border: 'none' }} />
            <h3 style={{ margin: '0 1%' }}>Sorry, No Products Available At The Moment</h3>
        </div>
    )
}

const renderProducts = (loading, products, scroll, catSlug, product, title = "") => {
    if (loading === false && products.length > 0) {
        return (
            products.map((productCat, index) =>
                <div key={index}>
                    <div class="section-title">
                        <h4>{title !== '' ? title : productCat.cate.name}</h4>
                    </div>
                    <hr style={{ height: '5px', background: '#333', border: 'none' }} />
                    <div className='grid'>
                        {
                            productCat.products.map((prod, index) => prod._id !== product.productDetails._id ?
                                <div className="product__item" key={index}>
                                    <div className="product__item__pic" >
                                        <Link to={`/${productCat.cate.slug}/${prod.slug}/${prod._id}/p`} ><img className='prodPic' src={prod.productPics.length > 0 ? prod.productPics[0].img : ''} alt='prodPic' /></Link>
                                        {
                                            prod.storeStock === 0 ? <div style={{ borderRadius: '5px' }} class="label stockout">Out of Stock</div> : null
                                        }
                                        {
                                            prod.new === true && prod.storeStock > 0 ?
                                                <div style={{ borderRadius: '5px' }} class="label new">New</div> :
                                                prod.new && prod.storeStock === 0 ?
                                                    <div style={{ borderRadius: '5px' }} class="label stockout">Out of Stock</div> :
                                                    null
                                        }
                                        {
                                            prod.discount > 0 ? <div style={{ marginLeft: "55%", borderRadius: '5px' }} class="label sale">{prod.discount} % off</div> : null
                                        }
                                        <ul className="product__hover">
                                            <li><a href={prod.productPics.length > 0 ? prod.productPics[0].img : catSlug} className="image-popup"><span><AiOutlineExpandAlt /></span></a></li>
                                            <li><a href="/"><span><AiOutlineHeart style={{ fontSize: '20px', lineHeight: '1,5' }} /></span></a></li>
                                            <li><Link to={`/${productCat.cate.slug}/${prod.slug}/${prod._id}/p`} ><span style={{ alignItems: 'center' }}><FiMoreHorizontal /></span></Link></li>
                                        </ul>
                                    </div>
                                    <div className="product__item__text">
                                        <h6><Link to={`/${productCat.cate.slug}/${prod.slug}/${prod._id}/p`} >{prod.name}</Link></h6>
                                        {
                                            renderStars(prod.rating)
                                        }
                                        {
                                            prod.discountedPrice > 0 ?
                                                <div class="product__price">LKR {parseFloat(prod.discountedPrice).toFixed(2)} <span>LKR {parseFloat(prod.price).toFixed(2)}</span></div> :
                                                <div className="product__price">LKR {parseFloat(prod.price).toFixed(2)}</div>

                                        }
                                    </div>
                                </div> : null
                            )
                        }
                    </div>
                    {scrollToProducts(scroll)}
                </div>
            )
        )
    }
    else {
        return (
            <div class="section-title">
                <h4>Sorry, No Products Available</h4>
            </div>
        )
    }
}
 // 
const renderFilteredProducts = (loading, filterArray, products, title, category, order, childCats) => {

    const parentCats = category.parentcats
    const pCats = []
    let j = parentCats.length - 1
    for (let i = 0; i < parentCats.length; i++) {
        pCats[j] = parentCats[i]
        j--
    }
    const prods = []

    for (let prodCat of products) {
        for (let product of prodCat.products) {
            product = {
                ...product,
                catSlug: prodCat.cate.slug
            }
            prods.push(product)
        }
    }

    let filteredProducts = prods

    if (loading === false && prods.length > 0) {
        for (let filter of filterArray) {
            switch (filter.type) {
                case 'brand':
                    filteredProducts = filteredProducts.filter(product => product.brand.toLowerCase().includes(filter.data))
                    break
                case 'color':
                    filteredProducts = filteredProducts.filter(product => product.color.toLowerCase().includes(filter.data))
                    break
                case 'price':
                    if (filter.low === '' && filter.high === '') {
                        filteredProducts = filteredProducts.filter(product => product.price >= 0 && product.price < 9999999999)
                    }
                    else if (filter.low > 0 && filter.high === '') {
                        filteredProducts = filteredProducts.filter(product => product.price >= filter.low && product.price < 9999999)
                    }
                    else if (filter.low === '' && filter.high > 0) {
                        filteredProducts = filteredProducts.filter(product => product.price >= 0 && product.price < filter.high)
                    }
                    else {
                        filteredProducts = filteredProducts.filter(product => product.price >= filter.low && product.price < filter.high)
                    }
                    break
            }
        }
        let orderedFilteredProducts = []
        if (order === 'asc') {
            orderedFilteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
        }
        else if (order === 'desc') {
            orderedFilteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
        }

        if (orderedFilteredProducts.length > 0) {
            return (
                <div style={{ marginTop: '0', marginBottom: '5%' }}>
                    <div className='breed2'>
                        <ul>
                            {
                                pCats.map((cat, index) => (
                                    <li key={index}>
                                        <a key={index} href={`/${cat.slug}`}>{cat.name}</a>
                                        <IoIosArrowForward />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    {
                        // small catagry 
                        childCats.length > 0 && childCats.length < 9 ?
                            <div className='childCatsLess'>
                                {
                                    childCats.map((cate, index) => (
                                        <a key={index} href={`/${cate.slug}`}>
                                            <div className='childInstance' key={index}>
                                                <div className='childImg'>
                                                    <img src={cate.catImg} />
                                                </div>
                                                <div>
                                                    <h6>{cate.name}</h6>
                                                </div>
                                            </div>
                                        </a>

                                    ))
                                }
                            </div>
                            : 
                            childCats.length > 0 && childCats.length > 9 ?
                            <div className='childCatsMore'>
                                {
                                    childCats.map((cate, index) => (
                                        <a key={index} href={`/${cate.slug}`}>
                                            <div className='childInstance' key={index}>
                                                <div className='childImg'>
                                                    <img src={cate.catImg} />
                                                </div>
                                                <div>
                                                    <h6>{cate.name}</h6>
                                                </div>
                                            </div>
                                        </a>

                                    ))
                                }
                            </div>
                            :
                            null
                    }

                    <div class="section-title">
                        <h4>{title}</h4>
                        <p>{orderedFilteredProducts.length} Results Found</p>
                    </div>
                    <hr style={{ height: '5px', background: '#333', border: 'none' }} />
                    <div className='grid-scroll2'>
                        {
                            orderedFilteredProducts.map((prod, index) =>
                                <div className="product__item" key={index}>
                                    <div className="product__item__pic" >
                                        <Link to={`/${prod.catSlug}/${prod.slug}/${prod._id}/p`} ><img className='prodPic' src={prod.productPics.length > 0 ? prod.productPics[0].img : ''} alt='prodPic' /></Link>
                                        {
                                            prod.storeStock === 0 ? <div style={{ borderRadius: '5px' }} class="label stockout">Out of Stock</div> : null
                                        }
                                        {
                                            prod.new === true && prod.storeStock > 0 ?
                                                <div style={{ borderRadius: '5px' }} class="label new">New</div> :
                                                prod.new && prod.storeStock === 0 ?
                                                    <div style={{ borderRadius: '5px' }} class="label stockout">Out of Stock</div> :
                                                    null
                                        }
                                        {
                                            prod.discount > 0 ? <div style={{ marginLeft: "55%", borderRadius: '5px' }} class="label sale">{prod.discount} % off</div> : null
                                        }
                                        <ul className="product__hover">
                                            <li><a href={prod.productPics.length > 0 ? prod.productPics[0].img : prod.catSlug} className="image-popup"><span><AiOutlineExpandAlt /></span></a></li>
                                            <li><a href="/"><span><AiOutlineHeart /></span></a></li>
                                            <li><Link to={`/${prod.catSlug}/${prod.slug}/${prod._id}/p`} ><span><FiMoreHorizontal /></span></Link></li>
                                        </ul>
                                    </div>
                                    <div className="product__item__text">
                                        <h6><Link to={`/${prod.catSlug}/${prod.slug}/${prod._id}/p`} >{prod.name}</Link></h6>
                                        {
                                            renderStars(prod.rating)
                                        }
                                        {
                                            prod.discountedPrice > 0 ?
                                                <div class="product__price">LKR {parseFloat(prod.discountedPrice).toFixed(2)} <span>LKR {parseFloat(prod.price).toFixed(2)}</span></div> :
                                                <div className="product__price">LKR {parseFloat(prod.price).toFixed(2)}</div>

                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            )
        }
        else {
            return (
                <>
                    {
                        noProducts(pCats, title , childCats)
                    }
                </>
            )

        }

    }
    else {
        return (
            <>
                {
                    noProducts(pCats, title, childCats)
                }
            </>
        )
    }
}

const homeProducts = (products, title) => {
    if (products.length > 0) {
        return (
            <div style={{ marginTop: '3%', marginBottom: '5%' }}>
                <div class="section-title">
                    <h4>{title}</h4>
                </div>
                <hr style={{ height: '5px', background: '#333', border: 'none' }} />
                <div className='grid-scroll'>
                    {
                        products.map((prod, index) =>
                            <div className="product__item" key={index}>
                                <div className="product__item__pic" >
                                    <Link to={`/${prod.category.slug}/${prod.slug}/${prod._id}/p`} ><img className='prodPic' src={prod.productPics.length > 0 ? prod.productPics[0].img : ''} alt='prodPic' /></Link>
                                    {
                                        prod.storeStock === 0 ? <div style={{ borderRadius: '5px' }} class="label stockout">Out of Stock</div> : null
                                    }
                                    {
                                        prod.new === true && prod.storeStock > 0 ?
                                            <div style={{ borderRadius: '5px' }} class="label new">New</div> :
                                            prod.new && prod.storeStock === 0 ?
                                                <div style={{ borderRadius: '5px' }} class="label stockout">Out of Stock</div> :
                                                null
                                    }
                                    {
                                        prod.discount > 0 ? <div style={{ marginLeft: "55%", borderRadius: '5px' }} class="label sale">{prod.discount} % off</div> : null
                                    }
                                    <ul className="product__hover">
                                        <li><a href={prod.productPics.length > 0 ? prod.productPics[0].img : prod.category.slug} className="image-popup"><span><AiOutlineExpandAlt /></span></a></li>
                                        <li><a href="/"><span><AiOutlineHeart /></span></a></li>
                                        <li><Link to={`/${prod.category.slug}/${prod.slug}/${prod._id}/p`} ><span><FiMoreHorizontal /></span></Link></li>
                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6><Link to={`/${prod.category.slug}/${prod.slug}/${prod._id}/p`} >{prod.name}</Link></h6>
                                    {
                                        renderStars(prod.rating)
                                    }
                                    {
                                        prod.discountedPrice > 0 ?
                                            <div class="product__price">LKR {parseFloat(prod.discountedPrice).toFixed(2)} <span>LKR {parseFloat(prod.price).toFixed(2)}</span></div> :
                                            <div className="product__price">LKR {parseFloat(prod.price).toFixed(2)}</div>

                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
    else {
        return (
            <div style={{ marginTop: '3%', marginBottom: '5%' }}>
                <div class="section-title">
                    <h4>{title}</h4>
                </div>
                <hr style={{ height: '5px', background: '#333', border: 'none' }} />
                <h3 style={{ margin: '0 1%' }}>Sorry, No Products Available At The Moment</h3>
            </div>
        )
    }
}

export { renderProducts, renderFilteredProducts, homeProducts };
