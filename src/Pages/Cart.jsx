import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import { CartContext } from '../Context/ProductContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import emptyCart from '../images/emptyCart.jpg';
import { UserContext } from '../Context/UserContext';
import Footer from '../Components/Footer';
import config from '../Config/url_configuration';




const Cart = () => {

    const { loggedUser, loggedUser: { _id } } = useContext(UserContext);



    console.log(_id);
    const { state: { cart }, dispatch } = useContext(CartContext);
    const [cartN, setCartN] = useState([]);
    console.log(cartN);
    // console.log(cart);

    // const [cartDisplay, setCartDisplay] = useState(cart);



    useEffect(() => {

        if (_id) {
            console.log(_id);
            axios
                .get(`${config.BASE_URL}/api/v1/cart/${_id}`)
                .then((res) => {
                    console.log(res.data.cart.items);
                    setCartN(res.data.cart.items);
                })
                .catch((err) => console.log(err));
        }
    }, [_id, cart]);








    // const calculateTotalPrice = () => {
    //     let total = 0;
    //     for (let product of cart) {
    //         total += Number((product.productId?.price * product.quantity).toFixed(2));
    //     }
    //     return total;
    // };

    const calculateTotalPrice = () => {
        return Number(cartN.reduce((total, product) => {
            return total + product.productId?.price * product.quantity;
        }, 0).toFixed(2));
    };




    // const removeCartItem = (prod) => {
    //     // console.log(prod._id);

    //     axios
    //         .delete(
    //             `https://dull-gold-marlin-tux.cyclic.app/api/v1/cart/remove/${prod._id}`
    //         )
    //         .then((response) => {
    //             console.log("Product removed from cart:", response.data);
    //             alert("product removed");


    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             console.error("Error removing product from cart:", error);
    //             alert("error");
    //         });

    //     // dispatch({ type: 'REMOVE_FROM_CART', payload: prod });

    //     const newCart = cartN.filter(product => {
    //         console.log(product._id);
    //         return product._id !== prod._id;
    //     });


    //     if (newCart.length > 0) {
    //         console.log(newCart);
    //         setCartN(newCart);
    //         dispatch({ type: 'REMOVE_FROM_CART', payload: newCart });

    //     } else {
    //         let emptyCartN = [
    //             {}
    //         ];
    //         setCartN([]);
    //         dispatch({ type: 'REMOVE_FROM_CART', payload: emptyCartN });

    //     }

    //     console.log(prod);




    // };

    const removeCartItem = async (prod) => {
        try {
            const response = await axios.delete(`${config.BASE_URL}/api/v1/cart/remove/${prod._id}`);
            console.log("Product removed from cart:", response.data);
            alert("product removed");

            const newCart = cartN.filter(product => product._id !== prod._id);

            if (newCart.length > 0) {
                console.log(newCart);
                setCartN(newCart);
                dispatch({ type: 'REMOVE_FROM_CART', payload: newCart });
            } else {
                let emptyCartN = [{}];
                setCartN([]);
                dispatch({ type: 'REMOVE_FROM_CART', payload: emptyCartN });
            }

            console.log(prod);
        } catch (error) {
            console.log(error);
            console.error("Error removing product from cart:", error);
            alert("error");
        }
    };




    const handlePayment = () => {

        let emptyCart = [
            {}
        ];
        axios.delete(`${config.BASE_URL}/api/v1/cart/delete/${loggedUser._id}`)
            .then((res) => {

                dispatch({
                    type: "EMPTY_CART",
                    payload: emptyCart
                });
                alert("Successfully Order placed ");
                // setCartDisplay(emptyCart);


            })
            .catch((error) => console.log(error));






    };

    return (
        <div>
            <Header />
            {cartN.length ? < div className='cartContainerDiv'>
                <div className='cartContainer' style={{ borderCollapse: "collapse", width: "70%" }}>
                    <table style={{ borderCollapse: "collapse", width: "100%" }} >
                        <thead>
                            <tr className="cartHead">
                                <td>Image</td>
                                <td>Product</td>
                                <td>Quantity</td>
                                <td>Price</td>
                                <td>SubTotal</td>
                                <td> </td>
                            </tr>

                        </thead>
                        <tbody>
                            {cartN.map((product, index) => {
                                // console.log(cart);
                                return (
                                    <tr key={index} className="cart-product" >
                                        <td className='txt'><img src={product.productId.image} alt={product.productId.title} width={50} height={50} /></td>
                                        <td className='txt'>{product.productId.title.substring(0, 10)}</td>
                                        <td className='txt'>
                                            {/* <button className='incrementBtn' onClick={() => handleDecrementQuantity(product.productId?._id)}>-</button> */}
                                            {product?.quantity}
                                            {/* <button className='decrementBtn' onClick={() => handleIncrementQuantity(product.productId?._id)}>+</button> */}
                                        </td>
                                        <td className='txt'>Rs.{product.productId.price}</td>
                                        <td className='txt'>Rs.{(product.productId.price) * product.quantity}</td>
                                        <td><button className="removeBtn"
                                            onClick={() => removeCartItem(product)}
                                        >X</button></td>

                                    </tr>

                                );
                            })}

                        </tbody>
                    </table>

                    {/* <button className='cancelBtn' onClick={handleCancel}>Cancel</button> */}
                    {/* <button className='updateBtn' onClick={handleUpdate}>Update</button> */}
                </div>
                <div className='paymentContainer'>
                    <h1 className='title'>Cart Total</h1>
                    <table style={{ borderCollapse: "collapse", width: "100%" }} >

                        <tbody>
                            <tr className="cartTotal">
                                <td colSpan="4">Total</td>
                                <td>Rs.{calculateTotalPrice()}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to="/checkout"><button className='paymentBtn' style={{ cursor: "pointer" }} onClick={handlePayment}>Proceed to payment</button></Link>


                </div>
            </div> :
                <div className="emptyCartConatiner"> <p>No Products In the cart</p>
                    <img src={emptyCart} alt='' width={250} height={250} />
                    <Link to="/"><button className='homeBtn' >Back to Home</button></Link></div>
            }
            <Footer />

        </div >



    );
};
export default Cart;