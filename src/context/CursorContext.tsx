import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type CursorType = 'default' | 'view' | 'forge' | 'drag' | 'explore' | 'hidden';

interface CursorContextType {
  cursorType: CursorType;
  customText?: string;
  setCursor: (type: CursorType, text?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorType: 'default',
  setCursor: () => {},
  resetCursor: () => {},
});

export const CursorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [customText, setCustomText] = useState<string | undefined>(undefined);

  const setCursor = (type: CursorType, text?: string) => {
    setCursorType(type);
    setCustomText(text);
  };

  const resetCursor = () => {
    setCursorType('default');
    setCustomText(undefined);
  };

  return (
    <CursorContext.Provider value={{ cursorType, customText, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
