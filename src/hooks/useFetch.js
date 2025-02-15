import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetch = (url) => {
  const fetchData = async () => {
    const response = await axios.get(url);
    return response.data;
  };

  const { data, error, isFetching, isLoading } = useQuery({
    queryKey: [url],
    queryFn: fetchData,
  });

  return { data, isFetching, loading: isLoading, error };
};

export default useFetch;
