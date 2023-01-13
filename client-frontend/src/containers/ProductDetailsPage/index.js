import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../componants/MetiraialUI";
import "./style9.css"
import { Layout } from "../../componants/layout";
import { getCatBySlug, getCatPath, getInitdata, getProductBySlug, getProductDetailsById } from "../../actions";
import { useParams } from "react-router-dom";
import SyncLoader from 'react-spinners/SyncLoader'
import {renderProducts} from "../../componants/RenderProducts";
import QuantityButton from "../../componants/QuantityButton/QuantityButton";
import { addToCart } from "../../actions/cart.action";
import { useNavigate } from "react-router-dom";


/**
 * @author
 * @function ProductDetailsPage
 **/

const ProductDetailsPage = (props) => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { catSlug } = useParams()
    const navigate = useNavigate();

    const [quant, setQuant] = useState('');
    const [activePic, setActivePic] = useState(false);

    useEffect(() => {
        const payload = {
            params: {
                productId,
            },
        };

        dispatch(getProductDetailsById(payload))
        dispatch(getCatBySlug(catSlug))
        dispatch(getCatPath(catSlug))
        dispatch(getProductBySlug(catSlug))
        setActivePic(false)
        setQuant(0)
    }, [productId]);

    const product = useSelector((state) => state.product);
    const category = useSelector((state) => state.category);
    const loading = useSelector(state => state.product.loading)

    const end = useRef()

    if (Object.keys(product.productDetails).length === 0) {
        return null;
    }

    const parentCats = category.parentcats
    const pCats = []
    let j = parentCats.length - 1
    for (let i = 0; i < parentCats.length; i++) {
        pCats[j] = parentCats[i]
        j--
    }
    
    let netPrice = undefined
    if(product.productDetails.discountedPrice > 0){
        netPrice = product.productDetails.discountedPrice
    }
    else{
        netPrice = product.productDetails.price
    }

    const aPic = (pic) => {
        setActivePic(pic)
    }

    const addQuant = () => {
        setQuant(quant + 1);
    };

    const removeQuant = () => {
        setQuant(quant - 1);
    };

    return (
        <Layout>
            <div className='productDescriptionContainer'>
                <div className="flexRow">
                    <div className="verticalImageStack">
                        {
                            product.productDetails.productPics.map((thumb, index) => (
                                <div className="thumbnail" onClick={() => aPic(thumb.img)} key={index} >
                                    <img src={thumb.img} alt={thumb.img} />
                                </div>
                            ))}
                    </div>
                    <div className="productDescContainer">
                        <div className="productDescImgContainer">
                            {activePic === false ? <img src={product.productDetails.productPics[0].img} alt='prodPic' /> : <img src={activePic} alt='prodPic' />}
                        </div>

                        {/* action buttons */}
                        <div className="flexRow">
                            <MaterialButton
                                title="ADD TO CART"
                                bgColor="#ff9f00"
                                textColor="#ffffff"
                                style={{
                                    marginRight: "5px",
                                }}
                                icon={<IoMdCart />}
                                onClick={() => {
                                    const { _id, name, price } = product.productDetails;
                                    const img = product.productDetails.productPics[0].img;
                                    dispatch(addToCart({ _id, name, price, img }));
                                    navigate("/cart");
                                }}
                            />
                            <MaterialButton
                                title="BUY NOW"
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                style={{
                                    marginLeft: "5px",
                                }}
                                icon={<AiFillThunderbolt />}
                            />
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '3%' }}>
                    {/* home > category > subCategory > productName */}
                    <div className="breed">
                        <ul>
                            <li>
                                <a href="/">Home</a>
                                <IoIosArrowForward />
                            </li>
                            {
                                pCats.map((cat, index) => (
                                    <li key={index}>
                                        <a href={`/${cat.slug}`}>{cat.name}</a>
                                        <IoIosArrowForward />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    {/* product description */}
                    <div className="productDetails">
                        <p className="productTitle">{product.productDetails.name}</p>
                        <div>
                            <span className="ratingCount" style={{ verticalAlign: 'baseline' }}>
                                {product.productDetails.rating} <IoIosStar style={{ verticalAlign: 'baseline' }} />
                            </span>
                            <span className="ratingNumbersReviews">
                                {product.productDetails.reviews.length} Reviews
                            </span>
                        </div>
                        {/* <div className="extraOffer">
                            Extra RS 
                            4500 off{" "}
                        </div> */}

                        {
                            product.productDetails.discount === 0 ?
                                <span className="price3">
                                    <p>LKR {parseFloat(product.productDetails.price).toFixed(2)}</p>
                                </span>
                                :
                                <>
                                    <span className="priceDis">
                                        <p>LKR {parseFloat(product.productDetails.price).toFixed(2)}</p>
                                    </span>
                                    <div className="priceContainer">
                                        <span className="price3">
                                            <p>LKR {parseFloat(product.productDetails.discountedPrice).toFixed(2)}</p>
                                        </span>
                                        <span className="discount" style={{ margin: "0 10px" }}>
                                            {product.productDetails.discount} % off
                                        </span>
                                    </div>
                                </>
                        }

                        <div>
                            <p
                                style={{
                                    color: "#212121",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                }}
                            >
                                Available Offers
                            </p>
                            <p style={{ display: "flex", margin: '0 0' }}>
                                <span
                                    style={{
                                        width: "100px",
                                        fontSize: "14px",
                                        color: "#878787",
                                        fontWeight: "600",
                                        marginRight: "20px",
                                    }}
                                >
                                    Brand
                                </span>
                                <span
                                    style={{
                                        fontSize: "14px",
                                        color: "#212121",
                                    }}
                                >
                                    {product.productDetails.brand}
                                </span>
                            </p>
                            <p style={{ display: "flex", margin: '0 0' }}>
                                <span
                                    style={{
                                        width: "100px",
                                        fontSize: "14px",
                                        color: "#878787",
                                        fontWeight: "600",
                                        marginRight: "20px",
                                    }}
                                >
                                    Color
                                </span>
                                <span
                                    style={{
                                        fontSize: "14px",
                                        color: "#212121",
                                    }}
                                >
                                    {product.productDetails.color}
                                </span>
                            </p>
                            <p style={{ display: "flex", margin: '0 0' }}>
                                <span
                                    style={{
                                        width: "100px",
                                        fontSize: "14px",
                                        color: "#878787",
                                        fontWeight: "600",
                                        marginRight: "20px",
                                    }}
                                >
                                    Description
                                </span>
                                <span
                                    style={{
                                        fontSize: "14px",
                                        color: "#212121",
                                    }}
                                >
                                    {product.productDetails.description}
                                </span>
                            </p>
                            <p style={{ display: "flex", margin: '2% 0', alignItems: 'center' }}>
                                <span style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}>
                                    <QuantityButton onQuant={quant} onRemove={removeQuant} onAdd={addQuant} storeStock={product.productDetails.storeStock} price={netPrice} style={{ marginTop: "5%" }} />
                                </span>

                            </p>
                            <p>
                                {
                                    quant === product.productDetails.storeStock && product.productDetails.storeStock > 0 ?
                                        <span style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                            color: "#19b101",
                                        }}>
                                            Sorry, you have already selected the maximum amount...
                                        </span>
                                        :
                                        quant === 0 && product.productDetails.storeStock > 0 ?
                                        <span style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                            color: "#777777",
                                        }}>
                                            Please select items...
                                        </span>
                                        :
                                        product.productDetails.storeStock === 0 ?
                                        <span style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                            color: "#ff0000",
                                        }}>
                                            Sorry this item is currently unavailable...
                                        </span>
                                        :
                                        null
                                }
                            </p>

                        </div>
                    </div>
                </div>
            </div>
            {
                loading ?
                    <section className='productCards'>
                        <h4 style={{ textAlign: 'center' }}>Loading, please wait...</h4>
                        <div style={{ display: "flex", justifyContent: "center" }} ref={end}>

                            <SyncLoader
                                color="#000000"
                                speedMultiplier={1}
                                style={{ margin: '3%', position: 'relative' }}
                            />
                        </div>
                    </section> :
                    <section className="productCards" >
                        {renderProducts(loading, product.products, 0, catSlug, product, "Similar Items")}
                    </section>

            }

        </Layout>
    );
};

export default ProductDetailsPage;

