import React from "react";
import { Home } from "../../containers/Dashboard/dashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import { Products } from "../../containers/Products";
import  Orders  from "../../containers/Orders";
import { Category } from "../../containers/Category";
import { Inventory } from "../../containers/inventory";
import { HR } from "../../containers/HR";
import { CustomerTickets } from "../../containers/CustomerTickets";

function PrivateRoute(props) {
  const token = window.localStorage.getItem("token");
  if (token) {
    return <Route path={props.to} element={props.componant} />;
  } else {
    return <Navigate to="/signin" />;
  }
}

function RootRoute() {
  const token = window.localStorage.getItem("token");
  if (token) {
    return (
      <Routes>
        <Route path="" element={<Home />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="" element={<PrivateHome />} />
      </Routes>
    );
  }
}

function PrivateHome() {
  const token = window.localStorage.getItem("token");

  if (token) {
    return (
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    );
  } else {
    return <Navigate to="/signin" />;
  }
}

function PrivateInventory() {
  const token = window.localStorage.getItem("token");

  if (token) {
    return (
      <Routes>
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    );
  } else {
    return <Navigate to="/signin" />;
  }
}

function PrivateProducts() {
  const token = window.localStorage.getItem("token");

  if (token) {
    return (
      <Routes>
        <Route path="/products" element={<Products />} />
      </Routes>
    );
  } else {
    return <Navigate to="/signin" />;
  }
}

function PrivateOrders() {
  const token = window.localStorage.getItem("token");

  if (token) {
    return (
      <Routes>
        <Route path="/orders" element={<Orders />} />
      </Routes>
    );
  } else {
    return <Navigate to="/signin" />;
  }
}

function PrivateCategories() {
  const token = window.localStorage.getItem("token");

  if (token) {
    return (
      <Routes>
        <Route path="/categories" element={<Category />} />
      </Routes>
    );
  } else {
    return <Navigate to="/signin" />;
  }
}

function PrivateHR() {
  const token = window.localStorage.getItem("token");

  if (token) {
    return (
      <Routes>
        <Route path="/hr" element={<HR />}></Route>
      </Routes>
    );
  } else {
    return <Navigate to="signin" />;
  }
}

function PrivateCustomerTicket() {
  const token = window.localStorage.getItem("token");

  if (token) {
    return (
      <Routes>
        <Route path="/customerticket" element={<CustomerTickets />}></Route>
      </Routes>
    );
  } else {
    return <Navigate to="signin" />;
  }
}

export {
  PrivateHome,
  PrivateProducts,
  PrivateOrders,
  PrivateCategories,
  PrivateRoute,
  RootRoute,
  PrivateInventory,
  PrivateHR,
  PrivateCustomerTicket,
};