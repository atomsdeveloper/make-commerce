"use client";

import { createContext, useContext, useState } from "react";
import { Method } from "@prisma/client";

interface MethodContextType {
  method: Method | null;
  setMethod: (method: Method) => void;
}

const MethodContext = createContext<MethodContextType | undefined>(undefined);

export const MethodProvider = ({ children }: { children: React.ReactNode }) => {
  const [method, setMethod] = useState<Method | null>(null);

  return (
    <MethodContext.Provider value={{ method, setMethod }}>
      {children}
    </MethodContext.Provider>
  );
};

export const useMethod = () => {
  const context = useContext(MethodContext);
  if (!context) {
    throw new Error("useMethod must be used within a MethodProvider");
  }
  return context;
};
