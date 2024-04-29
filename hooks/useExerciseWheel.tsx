import exerciseTypes from "@/constants/exerciseTypes";
import { useEffect, useState } from "react";

export default function useExerciseWheel(types: typeof exerciseTypes) {
  const [selectedTypeIndex, setSelectedTypeIndex] = useState<null | number>(
    null
  );
  const [currentDisplayedSelectedIndex, setCurrentDisplayedSelectedIndex] =
    useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDisplayedSelectedIndex((prev) => {
        let newDisplayIndex = -1;
        while (newDisplayIndex === -1 || newDisplayIndex === prev) {
          newDisplayIndex = Math.floor(Math.random() * types.length);
        }
        return newDisplayIndex;
      });
    }, 500);
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setSelectedTypeIndex(Math.floor(Math.random() * types.length));
    }, 5000);
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return {
    currentDisplayedSelectedIndex,
    selectedTypeIndex,
  };
}
