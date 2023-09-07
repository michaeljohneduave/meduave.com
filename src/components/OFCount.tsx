import React from "react";
import { useEffect } from "react";

export default function OFCount() {
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    async function getCount() {
      const res = await fetch("/api/visit", {
        method: "POST",
      });

      const data = await res.json();
      setCount(data.count);
    }

    getCount();
  }, []);
  return <span className="text-4xl">{count}</span>;
}
