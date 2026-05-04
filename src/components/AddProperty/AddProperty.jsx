import { useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";

const AddProperty = () => {
const {user} = useContext(AuthContext)
// { id: 1, name: "Modern Skyline Apartment", category: "Rent", price: 1200, location: "Dhaka, BD", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600" },


 const handleCreateAProduct = e =>{
        e.preventDefault();
        const name = e.target.name.value;
        const category = e.target.category.value;
        const location = e.target.location.value;
        const image = e.target.image.value;
        const price = e.target.price.value;
        // const price_max = e.target.price_max.value;
        const newProduct = {name,category,location, image, price, 
            email: user.email,
            seller_name: user.displayName
        }
        console.log('newProduct', newProduct)
         fetch('http://localhost:3000/products',{
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newProduct)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data after product save', data)
                    })
        
    }

    return (
        <div>
            <form onSubmit={handleCreateAProduct}>
                                <fieldset className="fieldset">
                                    <label className="label">Name</label>
                                    <input type="text" name='name' className="input"
                                        />
                                    <label className="label">Category</label>
                                    <input type="text" name='category' className="input"
                                        />
                                    <label className="label">Location</label>
                                    <input type="text" name='location' className="input"
                                        />
                                    {/* email */}
                                    <label className="label">Image Url</label>
                                    <input type="text" className="input" name='image'/>
                                    {/* bid amount */}
                                    <label className="label">Price</label>
                                    <input type="text" name='price' className="input"
                                        placeholder='Minimum Price'
                                    />
                                    {/* bid amount
                                    <label className="label">Max Price</label>
                                    <input type="text" name='price_max' className="input"
                                        placeholder='Max Price'
                                    /> */}
                                    <button className="btn btn-neutral mt-4">Add A Product</button>
                                </fieldset>
                            </form>
        </div>
    );
};

export default AddProperty;



