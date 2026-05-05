import { useState } from 'react';
import { FaStar,  FaMapMarkerAlt,  FaEnvelope, FaPhoneAlt, FaCalendarAlt } from 'react-icons/fa';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
// FaRegStar,FaUser,


const PropertyDetails = () => {
    // এটি আপনার দেওয়া ডামি ডাটা, বাস্তবে এটি useParams() দিয়ে API থেকে আসবে
    const property = useLoaderData() 
    console.log(property)     ;

    // রেটিং এবং রিভিউ স্টেট
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState("");

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        // এখানে আপনার ডাটাবেসে রিভিউ সেভ করার লজিক হবে
        console.log({ rating, reviewText });
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank you for your review!",
            showConfirmButton: false,
            timer: 1500
            });
        setRating(0);
        setReviewText("");
    };

    return (
        
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Side: Image & Details (2 columns wide) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Property Image */}
                        <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                            <img src={property.image} alt={property.propertyName} className="w-full h-[400px] object-cover" />
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold uppercase">
                                        For {property.category}
                                    </span>
                                    <span className="text-gray-500 flex items-center gap-2 text-sm">
                                        <FaCalendarAlt /> Posted on: {new Date(property.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.propertyName}</h1>
                                <p className="text-gray-600 flex items-center gap-2 mb-6">
                                    <FaMapMarkerAlt className="text-blue-600" /> {property.location}
                                </p>
                                <h3 className="text-xl font-semibold mb-3">Description</h3>
                                <p className="text-gray-700 leading-relaxed text-justify">
                                    {property.description}
                                </p>
                            </div>
                        </div>

                        {/* Ratings & Reviews Section */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-6">Ratings & Reviews</h3>
                            <form onSubmit={handleReviewSubmit} className="space-y-4">
                                {/* Star Selection */}
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-700 font-medium">Your Rating:</span>
                                    {[...Array(5)].map((star, index) => {
                                        index += 1;
                                        return (
                                            <button
                                                type="button"
                                                key={index}
                                                className={`text-2xl transition-colors ${index <= (hover || rating) ? "text-yellow-400" : "text-gray-300"}`}
                                                onClick={() => setRating(index)}
                                                onMouseEnter={() => setHover(index)}
                                                onMouseLeave={() => setHover(rating)}
                                            >
                                                <FaStar />
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Review Textarea */}
                                <textarea
                                    className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                    rows="4"
                                    placeholder="Write your experience with this property..."
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    required
                                ></textarea>

                                <button 
                                    type="submit"
                                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md"
                                >
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Side: Price & Seller Info (1 column wide) */}
                    <div className="space-y-8">
                        {/* Pricing Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-600">
                            <p className="text-gray-500 text-sm uppercase font-bold tracking-wider">Price</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-blue-700">${property.price}</span>
                                {property.category === "Rent" && <span className="text-gray-500">/month</span>}
                            </div>
                            <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
                                Buy/Rent Now
                            </button>
                        </div>

                        {/* Seller Contact Info */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h4 className="text-lg font-bold mb-6 border-b pb-2">Listed By</h4>
                            <div className="flex items-center gap-4 mb-6">
                                <img src={property.sellerImage} alt={property.sellerName} className="w-16 h-16 rounded-full object-cover border-2 border-blue-100" />
                                <div>
                                    <h5 className="font-bold text-gray-900">{property.sellerName}</h5>
                                    <p className="text-xs text-gray-500 italic">Verified Seller</p>
                                </div>
                            </div>
                            <div className="space-y-4 text-sm">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <FaEnvelope className="text-blue-500" /> <span>{property.sellerEmail}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <FaPhoneAlt className="text-blue-500" /> <span>{property.sellerContact}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;