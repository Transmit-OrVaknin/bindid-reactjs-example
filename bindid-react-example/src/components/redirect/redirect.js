import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Passport from "../passport/passport";

//  render redirect page
function BindIDRedirect(props) {
  const { tsService } = props;
  const [tokenData, setTokenData] = useState();

  useEffect(() => {
    window.XmBindId.processRedirectResponse().then(
      (res) => {
        // fetch authorization code only once
        if (!tokenData) {
          console.log("AUTHORIZATION CODE:", res.code);
          sendAuthCodeToServer(res.code);
        }
      },
      (err) => {
        handleError(err);
      }
    );
  });
  function sendAuthCodeToServer(authCode) {
    const nonce = window.localStorage.getItem("XM_BINDID_NONCE_KEY") || null;

    // Send the authCode to the application server
    fetch(tsService.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: authCode }),
    })
      .then((res) => res.json())
      .then(async (body) => {
        // If authorization code is invalid server will report an error, we check first for any error otherwise we will decode JWT:
        if (body.hasOwnProperty("error")) {
          // Display an error message to the user
          alert(
            "Server responded with error: " +
              body.error +
              ", " +
              body.error_description
          );
          // Redirect to login page
          window.location.href = tsService.home;
        } else {
          // JWT decode:
          const mToken = JSON.parse(
            atob(body.id_token.split(".")[1], "base64")
          );
          document.getElementById("rawTokenData").textContent = JSON.stringify(
            mToken,
            null,
            4
          );

          // Send the idToken/JWT to the application server and validate
          const resp = await fetch(tsService.validationUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idToken: body.id_token,
              jwksUrl: tsService.jwksUrl,
              nonce,
            }),
          });

          const data = await resp.json();
          const validationDiv = document.getElementById("validateToken");

          if (!data.ok) {
            validationDiv.textContent = data.errors;
            validationDiv.classList.add("text-danger");
          } else {
            validationDiv.innerHTML = data.msg;
            validationDiv.classList.add("text-success");
          }
          setTokenData(mToken);
          document
            .getElementById("successCard")
            .classList.remove("visually-hidden");
        }
      })
      //  Handle Error:
      .catch((error) => {
        console.error(error);
        alert("perform error handling here");
      });
  }

  function handleError(err) {
    console.error(err);
    if (err.code === 2) {
      alert(
        "Login was denied. Your login was not completed because you denied the request"
      );
    } else {
      alert(err.message);
    }
    window.location.href = tsService.home;
  }

  function userPassportCardonClick() {
    let rawTokenDataCard = document.getElementById("rawTokenData");
    let userPassportCard = document.getElementById("userPassport");
    let validateTokenDataCard = document.getElementById("validateToken");
    rawTokenDataCard.classList.remove("show");
    validateTokenDataCard.classList.remove("show");
    userPassportCard.classList.add("show");
  }

  function rawTokenDataCardonClick() {
    let userPassportCard = document.getElementById("userPassport");
    let rawTokenDataCard = document.getElementById("rawTokenData");
    let validateTokenDataCard = document.getElementById("validateToken");
    userPassportCard.classList.remove("show");
    validateTokenDataCard.classList.remove("show");
    rawTokenDataCard.classList.add("show");
  }

  function validateTokenDataCardonClick() {
    let userPassportCard = document.getElementById("userPassport");
    let rawTokenDataCard = document.getElementById("rawTokenData");
    let validateTokenDataCard = document.getElementById("validateToken");
    userPassportCard.classList.remove("show");
    rawTokenDataCard.classList.remove("show");
    validateTokenDataCard.classList.add("show");
  }

  return (
    <div className="container">
      <div
        id="successCard"
        className="visually-hidden card mt-3 p-3 shadow border-0 d-flex align-items-center justify-content-center"
      >
        <h1>Success!</h1>
        <h3>Your token data is:</h3>
        <p>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#userPassport"
            aria-expanded="true"
            aria-controls="userPassport"
            onClick={() => {
              userPassportCardonClick();
            }}
          >
            User Passport
          </button>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#rawTokenData"
            aria-expanded="false"
            aria-controls="rawTokenData"
            onClick={() => {
              rawTokenDataCardonClick();
            }}
          >
            Decoded Token
          </button>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#validateToken"
            aria-expanded="false"
            aria-controls="validateToken"
            onClick={() => {
              validateTokenDataCardonClick();
            }}
          >
            Validate Token
          </button>
        </p>
        <div id="userPassport" className="card p-2 shadow collapse show">
          <table className="table table-dark table-hover">
            <tbody>{tokenData && <Passport tokenData={tokenData} />}</tbody>
          </table>
        </div>
        <pre id="rawTokenData" className="card p-2 shadow collapse"></pre>
        <div id="validateToken" className="card p-4 shadow collapse"></div>
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

BindIDRedirect.propTypes = {
  tsService: PropTypes.object,
};

export default BindIDRedirect;
