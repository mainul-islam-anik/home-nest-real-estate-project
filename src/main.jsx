import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Layout/RootLayout.jsx';
import Home from './components/Home/Home.jsx';
import Register from './components/Register/Register.jsx';
import AuthProvider from './AuthContext/AuthProvider.jsx';
import Login from './components/Login/Login.jsx';
import AllProperties from './components/AllProperties/AllProperties.jsx';
import MyProperties from './components/MyProperties/MyProperties.jsx';
import AddProperty from './components/AddProperty/AddProperty.jsx';
import PrivateRouter from './Routers/PrivateRouter.jsx';
// import MyRatings from './components/MyRatings/MyRatings.jsx';
import PropertyDetails from './components/PropertyDetails/PropertyDetails.jsx';
import UpdateProperty from './components/UpdateProperty/UpdateProperty.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'allProperties',
        loader: ({params})=> fetch('http://localhost:3000/properties'),
        Component: AllProperties
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'myProperties',
        loader: ({params}) => fetch(`http://localhost:3000/properties/${params.id}`),

        element: <PrivateRouter><MyProperties></MyProperties></PrivateRouter>
      },
      {
        path: 'addProperty',
        element: <PrivateRouter><AddProperty></AddProperty></PrivateRouter>
      },
      // {
      //   path: 'myRatings',
      //   element: <PrivateRouter><MyRatings></MyRatings></PrivateRouter>
      // },
      {
        path: 'propertyDetails/:id',
        loader: ({params}) => fetch(`http://localhost:3000/properties/${params.id}`),
        element: <PrivateRouter><PropertyDetails></PropertyDetails></PrivateRouter>
      },
      {
        path: 'updateProperty/:id',
        loader: ({params}) => fetch(`http://localhost:3000/properties/${params.id}`),
        element: <PrivateRouter><UpdateProperty></UpdateProperty></PrivateRouter>
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
