import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { CartContext } from '../Context/ProductContext';

const SingleProduct = () => {
    const { loggedUser } = useContext(UserContext);
    // const [user, setUser] = useState(loggedUser);
    // console.log(user);
    const { id } = useParams();
    // console.log(id);
    const [singleProduct, setSingleProduct] = useState();

    // console.log(singleProduct);
    const { state: { cart }, dispatch } = useContext(CartContext);

    useEffect(() => {
        const fetchSingleProduct = async () => {
            await axios.get(`https://clownfish-sari.cyclic.app/api/v1/products/${id}`)
                .then((res) => {
                    setSingleProduct(res.data.product);
                }).catch((error) => {
                    console.log(error);
                });
        };
        fetchSingleProduct();
    }, [id]);

    const addToCart = async (product) => {
        const existingProduct = cart.find(item => item.productId._id === product._id);

        if (existingProduct) {
            // If the product is already in the cart, increment its quantity
            const updatedProduct = { ...existingProduct, quantity: existingProduct.quantity + 1 };

            // Update the product in the cart
            const newCart = cart.map(item => item.productId._id === product._id ? updatedProduct : item);

            // Update the cart in the state
            dispatch({ type: 'UPDATE_CART', payload: newCart });

            // Update the cart in the backend
            await axios.patch(`https://clownfish-sari.cyclic.app/api/v1/cart/update/${loggedUser._id}`, {
                userId: loggedUser._id,
                productId: product._id,
                quantity: updatedProduct.quantity
            });
        } else {
            // If the product is not in the cart, add it
            const newProduct = { ...product, quantity: 1 };

            // Add the product to the cart
            dispatch({ type: 'ADD_TO_CART', payload: [...cart, newProduct] });

            // Add the product to the cart in the backend
            await axios.post("https://clownfish-sari.cyclic.app/api/v1/cart/add", {
                userId: loggedUser._id,
                productId: product._id,
                quantity: newProduct.quantity
            });
        }

        alert("Product added to cart successfully");

    };

    return (
        <div>
            <Header />
            <div className='singleProductContainer'>

                {singleProduct && (
                    <>
                        <div className='imageContainer'>
                            <img src={singleProduct.image} alt={singleProduct.title} />
                        </div>
                        <div className='detailsContainer'>
                            <h2>{singleProduct.title}</h2>
                            <p>Price: Rs.{singleProduct.price}</p>
                            <p>{singleProduct.description}</p>
                            <button onClick={() => addToCart(singleProduct)}>Add to Cart</button>
                        </div>
                    </>
                )}

            </div>
            <Footer />
        </div>
    );
};

export default SingleProduct;
