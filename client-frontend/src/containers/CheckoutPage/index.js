import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addOrder, getAddress,getCartItems } from "../../actions";
import {Layout} from "../../componants/layout";
import {Anchor,MaterialButton,MaterialInput} from "../../componants/MetiraialUI";
import Card from "../../componants/UI/Card";
import AddressForm from "./AddressForm";
import "../CheckoutPage/style13.css";
import PriceDetails from "../../componants/PriceDetails";
import CartPage from "../CartPage";

const CheckoutStep = (props) => {
    return (
      <div className="checkoutStep">
        <div onClick={props.onClick} className={`checkoutHeader ${props.active && 'active'}`}>
          <div>
            <span className="stepNumber">{props.stepNumber}</span>
            <span className="stepTitle">{props.title}</span>
          </div>
        </div>
        {props.body && props.body}
      </div>
    );
  };


  const Address = ({
    adr,
    selectAddress,
    enableAddressEditForm,
    confirmDeliveryAddress,
    onAddressSubmit,
  }) => {
    return (
      <div className="flexRow addressContainer">
        <div>
          <input name="address" onClick={() => selectAddress(adr)} type="radio" />
        </div>
        <div className="flexRow sb addressinfo">
          {!adr.edit ? (
            <div style={{ width: "100%" }}>
              <div className="addressDetail">
                <div>
                  <span className="addressName">{adr.name}</span>
                  <span className="addressType">{adr.addressType}</span>
                  <span className="addressMobileNumber">{adr.mobileNumber}</span>
                </div>
                {adr.selected && (
                  <Anchor
                    name="EDIT"
                    onClick={() => enableAddressEditForm(adr)}
                    style={{
                      fontWeight: "500",
                      color: "#2874f0",
                    }}
                  />
                )}
              </div>
              <div className="fullAddress">
                {adr.address} <br /> {`${adr.state} - ${adr.pinCode}`}
              </div>
              {adr.selected && (
                <MaterialButton
                  title="DELIVERY HERE"
                  onClick={() => confirmDeliveryAddress(adr)}
                  style={{
                    width: "200px",
                    margin: "10px 0",
                  }}
                />
              )}
            </div>
          ) : (
            <AddressForm
              withoutLayout={true}
              onSubmitForm={onAddressSubmit}
              initialData={adr}
              onCancel={() => {}}
            />
          )}
        </div>
      </div>
    );
  };

  const CheckoutPage = (props) => {
    const user = useSelector(state =>state.user);
    const auth = useSelector(state =>state.auth);
    const [newAddress,setNewAddress] = useState(false);
    const [comfimAddress, setComfirmAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const[address,setAddress]=useState([]);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const [orderSummary, setOrderSummary] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState(false);
    const [paymentOption, setPaymentOption] = useState(false);
    const [confirmOrder, setConfirmOrder] = useState(false);

    const onAddressSubmit = (addr)=>{
        setSelectedAddress(addr);
        setComfirmAddress(true);
    setOrderSummary(true);

    }

    const userOrderConfirmation = () => {
        setOrderConfirmation(true);
        setOrderSummary(false);
        setPaymentOption(true);
      };

   

    const selectAddress = (addr) =>{
       // console.log(addr)
     const updatedAddress = address.map(adr => 
        adr._id === addr._id ? {...adr,selected:true}:{...adr,selected:false});
        setAddress(updatedAddress);
    };

    const comfirmDeliveryAddress=(addr)=>{
        setSelectedAddress(addr)
        setComfirmAddress(true)
        setOrderSummary(true);

    };

    const enableAddressEditForm = (addr) => {
        const updatedAddress = address.map((adr) =>
          adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
        );
        setAddress(updatedAddress);
      };
      const onConfirmOrder = () => {
        const totalAmount = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0);
        const items = Object.keys(cart.cartItems).map((key) => ({
          productId: key,
          payablePrice: cart.cartItems[key].price,
          purchasedQty: cart.cartItems[key].qty,
        }));
        const payload = {
          addressId: selectedAddress._id,
          totalAmount,
          items,
          paymentStatus: "pending",
          paymentType: "cod",
        };
    
        console.log(payload);
       dispatch(addOrder(payload));
        setConfirmOrder(true);
      };
      
        

    useEffect(() => {
        auth.authenticated && dispatch(getAddress());
        auth.authenticated && dispatch(getCartItems());
      }, [auth.authenticated]);
    

    useEffect(() => {
        auth.authenticated  && dispatch(getAddress());
    }, [auth.authenticated]);

    useEffect(() => {
       const address = user.address.map(adr =>({...adr, selected: false, edit: false}));
       setAddress(address);

    }, [user.address]);

    useEffect(() => {
        if (confirmOrder && user.placedOrderId) {
          props.history.push(`/order_details/${user.placedOrderId}`);
        }
      }, [user.placedOrderId]);


    return(
        <Layout>
            <div className="cartContainer" style={{alignItems: "flex-start"}}>
                <div className="checkoutContainer">
                    <CheckoutStep
                        stepNumber={'1'}
                        title={'Login'}
                        active={!auth.authenticated}
                        body={
                            auth.authenticated?
                            <div className="loggedInId">
                                <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                                <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                          </div>:
                          <div>
                            <MaterialInput
                                Lable="Email"
                                />
                            </div>
                        }
                    />

<CheckoutStep
            stepNumber={"2"}
            title={"DELIVERY ADDRESS"}
            active={!comfimAddress && auth.authenticated}
            body={
              <>
                {comfimAddress ? (
                  <div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                ) : (
                  address.map((adr) => (
                    <Address
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={comfirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      adr={adr}
                    />
                  ))
                )}
              </>
            }
/>
        
    

  {/* AddressForm */}
  {comfimAddress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : !auth.authenticated ? (
            <CheckoutStep
              stepNumber={"+"}
              title={"ADD NEW ADDRESS"}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          ) : null}

<CheckoutStep
            stepNumber={"3"}
            title={"ORDER SUMMARY"}
            active={orderSummary}
             body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div className="stepCompleted">
                  {Object.keys(cart.cartItems).length} items
                </div>
              ) : null
            }
          />
          {orderSummary && (
            <Card
              style={{
                margin: "10px 0",
              }}
            >
              <div
                className="flexRow sb"
                style={{
                  padding: "20px",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "12px" }}>
                  Order confirmation email will be sent to{" "}
                  <strong>{auth.user.email}</strong>
                </p>
                <MaterialButton
                  title="CONTINUE"
                  onClick={userOrderConfirmation}
                  style={{
                    width: "200px",
                  }}
                />
              </div>
            </Card>
          )}
           <CheckoutStep
            stepNumber={"4"}
            title={"PAYMENT OPTIONS"}
            active={paymentOption}
            body={
              paymentOption && (
                <div>
                  <div
                    className="flexRow"
                    style={{
                      alignItems: "center",
                      padding: "20px",
                    }}
                  >
                    <input type="radio" name="paymentOption" value="cod" />
                    <div>Cash on delivery</div>
                  </div>
                  <MaterialButton
                    title="CONFIRM ORDER"
                    onClick={onConfirmOrder}
                    style={{
                      width: "200px",
                      margin: "0 0 20px 20px",
                    }}
                  />
                </div>
              )
            }
          />

          
                </div>

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

  export default CheckoutPage

