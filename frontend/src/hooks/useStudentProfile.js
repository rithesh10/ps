import { useEffect, useState } from "react";

import { fetchStudentProfile } from "../services/student";

const defaultProfile = {
  name: "",
  section: "",
  email: "",
  password: "",
  rollno: "",
  phoneno: "",
};

const useStudentProfile = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const studentProfile = await fetchStudentProfile();
      setProfile(studentProfile);
      setError(null);
      return studentProfile;
    } catch (requestError) {
      setError(requestError.message || "Failed to fetch student profile");
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    refreshProfile: loadProfile,
  };
};

export default useStudentProfile;
