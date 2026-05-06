import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios"; // axios অথবা fetch যেকোনোটি ব্যবহার করতে পারেন

const AllProperties = () => {
    const [allProperties, setAllProperties] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    // ডাটা ফেচ করার ফাংশন
    useEffect(() => {
        const fetchProperties = async () => {
            const { data } = await axios.get(
                `http://localhost:3000/properties?search=${search}&sort=${sort}`
            );
            setAllProperties(data);
        };
        fetchProperties();
    }, [search, sort]); // search বা sort চেঞ্জ হলে অটোমেটিক ডাটা ফেচ হবে

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">All Properties</h2>

                {/* --- Search and Sort Controls --- */}
                <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center">
                    <input
                        type="text"
                        placeholder="Search by Property Name..."
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select 
                        className="select select-bordered w-full max-w-xs"
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="">Sort by Price</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>

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