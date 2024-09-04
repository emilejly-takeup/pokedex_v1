import React, { useEffect, useState } from "react";
import { fetchData } from "./api";
import { PokemonCard } from "./PokemonCard";
import { NavigationButton } from "./NavigationButton";

export default function App() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="text-center mt-10 mx-auto max-w-fit">
      {data.length > 0 ? (
        <>
          <div className="flex items-center gap-8">
            <NavigationButton text="←" onClick={handlePrev} />
            <PokemonCard pokemon={data[currentIndex]} />
            <NavigationButton text="→" onClick={handleNext} />
          </div>
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
