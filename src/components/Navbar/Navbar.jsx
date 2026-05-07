import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const {user, signOutUser }= useContext(AuthContext)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
        
        document.querySelector('html').setAttribute('data-theme', theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleToggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
  
  const handleSignOut = ()=>{
    signOutUser()
    .then(()=>{
      Swal.fire({
  position: "top-end",
  icon: "success",
  title: "LogOut successfully",
  showConfirmButton: false,
  timer: 1500
});
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const links = <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/allProperties">All Properties</NavLink></li>
      
      {
        user && <>
              <li><NavLink to="/addProperty">Add Property</NavLink></li>
              <li><NavLink to="/myProperties">My Properties</NavLink></li>
              <li><NavLink to="/myRatings">My Ratings</NavLink></li>
        </>
      }
  </>
  

    return (
        <div className=" bg-base-100 shadow-sm">
   <div className="navbar container mx-auto px-4">
      <div className="navbar-start">
    <div className="dropdown z-50">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {
          links
        }
      </ul>
    </div>
    
        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-success p-2 rounded-lg">
                                <span className="text-white text-xl md:text-2xl lg:text-2xl font-bold">HN</span>
                            </div>
                            <h2 className="text-xl md:text-2xl lg:text-2xl font-bold text-black tracking-wider">HomeNest</h2>
                        </div>


  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal z-50 px-1">
      {links}
    </ul>
  </div>
  {/* conditional */}
  <div className="navbar-end z-50">

    <button 
        onClick={handleToggle} 
        className="btn btn-ghost btn-circle text-xl"
        title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
        {theme === "light" ? "🌙" : "☀️"}
    </button>
        {user ? (
          
          <div className="dropdown dropdown-end z-50">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-success">
              <div className="w-10 rounded-full">
                <img 
                  alt="User Profile" 
                  src={user.photoURL || "https://i.ibb.co/kVf0hhMY/download-23.jpg"} 
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-4 shadow-xl border border-gray-100">
              <li className="mb-2">
                <p className="font-bold text-success">{user.displayName || "User Name"}</p>
                <p className="text-xs text-gray-500 break-all">{user.email}</p>
              </li>
              <hr className="my-2" />
              <li>
                <button onClick={handleSignOut} className="btn btn-sm btn-error text-white mt-2">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn bg-success bg-outline btn-sm md:btn-md">Login</Link>
            <Link to="/register" className="btn bg-success text-white btn-sm md:btn-md">Signup</Link>
          </div>
        )}
      </div>
   </div>
</div>
    );
};

export default Navbar;