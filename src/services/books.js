import { md5Generator } from "../utils/md5Generator";
import { request } from "./axios";

export const searchBooks = async (title, key, secret) => {
  const url = `/books/:${title.trim()}`;
  console.log("store ");

  return await request({
    url: url,
    method: "GET",
    headers: {
      Key: key || userKey,
      Sign: md5Generator("GET", url, "", secret || userSecret),
    },
  });
};

export const addBook = async (isbn, userKey, userSecret) => {
  const url = "/books";
  return await request({
    url: url,
    method: "POST",
    headers: {
      Key: userKey,
      Sign: md5Generator("POST", url, `{"isbn":"${isbn}"}`, userSecret),
    },
    data: { isbn: isbn },
  });
};

export const getBooks = async (userKey, userSecret) => {
  const url = "/books";

  return await request({
    url: url,
    method: "GET",
    headers: {
      Key: userKey,
      Sign: md5Generator("GET", url, "", userSecret),
    },
  });
};

export const changeStatus = async (id, status, userKey, userSecret) => {
  const url = `/books/${id}`;
  // const { userKey, userSecret } = parseCookies();

  return await request({
    url: url,
    method: "PATCH",
    headers: {
      Key: userKey,
      Sign: md5Generator("PATCH", url, `{"status":${status}}`, userSecret),
    },
    data: { status: status },
  });
};

export const deleteBook = async (id, userKey, userSecret) => {
  const url = `/books/${id}`;
  // const { userKey, userSecret } = parseCookies();

  return await request({
    url: url,
    method: "DELETE",
    headers: {
      Key: userKey,
      Sign: md5Generator("DELETE", url, "", userSecret),
    },
  });
};
