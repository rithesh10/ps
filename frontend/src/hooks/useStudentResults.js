import { useEffect, useMemo, useState } from "react";

import { fetchAllResults } from "../services/student";
import useStudentProfile from "./useStudentProfile";

const useStudentResults = () => {
  const { profile, loading: profileLoading, error: profileError } =
    useStudentProfile();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadResults = async () => {
      try {
        setLoading(true);
        const response = await fetchAllResults();

        if (isMounted) {
          setResults(response || []);
          setError(null);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || "Failed to fetch results");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadResults();

    return () => {
      isMounted = false;
    };
  }, []);

  const studentResult = useMemo(() => {
    if (!profile.id || !results.length) {
      return null;
    }

    return results.find((item) => item.user === profile.id) || null;
  }, [profile.id, results]);

  const options = studentResult?.options || [];

  return {
    profile,
    results,
    studentResult,
    options,
    loading: profileLoading || loading,
    error: profileError || error,
  };
};

export default useStudentResults;
