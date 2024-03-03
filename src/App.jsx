import React, { useEffect } from "react";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from "./components/home";
import { Blog } from "./components/blog/Blog";
import Author from "./components/blog/Author";
import SingleBlog from "./components/blog/SingleBlog";

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
        {/* <Route path="/login" element={<Blog />} />
        <Route path="/signup" element={<Membership />} />
        <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
