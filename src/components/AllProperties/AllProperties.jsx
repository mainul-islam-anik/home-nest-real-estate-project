import { Link, useLoaderData } from "react-router";


const AllProperties = () => {
    const allProperties= useLoaderData()
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">All Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allProperties.map((item) => (
                        <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
                            <img src={item.image} alt={item.propertyName} className="h-56 w-full object-cover" />
                            <div className="p-6 flex flex-col flex-grow">
                                <span className="text-success font-semibold text-sm uppercase tracking-wider">{item.category}</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{item.propertyName}</h3>
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

export default AllProperties;