import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import axios from "axios";
// import { Buffer } from 'buffer';



const Register = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        profilePic: "",
    });

    // console.log(user.profilePic);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");




    const handleonChange = (e) => {

        const { name, value } = e.target;
        setUser((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.username) {
            setError(true);
            setErrorText("Enter username*");
        } else if (!user.email) {
            setError(true);
            setErrorText("Enter email*");
        } else if (!user.password) {
            setError(true);
            setErrorText("Enter password*");
        } else if (!user.confirmPassword && user.password !== user.confirmPassword) {
            setError(true);
            setErrorText("Enter password/password doen't match*");
        } else if (user.profilePic === "") {
            setError(true);
            setErrorText("Upload profile picture*");
        } else {
            const newUser = {
                userName: user.username,
                email: user.email,
                password: user.password,
                phoneNumber: user.phoneNumber,
                profilePic: user.profilePic,
            };

            // let payload = JSON.stringify(newUser);
            // let sizeInBytes = Buffer.byteLength(payload, 'utf8');
            // console.log(`Size of payload in bytes: ${sizeInBytes}`);

            // let sizeInKilobytes = sizeInBytes / 1024;
            // console.log(`Size of payload in kilobytes: ${sizeInKilobytes}`);

            // let sizeInMegabytes = sizeInKilobytes / 1024;
            // console.log(`Size of payload in megabytes: ${sizeInMegabytes}`);

            await axios.post("https://clownfish-sari.cyclic.app/api/v1/users/create", newUser)
                .then((res) => {
                    alert(`${user.username} user is created successfully `);
                    navigate("/login");
                })
                .catch((error) => {
                    console.log(error);
                    alert("Something went worng");
                });
            setError(false);
            setUser({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                phoneNumber: "",
                profilePic: "",
            });


        };
    };




    return (
        <div className="formContainer" >

            <div className="formWrapper">

                {/* <div className="registerImageWrapper">
                    <span className="logo">Trend-Cart</span>
                    <img src={RegisterImage} alt="" width={300} height={280} />
                    <p>You do have an account? <Link to="/login">Login</Link ></p>
                </div> */}
                <div className='formElements'>
                    <span className="logo">Trend-Cart</span>
                    <span className="title">Register</span>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='Enter username' name='username' value={user.username} onChange={handleonChange} />

                        <input type="email" placeholder='Enter email' name='email' value={user.email} onChange={handleonChange} />
                        <input type="password" placeholder='Enter password' name='password' value={user.password} onChange={handleonChange} />
                        <input type="password" placeholder='Confirm password' name='confirmPassword' value={user.confirmPassword} onChange={handleonChange} />
                        <input type="tel" placeholder='Enter phone number' name='phoneNumber' value={user.phoneNumber} onChange={handleonChange} />
                        <label htmlFor="file" name='profilePicture' value={user.profilePic}>Upload profile picture</label>
                        <FileBase64
                            type="file"
                            name="profilePicture"
                            // value={user.profilePicture}
                            className="my-file-input"
                            onDone={({ base64, file }) => {
                                // Validate file size
                                const MAX_FILE_SIZE = 1024; // 1MB
                                const fileSizeKiloBytes = file.size / 1024;
                                if (fileSizeKiloBytes > MAX_FILE_SIZE) {
                                    // Show error message to user
                                    window.alert(
                                        "File is too large! Maximum file size is 1 MB."
                                    );
                                    return;
                                }

                                setUser((preValue) => {
                                    return {
                                        ...preValue,
                                        profilePic: base64,
                                    };
                                });
                            }}
                        />
                        {/* <FilesBase64 type="file" /> */}
                        <button>Register</button>
                        {error && <span className='error'>{errorText}</span>}
                        <p>You do have an account? <Link to="/login">Login</Link ></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;