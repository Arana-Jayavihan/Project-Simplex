import React from "react";
import Card from "../../componants/UI/Card";

/**
 * @author
 * @function PriceDetails
 **/

const PriceDetails = (props) => {
  return (
    <Card headerLeft={"Price Details"} style={{ maxWidth: "380px" }}>
      <div
        style={{
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Price:Rs. ({props.totalItem} items)</div>
          <div> Rs.{props.totalPrice}</div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Delivery Charges</div>
          <div>FREE</div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Total Amount : Rs. </div>
          <div>{props.totalPrice}</div>
        </div>
      </div>
    </Card>
  );
};

export default PriceDetails;
