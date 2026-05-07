const Testimonials = () => {
    const reviews = [
        { id: 1, name: "Sarah Johnson", role: "Home Owner", text: "HomeNest helped me find my dream apartment in less than a week. The process was incredibly smooth!", img: "https://i.pravatar.cc/150?u=sarah" },
        { id: 2, name: "David Miller", role: "Investor", text: "The commercial listings here are top-notch. I found a great office space for my startup easily.", img: "https://i.pravatar.cc/150?u=david" },
        { id: 3, name: "Rahat Ahmed", role: "Tenant", text: "Transparent pricing and verified owners make this the best real estate portal in the country.", img: "https://i.pravatar.cc/150?u=rahat" }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((rev) => (
                        <div key={rev.id} className="p-8 bg-gray-50 rounded-2xl shadow-sm border border-gray-100">
                            <p className="italic text-gray-600 mb-6">"{rev.text}"</p>
                            <div className="flex items-center gap-4">
                                <img src={rev.img} alt={rev.name} className="w-12 h-12 rounded-full border-2 border-success" />
                                <div>
                                    <h4 className="font-bold text-gray-900">{rev.name}</h4>
                                    <p className="text-sm text-gray-500">{rev.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;