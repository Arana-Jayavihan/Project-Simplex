import "./App.css";
import { HomePage } from "./containers/HomePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ProductList } from "./containers/ProductList";
import ProductDetailsPage from "./containers/ProductDetailsPage";
import RateAndReview from "./componants/FeedBack&Review/RateAndReview";
import CustomerService from "./containers/CustomerService/CustomerService";
import FAQs from "./componants/FAQs/FAQs";
import Button from "./componants/FloatingChatButton/Button";
import Chat_Bot from "./componants/ChatBot/ChatBot";

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route
//           path="/:catSlug/:productSlug/:productId/p"
//           element={<ProductDetailsPage />}
//         />
//         <Route path="/:slug" element={<ProductList />} />
//         <Route path="/rateandreview" element={<RateAndReview />} />
//         <Route path="/cus" element={<CustomerService />} />
//         <Route path="/faq" element={<FAQs />} />
//         <Route path="/button" element={<Button />} />
//         <Route path="/chatBot" element={<Chat_Bot />} />
//       </Routes>
//     </div>
//   );
import React, { useEffect } from "react";
import "./App.css";
//import { HomePage } from "./containers/HomePage";
//import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { ProductList } from "./containers/ProductList";
import CartPage from "./containers/CartPage";
import Checkoutpage from "./containers/CheckoutPage";
import { updateCart } from "./actions/cart.action";
//import ProductDetailsPage from "./containers/ProductDetailsPage";
import "./App.css";
import { getInitdata, isUserLoggedIn } from "./actions";
import OrderPage from "./containers/OrderPage";
import OrderDetailsPage from "./containers/OrderDetailsPage";
import Messages from "./componants/FAQs/viewAllFAQs";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isUserLoggedIn());
      console.log("App.js - updateCart");
      dispatch(updateCart());
      dispatch(getInitdata())
    }
  }, [auth.authenticated]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProductDetailsPage />} />
        <Route
          path="/:catSlug/:productSlug/:productId/p"
          element={<ProductDetailsPage />}
        />
        <Route path="/:slug" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkoutpage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/order_details/:orderId" component={OrderDetailsPage} />
        <Route path="/:slug" element={<ProductList />} />
        <Route path="/rateandreview" element={<RateAndReview />} />
        <Route path="/cus" element={<CustomerService />} />
        <Route path="/faq" element={<FAQs />} />
        <Route path="/button" element={<Button />} />
        <Route path="/chatBot" element={<Chat_Bot />} />
        <Route path="/viewallfaq" element={<Messages />} />
      </Routes>
    </div>
  );
}

export default App;
