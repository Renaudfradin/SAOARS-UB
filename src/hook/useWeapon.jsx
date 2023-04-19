import { useMemo, useState } from "react";
import axios from "axios";

export default function useWeapon(id) {
  const [weapon, setWeapon ] = useState([]);

  const fetchWeapon = async () => {
    try {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/weapon/${id}`)
      .then((response) => {
        setWeapon(response.data.weapon);
      })
      .catch((error)=>{
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(()=>{
    fetchWeapon();
  }, [])

  return { weapon }
}