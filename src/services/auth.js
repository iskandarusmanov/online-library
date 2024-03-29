import { request } from "./axios";
import { md5Generator } from "../utils/md5Generator";

export const registerUser = async (data) => {
  return await request({ url: "signup", method: "POST", data });
};

export const login = async (key, sign) => {
  return await request({
    url: "myself",
    method: "GET",
    headers: {
      Key: key,
      Sign: md5Generator("GET", "/myself", "", sign),
    },
  });
};
