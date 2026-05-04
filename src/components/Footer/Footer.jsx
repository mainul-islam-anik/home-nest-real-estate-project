
import { FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // নতুন X লোগোর জন্য

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Column 1: Logo & Name */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-success p-2 rounded-lg">
                                <span className="text-white text-2xl font-bold">HN</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-wider">HomeNest</h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Your trusted partner in finding the perfect place to call home. We provide reliable listings and seamless experiences for buyers and renters alike.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-6 uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><a href="/" className="hover:text-success transition-colors">Home</a></li>
                            <li><a href="/all-properties" className="hover:text-success transition-colors">All Properties</a></li>
                            <li><a href="/terms" className="hover:text-success transition-colors">Terms & Conditions</a></li>
                            <li><a href="/privacy" className="hover:text-success transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Details */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-6 uppercase tracking-wider">Contact Us</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="mt-1 text-success" />
                                <span>123 Real Estate Ave, Gulshan 2,<br /> Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-success" />
                                <span>+880 1234 567 890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-success" />
                                <span>support@homenest.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Social Media */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-6 uppercase tracking-wider">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                                <FaFacebook size={20} />
                            </a>
                            <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-black hover:text-white transition-all">
                                <FaXTwitter size={20} /> {/* নতুন X লোগো */}
                            </a>
                            <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 hover:text-white transition-all">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-700 hover:text-white transition-all">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                        <div className="mt-6">
                            <h4 className="text-white text-sm font-medium mb-2">Subscribe to Newsletter</h4>
                            <div className="flex">
                                <input 
                                    type="email" 
                                    placeholder="Your Email" 
                                    className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none w-full border border-gray-700"
                                />
                                <button className="bg-success px-4 py-2 rounded-r-md text-white font-semibold hover:bg-blue-700">Join</button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-800 mb-8" />

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} HomeNest. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                        <a href="#" className="hover:text-white">Cookies Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;