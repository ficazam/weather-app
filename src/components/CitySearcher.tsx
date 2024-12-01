import React, { useState } from "react";
import { TextInput, Button } from "../components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCityWeatherStore } from "../store/cities.store";

export const CitySearcher = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const nav = useNavigate();

  const { cityFetch, cityWeatherFetch } = useCityWeatherStore()

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(e.target.value);

    if (value.length === 4) {
      cityFetch(value)
    }
  };

  const handleSubmit = async () => {
    if (inputValue.trim() === "") {
      setError("This field cannot be empty");
    } else {
      setError("");
      setLoading(true);
      console.log("Form submitted with:", inputValue);
      const city = await cityWeatherFetch(inputValue)
      nav(`details/${city}`)
    }
  };

  return (
    <motion.div
      className="w-full max-w-md text-center justify-center items-center"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        opacity: { ease: "easeOut", duration: 0.5 },
      }}
    >
      <TextInput
        value={inputValue}
        onChange={handleChange}
        error={error}
        placeholder="Enter a city and country name: Panama City, Panama"
      />
      <Button
        onClick={handleSubmit}
        disabled={inputValue.length === 0 || loading}
        label="Search Weather"
        type="submit"
      />
    </motion.div>
  );
};
