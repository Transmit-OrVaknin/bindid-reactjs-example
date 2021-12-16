import React, { useEffect } from "react";
import PropTypes from "prop-types";

//  render initial login page
export default function Error(props) {
  const { err } = props;
  useEffect(() => {
    console.log("ERROR PAGE RENDERED");
  });

  return (
    <div className="container">
      <div
        id="exampleCard"
        className="card mt-3 p-3 shadow border-0 d-flex align-items-center justify-content-center"
      >
        <img
          src="media/app-logo.svg"
          className="col-6 img-fluid p-2 m-3"
          alt=""
        />
        <div id="errorContainer" className="d-grid">
          <h2 className="h2">{err}</h2>
        </div>
      </div>
    </div>
  );
}

Error.propTypes = {
  err: PropTypes.object,
};
