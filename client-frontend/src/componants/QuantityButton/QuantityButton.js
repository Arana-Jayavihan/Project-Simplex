import React from "react";
import { HiPlus, HiMinus } from "react-icons/hi"
import { RiShoppingBag3Fill } from "react-icons/ri"
import './style6.css'

const QuantityButton = ({ onQuant, onRemove, onAdd, storeStock, price }) => {
    return (
        <>
            <div className="amount">
                <button className="minus" onClick={onRemove} disabled={onQuant === 0}>
                    <HiMinus />
                </button>
                <p>{onQuant}</p>
                <button className="plus" onClick={onAdd} disabled={onQuant === storeStock}>
                    <HiPlus />
                </button>
            </div>
            <div className="total">
                <button className="cart1" onClick={onRemove} disabled={onQuant === 0}>
                    <RiShoppingBag3Fill />
                </button>
                <p className="bar"> | </p>
                <p className="price2"> LKR {parseFloat(price * onQuant).toFixed(2)}</p>
            </div>
        </>

    );
};

export default QuantityButton;