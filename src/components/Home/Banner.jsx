// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router';

const Banner = () => {
    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200",
            title: "Find your dream address on HomeNest.",
            description: "A modern apartment with all amenities in the city’s best location is now within your reach.",
            buttonText: "View all properties"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
            title: "The best location for business success",
            description: "Easily find premium office spaces and commercial land to expand your business.",
            buttonText: "View all properties"
        },
        {
            id: 3,
            image: "https://i.ibb.co.com/ksfwSwfS/download-25.jpg",
            title: "Premium housing at the best value within your budget",
            description: "Make a home built with attractive design and durable construction your permanent address—at a low budget.",
            buttonText: "View all properties"
        }
    ];

    return (
        <div className="w-full h-[500px] md:h-[650px]">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect={'fade'} 
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="h-full w-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="relative h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url('${slide.image}')` }}
                        >
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <div className="text-center text-white px-6 max-w-4xl">
                                    
                                    <h1 className="text-3xl md:text-6xl font-extrabold mb-4 animate__animated animate__fadeInDown">
                                        {slide.title}
                                    </h1>
                                    
                                    
                                    <p className="text-sm md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                                        {slide.description}
                                    </p>

                                   
                                    <div className="flex flex-wrap gap-4 justify-center">
                                        <Link to="/allProperties" className="bg-success hover:bg-white hover:text-black text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg">{slide.buttonText}</Link>
                                        
                                        <button className="border-2 border-white hover:bg-white hover:text-black text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg">
                                            Contact us
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;