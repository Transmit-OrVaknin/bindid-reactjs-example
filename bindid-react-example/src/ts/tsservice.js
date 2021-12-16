export default class TransmitService {
  constructor() {
    this.XmBindId = window.XmBindId;
    // Always use the API behavior of the latest version - UseLatest
    this.apiCompat = window.XmBindId.XmBindIdApiCompatibilityLevel.UseLatest;
    // Configure the BindID SDK with your client ID
    this.clientId = process.env.REACT_APP_BINDID_CLIENT_ID;
    this.redirectUri = process.env.REACT_APP_REDIRECT_URI;
    this.tokenUrl = process.env.REACT_APP_SERVER_TOKEN_URL;
    this.home = process.env.REACT_APP_HOME_URI;
    this.validationUrl = process.env.REACT_APP_SERVER_VALIDATE_URL;
    this.jwksUrl = process.env.REACT_APP_JWKS_URL;
  }

  // SDK Initialization:
  async initializeBindIdSDK() {
    this.XmBindId.initialize({
      clientId: this.clientId,
      apiCompat: this.apiCompat,
    }).then((res) => {
      console.log("BINDID SDK INITIALIZED");
    });
  }

  // Authenticate the user
  authenticateBindId() {
    try {
      console.log("AUTHENTICATE WITH BINDID", this.redirectUri);
      this.XmBindId.authenticate({
        redirectUri: this.redirectUri,
        nonce:
          window.localStorage.getItem("XM_BINDID_NONCE_KEY") ||
          this.getRandomInt("nonce"),
        state:
          window.localStorage.getItem("XM_BINDID_STATE_KEY") ||
          this.getRandomInt("state"),
        scope: [
          window.XmBindId.XmBindIdScopeType.Email,
          window.XmBindId.XmBindIdScopeType.NetworkInfo,
        ],
      });
      //  Handle Error:
      // Display an error message to the user
    } catch (error) {
      console.log("BIND AUTHENTICATION FAILED", error);
      alert("BINDID AUTHENTICATION FAILED");
    }
  }

  getRandomInt(key) {
    const random = Math.floor(Math.random() * (Math.pow(2, 31) - 1));

    switch (key) {
      case "nonce":
        window.localStorage.setItem("XM_BINDID_NONCE_KEY", random);
        break;
      case "state":
        window.localStorage.setItem("XM_BINDID_STATE_KEY", random);
        break;

      default:
        break;
    }

    return random;
  }
}
