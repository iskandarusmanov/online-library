import { MD5 } from "crypto-js";

export const md5Generator = (method, url, body, userSecret) => {
  const signString = `${method}${url}${body}${userSecret}`;
  return MD5(signString).toString();
};
