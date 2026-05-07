import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
import { use } from "react";
import Swal from "sweetalert2";
import '../../index.css'


const Login = () => {
    const { signInUser, signInWithGoogle, user, loading, setLoading} = use(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state || '/'

    if (user) return <Navigate to={from} replace={true} />

  // form submit handler
  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const password = form.password.value

    try {
      //User Login
      await signInUser(email, password)
        
      navigate(from, { replace: true })
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login successfully",
        showConfirmButton: false,
        timer: 1500
});
form.reset();
    
    } catch (err) {
      console.log(err)
    //   toast.error(err?.message)
    }
  }

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      await signInWithGoogle()

      .then(result => {
                console.log("result",result);
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                }
                console.log('newUser',newUser)

                // create user in the database
                fetch('https://home-nest-server-navy.vercel.app/users',{
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data after user save', data)
                    })
    })

      navigate(from, { replace: true })
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sign In successfully",
        showConfirmButton: false,
        timer: 1500
});
    } catch (err) {
      console.log(err)
    //   setLoading(false)
    //   toast.error(err?.message)
    }
  }
    return (
         <div className='flex justify-center items-center min-h-screen bg-white my-5'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
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
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 input input-success  bg-gray-200 text-gray-900'
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
                autoComplete='current-password'
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
        <div className='space-y-1'>
          <button className='text-xs hover:underline hover:text-success text-gray-400 cursor-pointer'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='pb-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        
            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
        
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            state={from}
            to='/register'
            className='hover:underline hover:text-success text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
    );
};


export default Login;