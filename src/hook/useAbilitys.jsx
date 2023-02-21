import { useEffect, useState } from "react";
import axios from "axios";

export default function useAbilitys() {
  const [abilitys, setAbilitys ] = useState([]);

  const fetchAbilitys = async () => {
    try {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/ability`)
      .then((response) => {
        setAbilitys(response.data.abilitys);
      })
      .catch((error)=>{
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchAbilitys();
  }, [abilitys])

  return { abilitys }
}