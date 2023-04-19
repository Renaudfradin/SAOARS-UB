import { useMemo, useState } from "react";
import axios from "axios";

export default function useCharacter(id) {
  const [character, setCharacter] = useState([]);

  const fetchCharacter = async () => {
    try {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/perso/${id}`)
      .then((response) => {
        setCharacter(response.data.character[0]);
      })
      .catch((error)=>{
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  }

  useMemo(()=>{
    fetchCharacter();
  },[])

  return { character }
}