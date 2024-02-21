// ArfaSchoolLayout.js
import React from "react";
import Navbar1 from "components/Navbars/Navbar1";
import Footer1 from "components/Footers/Footer1";
import ArfaSchool from "Routs/Arfaschool";

const ArfaSchoolLayout = () => {
  
  return (
   <>
   <Navbar1/>
   
    <ArfaSchool/>
  
   <Footer1/>
   </>
  );
};

export default ArfaSchoolLayout;
