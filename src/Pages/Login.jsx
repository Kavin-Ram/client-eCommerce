import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../Context/UserContext';



const Login = () => {


    const { users, setLoggedUser } = useContext(UserContext);
    const [emailCopySuccess, setEmailCopySuccess] = useState('');
    const [passwordCopySuccess, setPasswordCopySuccess] = useState('');
    // console.log(users);

    const [loginUser, setloginUser] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const navigate = useNavigate();

    const handleonChange = (e) => {

        const { name, value } = e.target;
        setloginUser((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!loginUser.email) {
            setError(true);
            setErrorText("Enter email*");
        } else if (!loginUser.password) {
            setError(true);
            setErrorText("Enter password*");
        } else {
            // let allusers = Object.values(users);
            // console.log(allusers);
            let getLoggedinUserDetails = users.find((user) =>
                user.email === loginUser.email && user.password === loginUser.password
            );

            // console.log(getLoggedinUserDetails);

            if (getLoggedinUserDetails) {
                setLoggedUser(getLoggedinUserDetails);
                // const { _id } = getLoggedinUserDetails;
                // console.log(_id);
                alert("User successfully logged in");
                navigate(`/`);


                // Save the logged-in user's data in sessionStorage
                sessionStorage.setItem('loggedInUser', JSON.stringify(getLoggedinUserDetails));
            } else {
                setError(true);
                setErrorText("Email/Password Wrong*");
            }

        };
    };


    const copyToClipboard = async (text, type) => {
        try {
            await navigator.clipboard.writeText(text);
            if (type === 'email') {
                setEmailCopySuccess('Copied!');
                setTimeout(() => setEmailCopySuccess(''), 1000);
            } else if (type === 'password') {
                setPasswordCopySuccess('Copied!');
                setTimeout(() => setPasswordCopySuccess(''), 1000);
            }
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };



    return (
        <div className="formContainer login" >

            <div className="formWrapper">

                {/* <div className="registerImageWrapper">
                    <span className="logo">Trend-Cart</span>
                    <img src={RegisterImage} alt="" width={300} height={280} />
                    <p>You do have an account? <Link to="/login">Login</Link ></p>
                </div> */}
                <div className='formElements'>
                    <span className="logo">Trend-Cart</span>
                    <span className="title">Login</span>
                    <form onSubmit={handleSubmit}>

                        <input type="email" placeholder='Enter email' name="email" onChange={handleonChange} />
                        <input type="password" placeholder='Enter password' name="password" onChange={handleonChange} />

                        <button>Login</button>
                        {error && <span className='error'>{errorText}</span>}
                        <span title="Click to copy the mail" style={{ cursor: 'pointer' }} onClick={() => copyToClipboard('testuser@gmail.com', 'email')}> email: testuser@gmail.com</span>
                        {emailCopySuccess && <span style={{ color: 'green' }}>{emailCopySuccess}</span>}
                        <span title="Click to copy the password" style={{ cursor: 'pointer' }} onClick={() => copyToClipboard('123456789', 'password')}> password: 123456789</span>
                        {passwordCopySuccess && <span style={{ color: 'green' }}>{passwordCopySuccess}</span>}
                        <p>New User?<Link to="/register"> Register here!</Link ></p>
                    </form>
                </div>
            </div>
        </div>
    );
};




export default Login;