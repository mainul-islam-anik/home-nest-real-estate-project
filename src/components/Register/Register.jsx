import { Link, useLocation, useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../../AuthContext/AuthContext'
import Swal from 'sweetalert2'

const Register = () => {
  const { createUser, loading } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'

  // form submit handler

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.value;

    // --- Password Validation ---
    
    // 1. Length Check (at least 6 characters)
    if (password.length < 6) {
        return Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: "Password must be at least 6 characters long.",
        });
    }

    // 2. Uppercase Letter Check
    if (!/[A-Z]/.test(password)) {
        return Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: "Password must contain at least one uppercase letter.",
        });
    }

    // 3. Lowercase Letter Check
    if (!/[a-z]/.test(password)) {
        return Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: "Password must contain at least one lowercase letter.",
        });
    }
    
    // --- End of Validation ---

    try {
        // 2. User Registration in Firebase
        const result = await createUser(email, password);
        console.log("Firebase Result:", result);

        const newUser = {
            name,
            email,
            image,
            // Storing passwords in DB is usually not recommended, 
            // but keep it if your assignment requires it.
            password 
        };

        // Create user in the database
        const response = await fetch('https://home-nest-server-navy.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        
        const data = await response.json();
        console.log('Database save result:', data);

        // Success Alert
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registration successful!",
            showConfirmButton: false,
            timer: 1500
        });

        form.reset();
        navigate(from, { replace: true });

    } catch (err) {
        console.error(err);
        Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: err.message,
        });
    }
};
 
  return (
    <div className='flex justify-center items-center min-h-screen bg-white my-5'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to HomeNest</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 input input-success bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            {/* Image */}
            <div>
              <label
                htmlFor='image'
                className='block mb-2 text-sm font-medium text-gray-700'
              >
                Profile Image
              </label>
              <input
                name='image'
                type='url'
                id='image'
                placeholder='Image URL'
                className='w-full px-3 py-2 border rounded-md border-gray-300 input input-success bg-gray-200 text-gray-900 input iput-success'
              />
              
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 input input-success bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 input input-success bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-success w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <span className="loading loading-bars loading-xl"></span>
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-success text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Register