import React from 'react';
import Category from "./Category";
import Courses from "./Courses";
import FaqSection from "./Faq";
import Blog from "./Blog";
import Heros from "./Heros";
import Explore from "components/Explore";
import Offer from "./Offer";
import TestimonialSection from './TestimonialSection';



const HomeSection = () => {
    return (
        <div>
            <section>
                <Heros />
                
            </section>
            <section>
            <Explore />
            </section>
            <section>
                <Courses />
            </section>
           
            <section>
                <Category />
            </section>
           
            <section>
                <Offer />
            </section>
            <section>
                <Blog />
            </section>
            <section>
                 <TestimonialSection/>
                  </section>
            <section>
                <FaqSection />
            </section>
          
         
        </div>
    );
};

export default HomeSection;
