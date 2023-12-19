import React, { useContext, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import Header from '../Components/Header';
import FileBase64 from "react-file-base64";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import config from '../Config/url_configuration';



const Profile = () => {
    const navigate = useNavigate();
    const { loggedUser } = useContext(UserContext);
    // const loggedInUser = loggedUser;
    // // console.log(loggedInUser);
    const [user, setUser] = useState(loggedUser);
    // console.log(user);

    const [isEditing, setIsEditing] = useState(false);




    const handleEdit = (e) => {
        if (isEditing) {
            handleSave(e);
        }
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };


    const handleSave = async (e) => {
        e.preventDefault();
        const updatedUser = {
            userName: user.userName,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
            profilePic: user.profilePic,
        };

        // console.log(updatedUser);

        await axios.put(`${config.BASE_URL}/api/v1/users/${user._id}`, updatedUser)
            .then((updatedUser) => {
                alert("User details updated successfully");
            })
            .catch((error) => {
                console.log(error);
                alert("Something went worng");
            });
    };


    const handleDelete = async (e) => {
        if (window.confirm("Are you to delete the user")) {
            await axios.delete(`${config.BASE_URL}/api/v1/users/${user._id}`)
                .then((deleteduser) => {
                    alert("User Deleted successfully");
                    sessionStorage.removeItem("loggedInUser");
                    navigate("/login");

                })
                .catch((error) => {
                    console.log(error);
                    alert("Something went worng");
                });
        }


    };

    const handleLogout = async (e) => {
        sessionStorage.removeItem("loggedInUser");
        navigate("/login");
    };

    return (
        <div >
            <Header />
            <div className='profileContainer'>
                {isEditing ? (

                    <div className='editing'>
                        <img src={user.profilePic} alt="Profile Pic" width={250} height={250} />

                        <label>Name:</label>
                        <input type="text" name="userName" value={user.userName} onChange={handleChange} /><br />
                        <label>Email:</label>
                        <input type="email" name="email" value={user.email} readOnly /><br />
                        <label>Password:</label>
                        <input type="password" name="password" value={user.password} readOnly /><br />
                        <label>Phone Number:</label>
                        <input type="tel" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} /><br />
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
                    </div>
                ) : (
                    <div className="display" >
                        <img src={user.profilePic} alt="Profile Pic" width={250} height={250} />
                        <p>Name: {user.userName}</p>
                        <p>Email: {user.email}</p>
                        <p>Password: {user.password}</p>
                        <p>Phone Number: {user.phoneNumber}</p>
                    </div>
                )}
                <div className='buttonContainer'>
                    <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <Footer />

        </div>
    );
};

export default Profile;
