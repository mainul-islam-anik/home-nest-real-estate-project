import Banner from "./Banner";
import LatestProperties from "./LatestProperties";
import OurServices from "./OurServices";
import Testimonials from "./Testimonials";
import WhyChooseUs from "./WhyChooseUs";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestProperties></LatestProperties>
            <WhyChooseUs></WhyChooseUs>
            <OurServices></OurServices>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;