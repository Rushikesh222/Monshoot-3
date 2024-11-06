import axios from "axios";

const Value = axios.create({
  baseURL: "https://flipkart-email-mock.now.sh/",
  headers: {
    ContentType: "application/json",
    timeout: 1000,
  },
});
