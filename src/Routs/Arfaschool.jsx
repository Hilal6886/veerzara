import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth } from ".././firebase";
import { onAuthStateChanged } from 'firebase/auth'
import { useLocation } from 'react-router-dom';
import useAdmin from "../../src/utils/hooks"
import Tours from "pages/Tours";
import TourDetails from "components/TourDetails";
import CreateContainer from "pages/CreateContainer";
import Offer from "pages/Offer";
import Hero from '../pages/Hero.jsx';
import Courses from '../pages/Courses.jsx';
import Admission from '../pages/Admission.jsx';
import Fee from '../pages/Fee.jsx';
import Contact from '../pages/Contact.jsx';
import Category from 'pages/Category.jsx';

import FaqSection from 'pages/Faq';
import Addblog from 'pages/Addblog';
import Blog from 'pages/Blog';
import Detail from 'pages/Detail';
import CardSection from 'pages/CardSection';
import AdmissionList from 'pages/AdmissionList';
import AboutUsPage from 'pages/Aboutus';
import ImageUploadGallery from 'pages/ImageUploadGallery';
import Allimages from 'pages/Allimages';
import AddTours from 'pages/AddTours';
import FilteredTours from "pages/FilteredTours";

import AddFAQ from "pages/AddFaq";
import Faqupdate from "pages/Faqupdate";


const ArfaSchool = () => {
  const [active, setActive] = useState("CBlog");
  const [user, setUser] = useState(null);

  const [currentUser, setCurrentUser] = useState(null)

  useAdmin()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user || {});
      setCurrentUser(user || {})
      console.log("USERRRRRRRRRRRRRRRRRRRRRRRRR", user)
    })
  }, [])

  return (

    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="cour" element={<CardSection />} />
      <Route path="courses" element={<Courses />} />
      <Route path="/admission" element={<Admission />} />
      <Route path="fee" element={<Fee />} />
      <Route path="contact" element={<Contact />} />
      <Route path="contat" element={<Category />} />
   
      <Route path="conta" element={<FaqSection />} />
      <Route path="Addblog" element={<Addblog user={user} setActive={setActive} />} />
      <Route path="/update/:id" element={<Addblog user={user} setActive={setActive} />} />
      <Route path="Blog" element={<Blog setActive={setActive} user={user} active={active} />} />
      <Route path="/detail/:id" element={<Detail user={user} />} />
      <Route path="/bookings" element={<AdmissionList />} />
      <Route path="/aboutus" element={<AboutUsPage />} />
      <Route path="/uplodeimges" element={<ImageUploadGallery />} />
      <Route path="allimges" element={<Allimages />} />
      <Route path="/tou" element={<AddTours user={user} />} />
      <Route path="/tous/:id" element={<AddTours user={user} setActive={setActive} />} />
      <Route path="/pakages" element={<Tours user={user} />} />
      <Route path="/tour/:id" element={<TourDetails user={user} />} />
      <Route path="/addhotels" element={<CreateContainer user={user} />} />
      <Route path="/updatehotels/:id" element={<CreateContainer user={user} setActive={setActive} />} />
      <Route path="/hotels" element={<Offer user={user} setActive={setActive} />} />
      <Route path="/filtered-tours" element={<FilteredTours />} />
  
      <Route path="/addfaq" element={<AddFAQ />} />
      <Route path="/updatefaq/:id" element={<Faqupdate />} />

</Routes>
 
  );
};

export default ArfaSchool;
