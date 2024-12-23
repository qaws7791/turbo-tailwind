import ky from "ky";

const httpClient = ky.create({
  prefixUrl: "http://localhost:4000/api",
});

export default httpClient;
