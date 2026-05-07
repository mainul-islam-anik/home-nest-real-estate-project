import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';
import { Link, useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { FaEdit, FaTrashAlt, FaEye, FaMapMarkerAlt, FaTag, FaCalendarAlt } from 'react-icons/fa';

const MyProperties = () => {
    const data = useLoaderData()
    console.log(data)
    const { user } = useContext(AuthContext);
    const [myProperties, setMyProperties] = useState([]);
    console.log(myProperties)
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        if (user?.email) {
            fetch(`https://home-nest-server-navy.vercel.app/myProperties?email=${user.email}`, {
                headers: {
                    authorization: `Barer ${user.accessToken}`
                }
            })

                .then(res => res.json())
                .then(data => {
                    setMyProperties(data);
                    console.log(data)
                    setLoading(false);
                });
        }
    }, [user]);

    
    const handleDelete = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            
            fetch(`https://home-nest-server-navy.vercel.app/properties/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    
                    Swal.fire("Deleted!", "Property has been removed.", "success");
                    
                    
                    const remaining = myProperties.filter(prop => prop._id !== id);
                    setMyProperties(remaining);
                }
            })
            .catch(error => console.error("Error deleting:", error));
        }
    });
};

    if (loading) return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg text-success"></span></div>;

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-8">
            <div className="container mx-auto">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">My Listings</h2>
                    <p className="text-gray-500 mt-2">Manage your posted properties below.</p>
                </div>

                {myProperties.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <h3 className="text-xl text-gray-400 font-medium">You haven't posted any properties yet.</h3>
                        <Link to="/addProperty" className="btn bg-success text-white mt-4">Post Now</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {myProperties.map((prop) => (
                            <div key={prop._id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-100 transition-all hover:shadow-2xl">
                                {/* Image with Category Badge */}
                                <div className="relative">
                                    <img src={prop.image} alt={prop.propertyName} className="h-52 w-full object-cover" />
                                    <span className="absolute top-4 right-4 bg-success text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                                        {prop.category}
                                    </span>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex-grow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{prop.propertyName}</h3>
                                    
                                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                                        <p className="flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-success" /> {prop.location}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <FaTag className="text-success" /> <span className="font-bold text-lg text-success">${prop.price}</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-success" /> Posted: {new Date(prop.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        <Link 
                                            to={`/updateProperty/${prop._id}`} 
                                            className="btn btn-sm btn-outline btn-info flex-1 gap-1"
                                        >
                                            <FaEdit /> Update
                                        </Link>
                                        
                                        <button 
                                            onClick={() => handleDelete(prop._id)}
                                            className="btn btn-sm bg-outline btn-error flex-1 gap-1"
                                        >
                                            <FaTrashAlt /> Delete
                                        </button>

                                        <Link 
                                            to={`/propertyDetails/${prop._id}`} 
                                            className="btn btn-sm bg-success text-white w-full gap-1 mt-2"
                                        >
                                            <FaEye /> View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProperties;