import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/ProductContext';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../Config/url_configuration';

const Product = () => {
    const { products, setProducts, state: { cart }, dispatch } = useContext(CartContext);

    const [cartN, setCartN] = useState([]);
    console.log(cartN);
    console.log(cart);

    const { loggedUser, loggedUser: { _id } } = useContext(UserContext);
    // console.log(loggedUser._id);

    // const [quantity, setQuantity] = useState(1);
    // console.log(quantity);
    // const [itemId, setItemId] = useState("");



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

    const handleSort = (event) => {
        const value = event.target.value;
        let sortedProducts;

        switch (value) {
            case 'price-asc':
                sortedProducts = [...products].sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sortedProducts = [...products].sort((a, b) => b.price - a.price);
                break;
            case 'title-asc':
                sortedProducts = [...products].sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                sortedProducts = [...products].sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                sortedProducts = products;
        }

        setProducts(sortedProducts);
    };






    return (
        <div>
            <div className='filterConatiner'>
                <select onChange={handleSort}>
                    <option value="">Sort by</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="title-asc">Title (A-Z)</option>
                    <option value="title-desc">Title (Z-A)</option>
                </select>
            </div>
            <div className="product-grid">



                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <h2 style={{ paddingBottom: '20px' }}>{product.title.substring(0, 10)}</h2>
                        {/* {console.log(product._id)} */}
                        <Link to={`/product/${product._id}`}> <img src={product.image} alt={product.title} width={200} height={200} /></Link>
                        <p style={{ paddingBottom: '10px' }}>Rs.{product.price}</p>
                        <button className="add-to-cart" onClick={

                            async () => {


                                // console.log(product._id);
                                // const existingProduct = cart.find((item) => {
                                //     console.log(item);
                                //     console.log(item.productId._id);
                                //     setItemId(item._id);
                                //     console.log(product._id);
                                //     return item.productId._id === product._id;
                                // });
                                // console.log(existingProduct);
                                // console.log(`existing Product:${JSON.stringify(existingProduct)}`);
                                // if (existingProduct) {
                                //     // If the product is already in the cart, increment its quantity


                                //     axios.patch(`http://localhost:5000/api/v1/cart/update/${loggedUser._id}`, {
                                //         userId: loggedUser._id,
                                //         productId: product._id,
                                //         quantity: quantity + 1
                                //     })
                                //         .then((res) => {
                                //             alert("Product Updated to the cart Successfully");
                                //         }).catch((error) => {
                                //             console.log(error);
                                //             alert("Something went wrong");
                                //         });

                                //     dispatch({
                                //         type: "INCREMENT_QUANTITY",
                                //         payload: existingProduct
                                //     });


                                // } else {
                                //     // If the product is not in the cart, add it

                                //     const data = {
                                //         userId: loggedUser._id,
                                //         productId: product._id,
                                //         quantity: quantity
                                //     };
                                //     console.log(data);
                                //     axios.post("http://localhost:5000/api/v1/cart/add", data)
                                //         .then((res) => {
                                //             alert("Product added to cart successfully");
                                //         }).catch((error) => {
                                //             console.log(error);
                                //             alert("Something went wrong");
                                //         });
                                //     dispatch({
                                //         type: "ADD_TO_CART",
                                //         payload: product
                                //     });
                                // }

                                // Find the product in the cart

                                const existingProduct = cart.find(item => item._id === product._id);
                                // const existingProduct = cart.find(item => console.log(item));

                                if (existingProduct) {
                                    // If the product is already in the cart, increment its quantity
                                    const updatedProduct = { ...existingProduct, quantity: existingProduct.quantity + 1 };

                                    // Update the product in the cart
                                    const newCart = cart.map(item => item.productId._id === product._id ? updatedProduct : item);

                                    // Update the cart in the state
                                    dispatch({ type: 'UPDATE_CART', payload: newCart });

                                    // Update the cart in the backend
                                    await axios.patch(`${config.BASE_URL}/api/v1/cart/update/${loggedUser._id}`, {
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
                                    await axios.post(`${config.BASE_URL}/api/v1/cart/add`, {
                                        userId: loggedUser._id,
                                        productId: product._id,
                                        quantity: newProduct.quantity
                                    });
                                }

                                alert("Product added to cart successfully");

                            }


                        }>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
