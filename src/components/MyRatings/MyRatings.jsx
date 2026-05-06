import { useContext, useEffect, useState } from 'react';

import { format } from 'date-fns'; // তারিখ ফরম্যাট করার জন্য (ঐচ্ছিক: npm install date-fns)
import { FaStar } from 'react-icons/fa'; // স্টারের জন্য (npm install react-icons)
import { AuthContext } from '../../AuthContext/AuthContext';

const MyRatings = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/my-reviews/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setReviews(data);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    if (loading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">My Ratings & Reviews</h2>
            
            {reviews.length === 0 ? (
                <div className="text-center text-gray-500 py-10">You haven't given any ratings yet!</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map(review => (
                        <div key={review._id} className="card bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
                            <figure className="px-4 pt-4">
                                <img 
                                    src={review.propertyImage} 
                                    alt={review.propertyName} 
                                    className="rounded-xl h-48 w-full object-cover" 
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-primary">{review.propertyName}</h2>
                                <p className="text-sm text-gray-400">Reviewed by: {review.reviewerName}</p>
                                
                                {/* স্টার রেটিং */}
                                <div className="flex items-center gap-1 my-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar 
                                            key={i} 
                                            className={i < review.rating ? "text-yellow-400" : "text-gray-300"} 
                                        />
                                    ))}
                                    <span className="ml-2 font-semibold">({review.rating}/5)</span>
                                </div>

                                <p className="text-gray-600 italic">"{review.reviewText}"</p>
                                
                                <div className="divider"></div>
                                
                                <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                                    <span>Date: {format(new Date(review.reviewDate), 'PP')}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRatings;