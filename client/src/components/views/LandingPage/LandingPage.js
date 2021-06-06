import React from "react";
import axios from "axios";

function LandingPage(props) {
  const onLogoutHandler = () => {
    axios.get("/api/users/logout").then(response => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("error");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>Landing Page</h2>

      <button onClick={onLogoutHandler}>Logout</button>
    </div>
  );
}

export default LandingPage;
