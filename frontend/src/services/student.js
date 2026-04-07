import api, { getAuthConfig } from "../lib/api";

export const fetchStudentProfile = async () => {
  const config = getAuthConfig();

  if (!config) {
    throw new Error("Access token not found");
  }

  const response = await api.get("/users/student-profile", config);
  return response.data;
};

export const fetchAllResults = async () => {
  const response = await api.get("/result/all-result");
  return response.data;
};

export const fetchSuggestions = async () => {
  const response = await api.get("/teacher/get-suggestion");
  return response.data;
};

export const updateStudentProfile = async (payload) => {
  const response = await api.post("/users/student-edit-profile", payload, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};
