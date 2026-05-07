import { useContext, useEffect, useState } from 'react';
import { FaStar, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaCalendarAlt } from 'react-icons/fa';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../AuthContext/AuthContext';

const PropertyDetails = () => {
    const { user } = useContext(AuthContext);
    const property = useLoaderData();

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [reviews, setReviews] = useState([]); 
    
    useEffect(() => {
        fetch(`https://home-nest-server-navy.vercel.app/reviews/${property._id}`)
            .then(res => res.json())
            .then(data => setReviews(data));
    }, [property._id]);

    const handleReviewSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire("Error!", "Please login to give a review", "error");
            return;
        }

        const reviewData = {
            propertyId: property._id,
            propertyName: property.propertyName,
            propertyImage: property.image,
            reviewerName: user.displayName,
            reviewerEmail: user.email,
            reviewerPhoto: user.photoURL,
            rating: rating,
            reviewText: reviewText,
            reviewDate: new Date().toISOString()
        };

        fetch('https://home-nest-server-navy.vercel.app/reviews', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(reviewData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                Swal.fire("Success!", "Thank you for your review!", "success");
                
                
                const newReviewForDisplay = { ...reviewData, _id: data.insertedId };
                setReviews([newReviewForDisplay, ...reviews]); 
                
                setRating(0);
                setReviewText("");
            }
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side: Image & Details */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                            <img src={property.image} alt={property.propertyName} className="w-full h-[400px] object-cover" />
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="bg-blue-100 text-success px-4 py-1 rounded-full text-sm font-bold uppercase">
                                        For {property.category}
                                    </span>
                                    <span className="text-gray-500 flex items-center gap-2 text-sm">
                                        <FaCalendarAlt /> Posted on: {new Date(property.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.propertyName}</h1>
                                <p className="text-gray-600 flex items-center gap-2 mb-6">
                                    <FaMapMarkerAlt className="text-success" /> {property.location}
                                </p>
                                <h3 className="text-xl font-semibold mb-3">Description</h3>
                                <p className="text-gray-700 leading-relaxed text-justify">{property.description}</p>
                            </div>
                        </div>

                        {/* Ratings & Reviews Form */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-6">Write a Review</h3>
                            <form onSubmit={handleReviewSubmit} className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-700 font-medium">Your Rating:</span>
                                    {[...Array(5)].map((_, index) => {
                                        const starValue = index + 1;
                                        return (
                                            <button
                                                type="button"
                                                key={starValue}
                                                className={`text-2xl transition-colors ${starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"}`}
                                                onClick={() => setRating(starValue)}
                                                onMouseEnter={() => setHover(starValue)}
                                                onMouseLeave={() => setHover(rating)}
                                            >
                                                <FaStar />
                                            </button>
                                        );
                                    })}
                                </div>
                                <textarea
                                    className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                    rows="4"
                                    placeholder="Write your experience..."
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    required
                                ></textarea>
                                <button type="submit" className="bg-success text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary transition-all shadow-md">
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Side: Price & Seller Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-success">
                            <p className="text-gray-500 text-sm uppercase font-bold tracking-wider">Price</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-success">${property.price}</span>
                                {property.category === "Rent" && <span className="text-gray-500">/month</span>}
                            </div>
                            <button className="w-full mt-6 bg-success text-white py-3 rounded-xl font-bold hover:bg-secondary transition-all">Buy/Rent Now</button>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h4 className="text-lg font-bold mb-6 border-b pb-2">Listed By</h4>
                            <div className="flex items-center gap-4 mb-6">
                                <img src={property.sellerImage} alt={property.sellerName} className="w-16 h-16 rounded-full object-cover border-2 border-blue-100" />
                                <div>
                                    <h5 className="font-bold text-gray-900">{property.sellerName}</h5>
                                    <p className="text-xs text-gray-500 italic">Verified Seller</p>
                                </div>
                            </div>
                            <div className="space-y-4 text-sm text-gray-700">
                                <div className="flex items-center gap-3"><FaEnvelope className="text-success" /> <span>{property.sellerEmail}</span></div>
                                <div className="flex items-center gap-3"><FaPhoneAlt className="text-success" /> <span>{property.sellerContact}</span></div>
                            </div>
                        </div>

                        
                        <div className="mt-8 space-y-6">
                            <h4 className="text-xl font-bold border-b pb-2 text-gray-800">Recent Reviews ({reviews.length})</h4>
                            {reviews.length === 0 ? <p className="text-gray-500 text-sm italic">No reviews yet.</p> :
                                reviews.map((review) => (
                                    <div key={review._id} className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                                        <div className="flex gap-3 items-center mb-2">
                                            <img src={review.reviewerPhoto} className="w-8 h-8 rounded-full" alt="" />
                                            <p className="font-bold text-sm">{review.reviewerName}</p>
                                        </div>
                                        <div className="flex text-yellow-400 text-xs mb-2">
                                            {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                                        </div>
                                        <p className="text-gray-600 text-sm italic">"{review.reviewText}"</p>
                                        <p className="text-[10px] text-gray-400 mt-2">{new Date(review.reviewDate).toLocaleDateString()}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;