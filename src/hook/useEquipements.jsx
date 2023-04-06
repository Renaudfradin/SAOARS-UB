import { useMemo, useState } from "react";
import axios from "axios";

export default function useEquipements() {
  const [equipements, setEquipements ] = useState([]);

  const fetchEquipements = async () => {
    try {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/equipment`)
      .then((response) => {
        setEquipements(response.data.equipments);
      })
      .catch((error)=>{
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(()=>{
    fetchEquipements();
  }, [])

  return { equipements }
}