import Category from "./Category";
import Courses from "./Courses";
import FaqSection from "./Faq";
import Blog from "./Blog";
import Heros from "./Heros";
import Explore from "components/Explore";
import Offer from "./Offer";
const HomeSection = () => {
    return (
    <div>
      <section>
        <Heros/>
        <Explore/>
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
        <FaqSection />
      </section>
    </div>
  );
};

export default HomeSection;
