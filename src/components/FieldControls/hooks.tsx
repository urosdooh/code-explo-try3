import { useReactFlow } from "@xyflow/react";
import { useState, useEffect } from "react";

export function useGetZoom() {
  const { getZoom } = useReactFlow();

  const [currentZoom, setCurrentZoom] = useState(getZoom());
  // Обновляем zoom при изменении viewport
  useEffect(() => {
    const updateZoom = () => {
      setCurrentZoom(getZoom());
    };

    // Обновляем zoom через небольшой интервал или можно использовать события
    const interval = setInterval(updateZoom, 100);

    return () => clearInterval(interval);
  }, [getZoom]);

  return currentZoom;
}
