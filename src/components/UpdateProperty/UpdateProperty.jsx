import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../../AuthContext/AuthContext';
import Swal from 'sweetalert2';

const UpdateProperty = () => {
    const { id } = useParams(); 
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [property, setProperty] = useState({});
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        fetch(`https://home-nest-server-navy.vercel.app/properties/${id}`)
            .then(res => res.json())
            .then(data => {
                setProperty(data);
                setLoading(false);
            })
            .catch(err => console.error("Error fetching property:", err));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedProperty = {
            propertyName: form.propertyName.value,
            description: form.description.value,
            category: form.category.value,
            price: parseFloat(form.price.value),
            location: form.location.value,
            image: form.image.value,
        };

        
        fetch(`https://home-nest-server-navy.vercel.app/properties/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedProperty)
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: "Success!",
                    text: "Property updated successfully.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
                
                navigate(`/propertyDetails/${id}`)
            }
        });
    };

    if (loading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Update Property</h2>

                <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Property Name */}
                    <div className="md:col-span-2">
                        <label className="label-text font-bold mb-2 block">Property Name</label>
                        <input type="text" name="propertyName" defaultValue={property.propertyName} className="input input-bordered w-full" required />
                    </div>

                    {/* Category Dropdown */}
                    <div>
                        <label className="label-text font-bold mb-2 block">Category</label>
                        <select name="category" defaultValue={property.category} className="select select-bordered w-full" required>
                            <option value="Rent">Rent</option>
                            <option value="Sale">Sale</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Land">Land</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="label-text font-bold mb-2 block">Price ($)</label>
                        <input type="number" name="price" defaultValue={property.price} className="input input-bordered w-full" required />
                    </div>

                    {/* Location */}
                    <div className="md:col-span-2">
                        <label className="label-text font-bold mb-2 block">Location</label>
                        <input type="text" name="location" defaultValue={property.location} className="input input-bordered w-full" required />
                    </div>

                    {/* Image Link */}
                    <div className="md:col-span-2">
                        <label className="label-text font-bold mb-2 block">Image Link</label>
                        <input type="url" name="image" defaultValue={property.image} className="input input-bordered w-full" required />
                    </div>

                    {/* Read-only User Name */}
                    <div>
                        <label className="label-text font-bold mb-2 block text-gray-400">User Name</label>
                        <input type="text" value={user?.displayName} readOnly className="input input-bordered w-full bg-gray-100 cursor-not-allowed" />
                    </div>

                    {/* Read-only User Email */}
                    <div>
                        <label className="label-text font-bold mb-2 block text-gray-400">User Email</label>
                        <input type="email" value={user?.email} readOnly className="input input-bordered w-full bg-gray-100 cursor-not-allowed" />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="label-text font-bold mb-2 block">Description</label>
                        <textarea name="description" defaultValue={property.description} className="textarea textarea-bordered w-full h-32" required></textarea>
                    </div>

                    <div className="md:col-span-2 mt-4">
                        <button type="submit" className="btn btn-success w-full text-white font-bold text-lg">Update Property</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProperty;