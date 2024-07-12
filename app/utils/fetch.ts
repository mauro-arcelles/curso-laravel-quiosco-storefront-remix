export enum FetchMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const getFetchConfig = (
  method: FetchMethods,
  token?: string,
  data?: any
): RequestInit => {
  return {
    method: method,
    credentials: "include",
    mode: "cors",
    headers: {
      ...(data && { "Content-Type": "application/json" }),
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(data && { body: JSON.stringify(data) }),
  };
};
