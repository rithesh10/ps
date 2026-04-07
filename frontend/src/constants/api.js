export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const FLASK_URL = import.meta.env.VITE_FLASK_URL;

export const API_BASE_URL = `${BACKEND_URL}/api`;

export const API_ROUTES = {
  users: {
    login: `${API_BASE_URL}/users/student-login`,
    signup: `${API_BASE_URL}/users/student-signup`,
    profile: `${API_BASE_URL}/users/student-profile`,
    forgotPassword: `${API_BASE_URL}/users/forgot-password`,
    resetPassword: (id, token) =>
      `${API_BASE_URL}/users/reset-forgotten-password/${id}/${token}`,
    changePassword: `${API_BASE_URL}/users/student-passwordChange`,
    editProfile: `${API_BASE_URL}/users/student-edit-profile`,
  },
  teacher: {
    login: `${API_BASE_URL}/teacher/teacher-login`,
    students: `${API_BASE_URL}/teacher/student-data`,
    suggestion: `${API_BASE_URL}/teacher/student-suggestion`,
    suggestions: `${API_BASE_URL}/teacher/get-suggestion`,
  },
  result: {
    all: `${API_BASE_URL}/result/all-result`,
    student: `${API_BASE_URL}/result/student-result`,
  },
};

export const FLASK_ROUTES = {
  result: `${FLASK_URL}/result`,
};
