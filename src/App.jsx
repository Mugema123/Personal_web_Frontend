import React, { useEffect } from "react";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./components/home";
import { Blog } from "./components/blog/Blog";
import Author from "./components/blog/Author";
import SingleBlog from "./components/blog/SingleBlog";
import SignUp from "./components/authentication/SignUp";
import Login from "./components/authentication/Login";
import { EmailVerified } from "./components/authentication/EmailVerified";
import { ForgotPassword } from "./components/authentication/ForgotPassword";
import { ResetPassword } from "./components/authentication/ResetPassword";
import NotFoundPage from "./components/NotFound";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/author/:id" element={<Author />} />
        <Route path="/blog/:slug" element={<SingleBlog />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verified" element={<EmailVerified />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
