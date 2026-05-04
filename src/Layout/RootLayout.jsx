
import Footer from '../components/Footer/Footer.jsx';
import Navbar from '../components/Navbar/Navbar.jsx';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;