import React from "react";

function Spinner() {
  const spinnerStyle = {
    margin: "4.8rem auto",
    width: "6.4rem",
    aspectRatio: "1",
    borderRadius: "50%",
    background: `
          radial-gradient(farthest-side, #7dd56f 94%, transparent)
          top/10px 10px no-repeat,
          conic-gradient(transparent 30%, #7dd56f)
        `,
    WebkitMask:
      "radial-gradient(farthest-side, transparent calc(100% - 10px), black 0)",
    animation: "rotate 1.5s infinite linear",
  };

  const keyframesStyle = `
        @keyframes rotate {
          to {
            transform: rotate(1turn);
          }
        }
      `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={spinnerStyle}></div>
    </>
  );
}

export default Spinner;
