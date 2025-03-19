import { useEffect, useRef, useState } from "react";

function useHeight() {
  const heightRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!heightRef.current) return;

    const observer = new ResizeObserver(() => {
      if (heightRef.current) {
        setHeight(heightRef.current.offsetHeight);
      }
    });

    observer.observe(heightRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { heightRef, height };
}

export default useHeight;
