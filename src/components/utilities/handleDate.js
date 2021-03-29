const handleDate = (date) => {
  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };
  return (
    (date &&
      `${months[date.slice(5, 7)]} ${date.slice(8, 10)}, ${date.slice(
        0,
        4
      )}`) ||
    null
  );
};

export default handleDate;
