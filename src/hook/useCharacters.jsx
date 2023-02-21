import { useEffect, useState } from "react";
import axios from "axios";

export default function useCharacters() {
  const [characters, setCharacter] = useState([]);

  const fetchCharacters = async () => {
    try {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/perso`)
      .then((response) => {
        setCharacter(response.data.characters);
      })
      .catch((error)=>{
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchCharacters();
  },[characters])

  return { characters }
}