import React, { createContext, useContext, useState } from "react";


const CounterContext = createContext({count: 0, setCount:(count: number) => {}});

export function CountProvider({ children }: { children: React.ReactNode }) {
    const [count, setCount] = useState(0);
    return <CounterContext.Provider value={{count: 0, setCount:(count: number) => {}}}>{children}</CounterContext.Provider>;
}

export const useCounter = () => useContext(CounterContext);
