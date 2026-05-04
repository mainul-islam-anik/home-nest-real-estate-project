
const WhyChooseUs = () => {
    const reasons = [
        { id: 1, icon: "🏢", title: "Wide Range of Properties", description: "From luxury villas to affordable apartments, we have the most diverse listings." },
        { id: 2, icon: "🛡️", title: "Trusted by Thousands", description: "Our platform ensures verified listings and secure transactions for every client." },
        { id: 3, icon: "💰", title: "Best Market Price", description: "We provide competitive pricing with no hidden costs, ensuring value for your money." },
        { id: 4, icon: "⚡", title: "Fast & Easy Process", description: "Search, visit, and finalize your dream property in just a few clicks." }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Choose Us</h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">We provide the best real estate services with a focus on trust, speed, and variety.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reasons.map((reason) => (
                        <div key={reason.id} className="p-8 border rounded-2xl hover:bg-blue-50 transition-colors text-center">
                            <div className="text-5xl mb-4">{reason.icon}</div>
                            <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
                            <p className="text-gray-600">{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;