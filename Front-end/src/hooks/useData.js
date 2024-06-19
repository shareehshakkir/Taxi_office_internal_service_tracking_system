import { useMutation, useQuery } from "react-query";
import { useAuth } from "../context/AuthContext";

/* const fetchData = (path) => {
  return fetch(`http://localhost:3000/${path}`).then((res) => res.json());
};

export const useData = (key, path, options = {}) => {
  return useQuery(key, () => fetchData(path), {
    ...options,
  });
}; */
const accessKey = JSON.parse(localStorage.getItem("authTokens"));
console.log(accessKey);
const apiUrl = import.meta.env.VITE_API_URL;

const fetchData = (path) => {
  const accessKey = JSON.parse(localStorage.getItem("authTokens"));
  let headersList = {
    Authorization: `Bearer ${accessKey?.access}`,
  };
  return fetch(`${apiUrl}/${path}`, {
    method: "GET",
    headers: headersList,
  }).then((res) => res.json());
};

export const useData = (key, path, options = {}) => {
  return useQuery(key, () => fetchData(path), {
    ...options,
  });
};

const postReq = async ({ endpoint, data }) => {
  const res = await fetch(`${apiUrl}/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(data),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const response = await res.json();
  if (res.statusText == "Bad Request") {
    let err = "Error Occured.";
    const error = { err, issues: response };
    return error;
  } else {
    return response;
  }
};

const postReqWithAccess = async ({ endpoint, data, accessToken }) => {
  let headersList = {
    Authorization: `Bearer ${accessToken}`,
    "Content-type": "application/json; charset=UTF-8",
  };
  const res = await fetch(`${apiUrl}/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: headersList,
  });
  const response = await res.json();
  if (res.statusText == "Bad Request") {
    let err = "Error Occured.";
    const error = { err, issues: response };
    return error;
  } else {
    return response;
  }
};
const patchReq = async ({ id, data, endpoint }) => {
  const accessKey = JSON.parse(localStorage.getItem("authTokens"));

  let headersList = {
    Authorization: `Bearer ${accessKey?.access}`,
    "Content-type": "application/json; charset=UTF-8",
  };
  const res = await fetch(`${apiUrl}/${endpoint}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: headersList,
  });
  const result = await res.json();
  if (res.statusText == "Bad Request") {
    const error = { err: result };
    return error;
  } else {
    return result;
  }
};

const deleteUser = ({ id }) => {
  return fetch(`${apiUrl}/api/admin/drivers/${id}/delete-or-disable/`, {
    method: "DELETE",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
};

export const useAcceptRide = () => {
  return useMutation(patchReq);
};

export const useDelete = () => {
  return useMutation(deleteUser);
};

export const useUpdateStatus = () => {
  return useMutation(patchReq);
};

export const useNewDriver = () => {
  return useMutation(postReq);
};

export const useNewDriverAccount = () => {
  return useMutation(postReqWithAccess, {
    onError: (error) => {
      return error;
    },
  });
};
