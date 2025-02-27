import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from 'firebase/auth';
import useAdmin from "../../src/utils/hooks";
import CreatePackage from "pages/CreatePackage";
import PackageList from "pages/PackageList";
import { ToastContainer } from "react-toastify";

// Lazy load components
const Hero = lazy(() => import('../pages/Hero'));
const CardSection = lazy(() => import('../pages/CardSection'));
const Courses = lazy(() => import('../pages/Courses'));
const Contact = lazy(() => import('../pages/Contact'));
const Category = lazy(() => import('../pages/Category'));
const FaqSection = lazy(() => import('../pages/Faq'));
const Addblog = lazy(() => import('../pages/Addblog'));
const Blog = lazy(() => import('../pages/Blog'));
const Detail = lazy(() => import('../pages/Detail'));
const AdmissionList = lazy(() => import('../pages/AdmissionList'));
const AboutUsPage = lazy(() => import('../pages/Aboutus'));
const ImageUploadGallery = lazy(() => import('../pages/ImageUploadGallery'));
const Allimages = lazy(() => import('../pages/Allimages'));
const AddTours = lazy(() => import('../pages/AddTours'));
const FilteredTours = lazy(() => import('../pages/FilteredTours'));
const AddFAQ = lazy(() => import('../pages/AddFaq'));
const Faqupdate = lazy(() => import('../pages/Faqupdate'));
const Pakage = lazy(() => import('../pages/Pakage'));
const Users = lazy(() => import('../pages/Users'));
const CreateContainer = lazy(() => import('../pages/CreateContainer'));
const TourDetails = lazy(() => import('../components/TourDetails'));
const Tours = lazy(() => import('../pages/Tours'));
const Offer = lazy(() => import('../pages/Offer'));
const TestimonialSection = lazy(() => import("../pages/TestimonialSection"));

const ArfaSchool = () => {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useAdmin();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || {});
      setCurrentUser(user || {});
    
    });

    return () => unsubscribe();
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="cour" element={<CardSection />} />
        <Route path="courses" element={<Courses />} />
        <Route path="contact" element={<Contact />} />
        <Route path="contat" element={<Category />} />
        <Route path="conta" element={<FaqSection />} />
        <Route path="Addblog" element={<Addblog user={user} setActive={() => {}} />} />
        <Route path="/update/:id" element={<Addblog user={user} setActive={() => {}} />} />
        <Route path="Blog" element={<Blog setActive={() => {}} user={user} />} />
        <Route path="/detail/:id" element={<Detail user={user} />} />
        <Route path="/bookings" element={<AdmissionList />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/uplodeimges" element={<ImageUploadGallery />} />
        <Route path="allimges" element={<Allimages />} />
        <Route path="/tou" element={<AddTours user={user} />} />
        <Route path="/tous/:id" element={<AddTours user={user} />} />
        <Route path="/pakages" element={<Tours user={user} />} />
        <Route path="/tour/:id" element={<TourDetails user={user} />} />
        <Route path="/addhotels" element={<CreateContainer user={user} />} />
        <Route path="/updatehotels/:id" element={<CreateContainer user={user} />} />
        <Route path="/hotels" element={<Offer user={user} />} />
        <Route path="/filtered-tours" element={<FilteredTours />} />
        <Route path="/addfaq" element={<AddFAQ />} />
        <Route path="/updatefaq/:id" element={<Faqupdate />} />
        <Route path="pakage" element={<Pakage />} />
        <Route path="users" element={<Users />} />
         <Route path="/create-package" element={<CreatePackage />} />
                <Route path="/edit-package/:id" element={<CreatePackage />} />
                <Route path="/" element={<TestimonialSection />} />
                <Route path="pakageslist" element={<PackageList />} />
        
      </Routes>
      <ToastContainer />
    </Suspense>
  );
};

// Stylish loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="relative w-16 h-16">
      <div className="absolute w-full h-full border-4 border-t-4 border-indigo-600 border-solid rounded-full animate-spin"></div>
    </div>
  </div>
);

export default ArfaSchool;
