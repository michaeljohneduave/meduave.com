import React from "react";
import { useEffect } from "react";

export default function OFCount({ initCount }: { initCount: number }) {
  const [count, setCount] = React.useState(initCount);
  useEffect(() => {
    async function getCount() {
      try {
        const res = await fetch("/api/visit", {
          method: "POST",
        });

        const data = await res.json();
        setCount(data.count);
      } catch (error) {
        console.error(error);
      }
    }

    getCount();
  }, []);
  return <span className="text-4xl">{count}</span>;
}
