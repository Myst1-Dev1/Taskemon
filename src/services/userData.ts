import { parseCookies } from "nookies";

const { "user-token": data }: any = parseCookies();
export const userDataId = data ? JSON.parse(data) : null;