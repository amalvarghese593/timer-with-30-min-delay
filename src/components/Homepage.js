import React, { useState } from "react";
import { Timer } from "./Timer";

export const Homepage = () => {
  const [showTimer, setShowTimer] = useState(false);
  return (
    <>
      <button onClick={() => setShowTimer((prev) => !prev)}>Schedule</button>
      {showTimer && <Timer />}
    </>
  );
};
