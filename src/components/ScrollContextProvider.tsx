import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type ScrollContextProps = {
  scrollPosition: number;
  setScrollPosition: (pos: number) => void;
};

type Props = {
  children?: ReactNode;
};

const ScrollContext = createContext<ScrollContextProps | undefined>(undefined);

const ScrollContextProvider = ({ children }: Props) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollContext = {
    scrollPosition,
    setScrollPosition,
  };

  return useMemo(() => {
    return <ScrollContext.Provider children={children} value={scrollContext} />;
  }, [scrollPosition, setScrollPosition]);
};

export const useScrollPosition = (): ScrollContextProps => {
  const context = useContext(ScrollContext);

  if (!context) {
    throw new Error(
      'Trying to access scroll position outside of ScrollContextProvider',
    );
  }

  return context;
};

export default ScrollContextProvider;
