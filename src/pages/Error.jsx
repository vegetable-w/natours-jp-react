/* eslint-disable react/prop-types */
import React from "react";

function Error({ msg }) {
  return (
    <main className="main">
      <div className="error">
        <div className="error__title">
          <h2 className="heading-secondary heading-secondary--error">
            Something went wrong
          </h2>
          <h2 className="error__emoji">😢</h2>
        </div>
        <div className="error__msg">{msg}</div>
      </div>
    </main>
  );
}

export default Error;
