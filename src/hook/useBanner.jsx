import { useEffect, useState } from "react";
import axios from "axios";

export default function useBanner(id) {
  const [banner, setBanner ] = useState([]);

  const fetchBanner = async () => {
    try {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/banner/${id}`)
      .then((response) => {
        setBanner(response.data.banner[0]);
      })
      .catch((error)=>{
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchBanner();
  }, [banner])

  return { banner }
}