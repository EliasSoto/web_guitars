import { useEffect, useState } from "react";
import { getBaseGuitarByWoodAndColor } from "../services/userNormalService";

export const useBaseGuitar = (woodType, color) => {
  const [guitar, setGuitar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBaseGuitar = async () => {
      if (woodType && color) {
        setLoading(true);
        const [data, err] = await getBaseGuitarByWoodAndColor(woodType, color);
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
  }, [woodType, color]);

  return { guitar, loading, error };
};
