import { useMemo, useState } from "react";
import axios from "axios";

export default function useBanners() {
  const [banners, setBanners ] = useState([]);

  const fetchBanners = async () => {
    try {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/banner`)
      .then((response) => {
        setBanners(response.data.banners);
      })
      .catch((error)=>{
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(()=>{
    fetchBanners()
  }, [])

  return { banners }
}