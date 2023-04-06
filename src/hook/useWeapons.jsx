import { useMemo, useState } from "react";
import axios from "axios";

export default function useWeapons() {
  const [weapons, setWeapons ] = useState([]);

  const fetchWeapons = async () => {
    try {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/weapon`)
      .then((response) => {
        setWeapons(response.data.weapons);
      })
      .catch((error)=>{
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(()=>{
    fetchWeapons();
  }, [])

  return { weapons }
}