// import React, { useEffect } from 'react';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';


const Checkout = () => {

    // useEffect(() => {
    //     if (!sessionStorage.getItem('hasReloaded')) {
    //         sessionStorage.setItem('hasReloaded', 'true');
    //         window.location.reload();
    //     }
    // }, []);

    return (
        <div>
            <Header />
            <div style={{ textAlign: "center", padding: '20px', display: "flex", justifyContent: "center", alignItems: "center", minHeight: "85vh" }}><span >Your order has been placed successfully. </span>
                <Link to="/"><button className='homeBtn'>Back to Home</button></Link></div>
            <Footer />

        </div >
    );
};

export default Checkout;