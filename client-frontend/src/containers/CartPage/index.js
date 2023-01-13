import React, { useEffect, useState } from "react";
import Card from '../../componants/UI/Card';
import {Layout} from '../../componants/layout';
import { useDispatch, useSelector } from "react-redux";
import { addToCart,getCartItems} from "../../actions/cart.action";
import{MaterialButton} from "../../componants/MetiraialUI"
import '../CartPage/style15.css';
import CartItem from "./CartItem";
import PriceDetails from "../../componants/PriceDetails";
import { useNavigate } from "react-router-dom";

const CartPage = (props) => {
    const cart = useSelector(state => state.cart);
    const auth = useSelector((state) => state.auth);
    // const cartItems = cart.cartItems;
    const [cartItems,setCartItems] = useState(cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        setCartItems(cart.cartItems);
    },[cart.cartItems]);

    useEffect(() => {
        if (auth.authenticated) {
          dispatch(getCartItems());
        }
      }, [auth.authenticated]);

    const onQuantityIncrement = (_id, qty)=>{
        //console.log(cartItems[_id])
        const{ name, price, img } =cartItems[_id];
        dispatch(addToCart({ _id, name, price, img },1));

    }

    const onQuantityDecrement = (_id, qty)=>{
        const{ name, price, img } =cartItems[_id];
        dispatch(addToCart({ _id, name, price, img },-1));
        
    }

    if (props.onlyCartItems) {
        return (
          <>
           {
                        Object.keys(cartItems).map((key, index)=>
                            
                            <CartItem
                                key={index}
                                cartItems = {cartItems[key]}
                                onQuantityInc={onQuantityIncrement}
                                onQuantityDec={onQuantityDecrement}
                                />
                         
                    //     <div key ={index} className="flexRow">
                    //     <div className="cardProductContainer">
                    //         <img src=" "/>
    
                    //     </div>
                    //     <div className="cartItemDetails">
                    //         <div>
                    //             {cartItems[key].name} -       qty -  {cartItems[key].qty}
                    //         </div>
                            
                    //         <div>Delivery in 3-5 days</div>
                            
                    //     </div>
                    // </div>
    
                        )
                        
                    }
          </>
        );
      }

    


    return(
        <Layout>
            <div className="cartContainer">
                <Card
                    headerLeft={`My Cart`}
                    headerRight={<div>Deliver to</div>}
                    style={{width: 'calc(100% -400px)',overflow:'hidden'}}
                >
                    {
                        Object.keys(cartItems).map((key, index)=>
                            
                            <CartItem
                                key={index}
                                cartItems = {cartItems[key]}
                                onQuantityInc={onQuantityIncrement}
                                onQuantityDec={onQuantityDecrement}
                                />
                         
                    //     <div key ={index} className="flexRow">
                    //     <div className="cardProductContainer">
                    //         <img src=" "/>
    
                    //     </div>
                    //     <div className="cartItemDetails">
                    //         <div>
                    //             {cartItems[key].name} -       qty -  {cartItems[key].qty}
                    //         </div>
                            
                    //         <div>Delivery in 3-5 days</div>
                            
                    //     </div>
                    // </div>
    
                        )
                        
                    }

                    <div style={{
                        width: '100%',
                        display: "flex",
                        background: "#ffffff",
                        justifyContent: "flex-end",
                        boxShadow: "0 0 10px 10px #eee",
                        padding: "10px 0",
                        boxSizing: "border-box"
                    }}>
                        <div style={{width : "250px"}}>
                            <MaterialButton
                                title="Place Order"
                                onClick={() => navigate("/checkout")}
                                
                                />
                        </div>
                    </div>
                
              
                </Card>
                <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
            </div>
        </Layout>
    )
}
export default CartPage
