# Web Login Example

Build app-less, passwordless login experiences with BindID for customers that want to access your web application. This sample web app uses ReactJS to initiate strong authentication flows with the BindID service to sign in your users.

**To try out a live demo of the sample application on our CodeSandbox, [click here](https://codesandbox.io/s/priceless-bird-mucru)**

## Prerequisites

Before you begin, you'll need to have an application configured in the [BindID Admin Portal](https://admin.bindid-sandbox.io/console/#/applications). From the application settings, obtain the client credentials and configure `http://localhost:3000/redirect` as a redirect URI for this client so that you can run the sample app on your local machine. For more, see [BindID Admin Portal: Get Started](https://developer.bindid.io/docs/guides/admin_portal/topics/getStarted/get_started_admin_portal).

## Instructions

To run the sample app, you will need 2 server applications: a ReactJS application to obtain authorization code and a Customer Server application to exchange the authorization code for a token.

1 - Configure your client credentials in the `customer-server/.env` file:
<br/><br/>
```bash
    BINDID_CLIENT_ID =              # Client ID obtained from the BindID Admin Portal
    BINDID_CLIENT_SECRET =          # Client secret obtained from the BindID Admin Portal
```

2 - Configure your client credentials in the `bindid-react-example/.env` file:
<br/><br/>
```bash
    REACT_APP_BINDID_CLIENT_ID =    # Client ID obtained from the BindID Admin Portal
```

3 - Navigate to the root folder and run the following command:
<br/><br/>
```bash
    npm run install && npm run start
```

To try out the sample ReactJS app, open this page: `http://localhost:3000`.

Note: To run the app on a custom environment, you'll also need to add the redirect URI to your client (via BindID Admin Portal) and update the corresponding environment variables for both applications.

## What is BindID?

The BindID service is an app-less, strong portable authenticator offered by Transmit Security. BindID uses FIDO-based biometrics for secure, frictionless, and consistent customer authentication. With one click to create new accounts or sign into existing ones, BindID eliminates passwords and the inconveniences of traditional credential-based logins.<br><br>
[Learn more about how you can boost your experiences with BindID.](https://www.transmitsecurity.com/developer)

## Author

Transmit Security, https://github.com/TransmitSecurity

## License

This project is licensed under the MIT license. See the LICENSE file for more info.
