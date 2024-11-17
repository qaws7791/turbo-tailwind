import { clientEnv } from "@/lib/env";
import ky from "ky";

const httpClient = ky.create({
  prefixUrl: clientEnv.NEXT_PUBLIC_URL + "/api",
});

export default httpClient;
