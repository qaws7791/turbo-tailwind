import { http, HttpResponse } from "msw";

const API_URL = "http://localhost:4000";

export const handlers = [
  http.post(`${API_URL}/login`, () => {
    return HttpResponse.json({
      token: "mocked_token",
    });
  }),
];
