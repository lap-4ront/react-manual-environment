import React, { useState } from "react";

export default function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button onClick={() => setCounter((prev) => prev + 1)}>{counter}</button>
    </div>
  );
}
