// Libraries
import { CSVLink } from "react-csv";
// Utilities
import handleDate from "../utilities/handleDate";

const CsvDownload = ({ allUsers }) => {
  const adjustTotal = (adjustments) => {
    return adjustments.reduce((total, adjustment) => {
      return total + parseInt(adjustment.adjustment);
    }, 0);
  };

  const calculateCommitStatus = (user) => {
    let bottlesPurchased = 0;
    user.transactions?.forEach((transaction) => {
      transaction.line_items?.forEach((line_item) => {
        bottlesPurchased += parseInt(line_item.quantity);
      });
    });
    return (
      bottlesPurchased -
      user.db.commit_count +
      adjustTotal(user.db.commit_adjustments)
    );
  };

  const createCsvData = () => {
    let rows;
    if (Array.isArray(allUsers)) {
      rows = allUsers.map((user) => {
        return {
          name: `${user.square.given_name} ${user.square.family_name}`,
          email: user.square.email,
          membership: user.square.membership_level,
          commit_status: calculateCommitStatus(user),
          start_date: `${handleDate(user.square.created_at)}`,
        };
      });
    } else {
      rows = [
        {
          name: "Retrieving Data",
          email: "Retrieving Data",
          membership: "Retrieving Data",
          commit_status: "Retrieving Data",
          start_date: "Retrieving Data",
        },
      ];
    }
    return rows;
  };
  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Membership", key: "membership" },
    { label: "Commitment Status", key: "commit_status" },
    { label: "Start Date", key: "start_date" },
  ];

  return (
    <CSVLink data={createCsvData()} headers={headers}>
      Download Table CSV
    </CSVLink>
  );
};

export default CsvDownload;
