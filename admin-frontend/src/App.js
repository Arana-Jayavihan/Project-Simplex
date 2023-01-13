import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Signin } from "./containers/Signin/signin";
import { Signup } from "./containers/Signup/signup";
import {
  PrivateHome,
  PrivateProducts,
  PrivateOrders,
  PrivateCategories,
  RootRoute,
  PrivateInventory,
  PrivateHR,
  PrivateCustomerTicket,
} from "./componants/HOC/privateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn, getInitdata } from "./actions";
import { Home } from "./containers/Dashboard/dashboard";
import { Products } from "./containers/Products";
import  Orders  from "./containers/Orders";
import { Category } from "./containers/Category";
import { Inventory } from "./containers/inventory";
import { HR } from "./containers/HR";
import { CustomerTickets } from "./containers/CustomerTickets";
import ADD_FAQs from "./componants/FAQs/addFAQs";
import ViewFAQs from "./componants/FAQs/ViewFAQs";
import EditFAQs from "./componants/FAQs/editFAQ";
import ContactMSG from "./componants/CustomerContacts/ViewMSG";
import ReplyMSG from "./componants/CustomerContacts/AddReply";
import ViewAllMessages from "./componants/CustomerContacts/viewAllMsgs";
function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedIn());
    }
    dispatch(getInitdata());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route element={<RootRoute />}>
          <Route path="" />
        </Route>

        <Route element={<PrivateHome />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route element={<PrivateProducts />}>
          <Route path="/products" element={<Products />} />
        </Route>

        <Route element={<PrivateOrders />}>
          <Route path="/orders" element={<Orders />} />
        </Route>

        <Route element={<PrivateCategories />}>
          <Route path="/categories" element={<Category />} />
        </Route>

        <Route element={<PrivateInventory />}>
          <Route path="/inventory" element={<Inventory />} />
        </Route>

        <Route element={<PrivateHR />}>
          <Route path="/hr" element={<HR />} />
        </Route>

        <Route element={<PrivateCustomerTicket />}>
          <Route path="/customerticket" element={<CustomerTickets />} />
        </Route>

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/FAQs" element={<ADD_FAQs />} />
        <Route path="/viewFAQs" element={<ViewFAQs />} />
        <Route exact path="/FAQs/:_id/edit" element={<EditFAQs />} />

        <Route path="/contactus" element={<ContactMSG />} />
        <Route path="/addreply" element={<ReplyMSG />} />
        <Route path="/viewallmsgs" element={<ViewAllMessages />} />
      </Routes>
    </div>
  );
}

export default App;
