import { useMemo, useState } from "react";
import axios from "axios";

export default function useEquipement(id) {
  const [equipement, setEquipement ] = useState([]);

  const fetchEquipement = async () => {
    try {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/equipment/${id}`)
      .then((response) => {
        setEquipement(response.data.equipment[0]);
      })
      .catch((error)=>{
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(()=>{
    fetchEquipement();
  }, [])

  return { equipement }
}