import moment from "moment";

export const formatDate = (postDate) => {
  var date = "";
  const now = new Date();
  const msBetweenDates = Math.abs(postDate - now.getTime());
  const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

  if (hoursBetweenDates < 48) {
    date = moment(postDate).calendar().split("at")[0];
  } else {
    date = moment(postDate).format("MMM Do YYYY");
  }
  return date;
};
