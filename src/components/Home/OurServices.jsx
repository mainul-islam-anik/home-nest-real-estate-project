const OurServices = () => {
    return (
        <section className="py-16 bg-gray-900 text-white">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Premium Services Tailored For You</h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        At HomeNest, we go beyond just listing properties. We offer comprehensive support to ensure your real estate journey is seamless.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                            <span className="bg-blue-600 p-1 rounded-full text-white">✓</span> 
                            Property Valuation & Market Analysis
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="bg-blue-600 p-1 rounded-full text-white">✓</span> 
                            Legal Support & Documentation Assistance
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="bg-blue-600 p-1 rounded-full text-white">✓</span> 
                            Home Loan & Financial Consulting
                        </li>
                    </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400" className="rounded-lg mt-8" alt="Service 1" />
                    <img src="https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&q=80&w=400" className="rounded-lg" alt="Service 2" />
                </div>
            </div>
        </section>
    );
};

export default OurServices;