import React from "react";

const NoPage = () => {
  return (
    <div>
      <h2 className="text-3xl" style={{color: mode === "dark" ? "rgb(226, 232, 240)" : " rgb(30, 41, 59)"}}>The page does not exist.</h2>
    </div>
  );
};

export default NoPage;
