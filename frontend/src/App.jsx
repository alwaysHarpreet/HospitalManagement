import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "./Context/Context.jsx";
import {
  Navbar,
  Footer,
  HomePage,
  AllDoctorsPage,
  SpecialitiesPage,
  MedicinesPage,
  LoginPage,
  SignupPage,
  ErrorPage,
  FaqsPage,
  AboutUsPage,
  PrivacyPolicyPage,
  TermsAndConditionsPage,
  OrderHistoryPage,
  AddtoCart,
  ProductsByCategory,
  Bot,
  Profile,
  MyAppointments,
  BookAppointment,
  Prescriptions,
  Billing,
} from "./import-export/ImportExport.js";

function App() {
  return (
    <BrowserRouter>
      <AppContext>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/alldoctors" element={<AllDoctorsPage />} />

          <Route path="/specialities" element={<SpecialitiesPage />} />

          <Route path="/medicines" element={<MedicinesPage />} />
          <Route
            path="/medicines/shop_by_category/:id"
            element={<ProductsByCategory />}
          />
          {/* <Route path="/buy-medicines/:id" element={<SingleMedicine />} /> */}
          <Route path="/medicines/cart" element={<AddtoCart />} />
          <Route
            path="/medicines/order_history"
            element={<OrderHistoryPage />}
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/appointments" element={<MyAppointments />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/appointment" element={<BookAppointment />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/billing" element={<Billing />} />

          <Route path="/*" element={<ErrorPage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
          <Route
            path="/termsandconditions"
            element={<TermsAndConditionsPage />}
          />
        </Routes>
        <Bot />
        {/* <GoToTop /> */}
        <Footer />
        <ToastContainer position="top-right" />
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
