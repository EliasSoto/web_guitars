import { useEffect, useState } from "react";
import { getBaseGuitarByWood } from "../services/userNormalService";

export const useBaseGuitar = (woodType) => {
  const [guitar, setGuitar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBaseGuitar = async () => {
      if (woodType) {
        setLoading(true);
        const [data, err] = await getBaseGuitarByWood(woodType);
        if (err) {
          setError(err);
          setGuitar(null);
        } else {
          setGuitar(data);
          setError(null);
        }
        setLoading(false);
      }
    };

    fetchBaseGuitar();
  }, [woodType]);

  return { guitar, loading, error };
};
