import { useContext } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router';

const AddProperty = () => {
    const { user } = useContext(AuthContext);
   const navigate = useNavigate()
   const location = useLocation()
  const from = location.state || '/'

    const handleAddProperty = (e) => {
        e.preventDefault();
        const form = e.target;

        const propertyName = form.propertyName.value;
        const description = form.description.value;
        const category = form.category.value;
        const price = parseFloat(form.price.value);
        const location = form.location.value;
        const image = form.image.value;
        const sellerName = user?.displayName;
        const sellerEmail = user?.email;
        const sellerContact = form.sellerContact.value;
        const sellerImage = user?.photoURL;
        

        const newProperty = {
            propertyName,
            description,
            category,
            price,
            location,
            image,
            sellerName,
            sellerEmail,
            sellerContact,
            sellerImage,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        
        console.log(newProperty);

        fetch('https://home-nest-server-navy.vercel.app/properties',{
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newProperty)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data after product save', data)
                        Swal.fire({
            title: "Success!",
            text: "Property added successfully to the listing.",
            icon: "success",
            confirmButtonColor: "#22C55E",
        });

        
                    })
                    navigate(from, { replace: true })
        Swal.fire({
            title: "Success!",
            text: "Property added successfully to the listing.",
            icon: "success",
            confirmButtonColor: "#22C55E",
        });
        
        
        form.reset();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 flex justify-center items-center px-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-800">Add New Property</h2>
                    <p className="text-gray-500 mt-2">Fill in the details to list your property on HomeNest</p>
                </div>

                <form onSubmit={handleAddProperty} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Property Name */}
                    <div className="md:col-span-2">
                        <label className="label-text font-semibold mb-2 block text-gray-700">Property Name</label>
                        <input 
                            type="text" 
                            name="propertyName" 
                            placeholder="e.g. Modern Lakeview Villa" 
                            className="input input-bordered w-full focus:ring-2 focus:ring-success outline-none" 
                            required 
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div>
                        <label className="label-text font-semibold mb-2 block text-gray-700">Category</label>
                        <select name="category" className="select select-bordered w-full" required>
                            <option value="Rent">Rent</option>
                            <option value="Sale">Sale</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Land">Land</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="label-text font-semibold mb-2 block text-gray-700">Price ($)</label>
                        <input 
                            type="number" 
                            name="price" 
                            placeholder="Enter price" 
                            className="input input-bordered w-full" 
                            required 
                        />
                    </div>

                    {/* Location */}
                    <div className="md:col-span-2">
                        <label className="label-text font-semibold mb-2 block text-gray-700">Location</label>
                        <input 
                            type="text" 
                            name="location" 
                            placeholder="City, Area or Full Address" 
                            className="input input-bordered w-full" 
                            required 
                        />
                    </div>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                        <label className="label-text font-semibold mb-2 block text-gray-700">Image Link</label>
                        <input 
                            type="url" 
                            name="image" 
                            placeholder="https://example.com/image.jpg" 
                            className="input input-bordered w-full" 
                            required 
                        />
                    </div>

                    {/* Read-only User Name */}
                    <div>
                        <label className="label-text font-semibold mb-2 block text-gray-700 text-gray-400">Seller Name</label>
                        <input 
                            type="text" 
                            value={user?.displayName || ""} 
                            readOnly 
                            className="input input-bordered w-full bg-gray-100 cursor-not-allowed" 
                        />
                    </div>

                    {/* Read-only User Email */}
                    <div>
                        <label className="label-text font-semibold mb-2 block text-gray-700 text-gray-400">Seller Email</label>
                        <input 
                            type="email" 
                            value={user?.email || ""} 
                            readOnly 
                            className="input input-bordered w-full bg-gray-100 cursor-not-allowed" 
                        />
                    </div>

                    {/* User sellerContact */}
                    <div className="md:col-span-2">
                        <label className="label-text font-semibold mb-2 block text-gray-700">Seller Contact</label>
                        <input 
                            type="text" 
                            name="sellerContact" 
                            placeholder="Seller Contact Number" 
                            className="input input-bordered w-full focus:ring-2 focus:ring-success outline-none" 
                            required 
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="label-text font-semibold mb-2 block text-gray-700">Description</label>
                        <textarea 
                            name="description" 
                            className="textarea textarea-bordered w-full h-32" 
                            placeholder="Write a detailed description about the property..."
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 mt-4">
                        <button 
                            type="submit" 
                            className="btn btn-success w-full text-white font-bold text-lg hover:bg-secondary transition-all shadow-lg"
                        >
                            Add Property
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;