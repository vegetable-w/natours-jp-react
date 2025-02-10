import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

function SpinnerMini() {
  const spinnerStyle = {
    width: "2.4rem",
    height: "2.4rem",
    animation: "rotate 1.5s infinite linear",
  };

  return (
    <>
      <style>
        {`
              @keyframes rotate {
                to {
                  transform: rotate(1turn);
                }
              }
            `}
      </style>
      <BiLoaderAlt style={spinnerStyle} />
    </>
  );
}

export default SpinnerMini;
