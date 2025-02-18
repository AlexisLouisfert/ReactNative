import React, { createContext, useContext, useState } from "react";

const CounterContext = createContext({count: 0, increment: () => {}, decrement: () => {}, reset: () => {},});

export default function CounterProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const increment = () => {setCount(count + 1);};
  const decrement = () => {setCount(count - 1);};
  const reset = () => {setCount(0);};
  return  <CounterContext.Provider value={{ count, increment, decrement, reset }}>{children}</CounterContext.Provider>;
}

export const useCounter = () => useContext(CounterContext);
