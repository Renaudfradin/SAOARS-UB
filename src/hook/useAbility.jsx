import { useMemo, useState } from "react";
import axios from "axios";

export default function useAbility(id) {
  const [ability, setAbility ] = useState([]);

  const fetchAbility = async () => {
    try {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/ability/${id}`)
      .then((response) => {
        setAbility(response.data.Ability[0]);
      })
      .catch((error)=>{
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(()=>{
    fetchAbility();
  }, [])

  return { ability }
}