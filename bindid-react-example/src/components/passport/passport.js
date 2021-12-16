import React from "react";
import PropTypes from "prop-types";

export default function Passport(props) {
  const { tokenData } = props;

  const tableData = [
    {
      tableRowKey: "tableUserId",
      tableRowLabel: "01. User ID",
      tableRowData: tokenData.sub,
    },
    {
      tableRowKey: "tableUserAlias",
      tableRowLabel: "02. User Alias",
      tableRowData: tokenData.bindid_alias || "Not set",
    },
    {
      tableRowKey: "tableUserEmail",
      tableRowLabel: "03. Email",
      tableRowData: tokenData.email || "Not set",
    },
    {
      tableRowKey: "tableUserRegistered",
      tableRowLabel: "04. User Registered On",
      tableRowData:
        tokenData.bindid_network_info?.user_registration_time ||
        "Not available in claims",
    },
    {
      tableRowKey: "tableUserFirstSeen",
      tableRowLabel: "05. User First Seen",
      tableRowData: Date(tokenData.bindid_info?.capp_first_login) || "Never",
    },
    {
      tableRowKey: "tableUserFirstConfirmed",
      tableRowLabel: "06. User First Confirmed",
      tableRowData:
        Date(tokenData.bindid_info?.capp_first_confirmed_login) || "Never",
    },
    {
      tableRowKey: "tableUserLastSeen",
      tableRowLabel: "07. User Last Seen",
      tableRowData: Date(tokenData.bindid_info?.capp_last_login) || "Never",
    },
    {
      tableRowKey: "tableUserLastSeenByNetwork",
      tableRowLabel: "08. User Last Seen by Network",
      tableRowData:
        Date(tokenData.bindid_network_info?.user_last_seen) || "Never",
    },
    {
      tableRowKey: "tableTotalProvidersConfirmed",
      tableRowLabel: "09. Total Providers that Confirmed User",
      tableRowData: tokenData.bindid_network_info?.confirmed_capp_count || "0",
    },
    {
      tableRowKey: "tableRegisteredDevice",
      tableRowLabel: "10. Authenticating Device Registered",
      tableRowData:
        Date(
          tokenData.bindid_info?.capp_last_login_from_authenticating_device
        ) || "Never",
    },
    {
      tableRowKey: "tableConfirmedDevice",
      tableRowLabel: "11. Authenticating Device Confirmed",
      tableRowData: tokenData.acr?.includes("ts.bindid.app_bound_cred")
        ? "Yes"
        : "No",
    },
    {
      tableRowKey: "tableAuthDeviceLastSeen",
      tableRowLabel: "12. Authenticating Device Last Seen",
      tableRowData:
        Date(
          tokenData.bindid_info?.capp_last_login_from_authenticating_device
        ) || "Never",
    },
    {
      tableRowKey: "tableAuthDeviceLastSeenByNetwork",
      tableRowLabel: "13. Authenticating Device Last Seen by Network",
      tableRowData:
        Date(tokenData.bindid_network_info?.authenticating_device_last_seen) ||
        "Never",
    },
    {
      tableRowKey: "tableTotalDevices",
      tableRowLabel: "14. Total Known Devices",
      tableRowData: tokenData.bindid_network_info?.device_count || 0,
    },
  ];

  const tableRowItems = tableData.map((row) => (
    <tr key={row.tableRowKey}>
      <th scope="row"></th>
      <td>{row.tableRowLabel}</td>
      <td>{row.tableRowData}</td>
    </tr>
  ));

  return tableRowItems;
}

Passport.propTypes = {
  tokenData: PropTypes.object,
};
