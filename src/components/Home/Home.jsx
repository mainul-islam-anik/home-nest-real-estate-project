import Banner from "./Banner";
import LatestProperties from "./LatestProperties";
import OurServices from "./OurServices";
import Testimonials from "./Testimonials";
import WhyChooseUs from "./WhyChooseUs";

const latestPropertiesPromise = fetch("http://localhost:3000/latest-properties").then(res =>res.json())

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <LatestProperties latestPropertiesPromise={latestPropertiesPromise}></LatestProperties>
            <WhyChooseUs></WhyChooseUs>
            <OurServices></OurServices>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;