import React, { useContext, useEffect, useState } from 'react';
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
// import { FaUserCircle, FaShoppingCart, FaSistrix } from "react-icons/fa";
// import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/ProductContext';
import axios from 'axios';
import config from '../Config/url_configuration';






const Header = () => {


    const { loggedUser, loggedUser: { _id } } = useContext(UserContext);
    // console.log(loggedUser.userName);
    const { state: { cart } } = useContext(CartContext);
    console.log(cart);
    console.log(cart.length);


    const [cartN, setCartN] = useState([]);
    const [cartLength, setCartLength] = useState("");
    console.log(cartN.length);
    // useEffect(() => {

    //     if (_id) {
    //         console.log(_id);
    //         axios
    //             .get(`https://dull-gold-marlin-tux.cyclic.app/api/v1/cart/${_id}`)
    //             .then((res) => {
    //                 console.log(res.data.cart.items);
    //                 const cartData = res.data.cart;
    //                 const itemsLength = cartData.items.length;
    //                 setCartN(res.data.cart.items);
    //                 setCartLength(itemsLength);
    //             })
    //             .catch((err) => console.log(err));
    //     }
    // }, [_id]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (_id) {
    //             console.log(_id);
    //             try {
    //                 const res = await axios.get(`https://dull-gold-marlin-tux.cyclic.app/api/v1/cart/${_id}`);
    //                 console.log(res.data.cart.items);
    //                 const cartData = res.data.cart;
    //                 const itemsLength = cartData.items.length;
    //                 setCartN(res.data.cart.items);
    //                 setCartLength(itemsLength);
    //             } catch (err) {
    //                 console.log(err);
    //             }
    //         }
    //     };
    //     fetchData();
    // }, [_id]);

    useEffect(() => {
        const fetchData = async () => {
            if (_id) {
                console.log(_id);
                try {
                    const res = await axios.get(`${config.BASE_URL}/api/v1/cart/${_id}`);
                    console.log(res.data.cart.items);
                    const cartData = res.data.cart;
                    const itemsLength = cartData.items.length;
                    setCartN(res.data.cart.items);
                    setCartLength(itemsLength);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        fetchData();
    }, [_id, cart.length]);


    const [clicked, setClicked] = useState(false);
    const [navVisible, setNavVisible] = useState(false);
    return (
        <div className='container'>
            <div className='headerContainer'>
                <div className='logoContainer' style={{ width: '20%' }}> <span className="logo"><Link to='/'>Trend-Cart</Link></span></div>

                <div className={`navCot ${navVisible ? 'visible' : ''}`} style={{ width: '80%' }} >
                    {/* <div className='searchContainer' style={{ width: '70%' }} >
                        <input type='text' placeholder='Search Products...' style={{ width: '100%', padding: '8px 10px', outline: 'transparent', borderColor: '#0199cb', borderRadius: '5px' }} />
                        <FaSistrix className="icon" style={{
                            color: "#0199cb",
                            fontSize: "20px",
                            position: 'absolute',
                            top: '10px',
                            right: '10px'
                        }}></FaSistrix>
                    // </div> */}
                    <div className='navContainer' style={{ width: '30%' }}>
                        <div className='navigation' >
                            <ul className='navLinks'>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/products">Products</Link></li>
                                <li><Link to="/cart">Cart</Link></li>
                            </ul>
                        </div>

                        <div className='accountContainer'>
                            {loggedUser.userName && <span style={{
                                padding: '5pX 10px',
                                borderRadius: '50%',
                                backgroundColor: '#0199cb',
                                color: 'white',
                                fontSize: '12px',
                                cursor: 'pointer'
                            }}>{loggedUser.userName.charAt(0).toUpperCase()}</span>}
                            <Link to='/profile'><FaUserCircle className="icon" style={{ color: "#0199cb", fontSize: "25px", marginTop: '5px' }}></FaUserCircle></Link>
                            <Link to='/cart'><FaShoppingCart className="icon" style={{ color: "#0199cb", fontSize: "25px", position: "relative", marginTop: '5px' }}>

                            </FaShoppingCart></Link>
                            {cart && <span style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-10px',
                                padding: '2.5px 5px',
                                borderRadius: '50%',
                                backgroundColor: '#0199cb',
                                color: 'white',
                                fontSize: '10px'
                            }}>
                                {cart.length === 1 && cart.length === 0 ? cartLength : cart.length - 1}
                            </span>}
                        </div>
                    </div>
                </div>
                <div className={`menu ${clicked ? 'clicked' : ''}`} onClick={() => { setClicked(!clicked); setNavVisible(!navVisible); }}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>
        </div >
    );
};

export default Header;