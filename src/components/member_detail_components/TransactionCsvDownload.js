// Libraries
import { CSVLink } from "react-csv";
// Utilities
import handleDate from "../utilities/handleDate";

const TransactionCsvDownload = ({ allUsers }) => {
  const createCsvData = () => {
    let rows = [];
    if (Array.isArray(allUsers)) {
      allUsers.forEach((user) => {
        user.transactions?.forEach((transaction) => {
          transaction.line_items?.forEach((lineItem) => {
            rows.push({
              name: `${user.square.given_name} ${user.square.family_name}`,
              date_purchased: handleDate(transaction.created_at),
              wine: lineItem.name,
              quantity: lineItem.quantity,
            });
          });
        });
      });
    } else {
      rows = [
        {
          name: "Retrieving Data",
          date_purchased: "Retrieving Data",
          wine: "Retrieving Data",
          quantity: "Retrieving Data",
        },
      ];
    }
    return rows;
  };
  const headers = [
    { label: "Name", key: "name" },
    { label: "Date Purchased", key: "date_purchased" },
    { label: "Wine", key: "wine" },
    { label: "Quantity", key: "quantity" },
  ];

  return (
    <CSVLink data={createCsvData()} headers={headers}>
      Download Transactions CSV
    </CSVLink>
  );
};

export default TransactionCsvDownload;
