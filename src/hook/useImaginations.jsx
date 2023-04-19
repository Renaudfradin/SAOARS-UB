import { useMemo, useState } from "react";
import axios from "axios";

export default function useImaginations() {
  const [imaginations, setImaginations ] = useState([]);

  const fetchImaginations = async () => {
    try {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/imagination`)
      .then((response) => {
        setImaginations(response.data.imaginations);
      })
      .catch((error)=>{
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(()=>{
    fetchImaginations();
  }, [])

  return { imaginations }
}