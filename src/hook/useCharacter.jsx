import { useEffect, useState } from "react";
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

  useEffect(()=>{
    fetchCharacter();
  },[character])

  return { character }
}