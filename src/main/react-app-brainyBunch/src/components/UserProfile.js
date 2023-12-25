import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../css/userProfile.css";
function UserProfile() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const username = localStorage.getItem("username");

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const userProfile = async () => {
      const response = await fetch(
        "http://localhost:8080/userProfile/" + username,
        {
          method: "get",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("username", username);
        setIsLoading(false);
      } else {
        setErrorMessage(data.errorMessage);
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      if (isLoading) {
        userProfile();
      }
    }, []);
  });

  return (
    <div>
      <div className="userProfile-nav">
        <h2>Welcome! {username}</h2>
        <div>
          <div>
            <Link to={`/${username}/editProfile`}>Edit</Link>
            &nbsp;&nbsp;
            <Link to="/userCollection">User Collection</Link>
            &nbsp;&nbsp;
            <Link to="/searchMusic">Find Music</Link>
          </div>
        </div>
      </div>
     
      <div>
        <table>
          <thead>
          <tr>
              <th>User Profile</th>
            </tr>
          <tr>
              <td>Username</td>
            </tr>
            <tr>
              <td>email</td>
            </tr>
            <tr>
              <td>pronoun</td>
            </tr>
            <tr>
              {/* <td>{data.email}</td> */}
              {/* <td>{data.pronoun}</td> */}
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
export default UserProfile;
