import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5 text-center">
            {/* একটি সুন্দর ইলাস্ট্রেশন বা ইমেজ (অনলাইন থেকে কোনো ৪-০-৪ ইমেজ লিঙ্ক দিতে পারেন) */}
            <img 
                src="https://i.ibb.co.com/R4vhh711/download-28.jpg"
                alt="404 Not Found" 
                className=" max-w-md mb-8"
            />
            
            <h1 className="text-6xl font-bold text-success mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                Oops! Page Not Found
            </h2>
            <p className="text-gray-600 mb-8 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            {/* হোম পেজে ফিরে যাওয়ার বাটন */}
            <Link to="/">
                <button className="btn btn-success text-white px-8 py-3 rounded-full hover:shadow-lg transition-all">
                    Back to Home
                </button>
            </Link>
        </div>
    );
};

export default NotFound;