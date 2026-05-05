import { use } from "react";
import { Link } from "react-router";

const LatestProperties = ({latestPropertiesPromise}) => {
    // Note: In your real project, fetch this from MongoDB and sort by date
    // const featuredData = [
    //     { id: 1, name: "Modern Skyline Apartment", category: "Rent", price: 1200, location: "Dhaka, BD", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600" },
    //     { id: 2, name: "Green Valley Villa", category: "Sale", price: 85000, location: "Sylhet, BD", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" },
    //     { id: 3, name: "Commercial Hub Plaza", category: "Commercial", price: 5000, location: "Chittagong, BD", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600" },
    //     { id: 4, name: "Luxury Penthouse", category: "Sale", price: 150000, location: "Gulshan, Dhaka", image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&q=80&w=600" },
    //     { id: 5, name: "Cozy Studio Flat", category: "Rent", price: 800, location: "Uttara, Dhaka", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600" },
    //     { id: 6, name: "Riverview Land Plot", category: "Land", price: 45000, location: "Barishal, BD", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600" },
    // ];

    const latestProperties = use(latestPropertiesPromise)
    console.log(latestProperties)

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Latest Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestProperties.map((item) => (
                        <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
                            <img src={item.image} alt={item.name} className="h-56 w-full object-cover" />
                            <div className="p-6 flex flex-col flex-grow">
                                <span className="text-success font-semibold text-sm uppercase tracking-wider">{item.category}</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{item.name}</h3>
                                <p className="text-gray-600 flex items-center gap-2 mb-4">
                                    <span className="material-icons text-sm">location_on</span> {item.location}
                                </p>
                                <div className="mt-auto flex items-center justify-between">
                                    <span className="text-2xl font-bold text-success">${item.price}</span>
                                    <Link to={`/propertyDetails/${item._id}`}
                                    className="bg-success text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestProperties;