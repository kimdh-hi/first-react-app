import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/test").then(response => console.log(response.data));
  }, []);

  return (
    <div>
      <h2>Langding Page</h2>
    </div>
  );
}

export default LandingPage;
