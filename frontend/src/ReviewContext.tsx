// Assuming TypeScript (.tsx file) or JavaScript with JSX (.jsx file)
import React, { createContext, useState, ReactNode, useContext } from "react";

export type ReviewContextType = {
  isSubmitted: boolean;
  updateList: () => void;
};

export const ReviewContext = createContext<ReviewContextType>({
  isSubmitted: false,
  updateList: () => {},
});

export const ReviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const updateList = () => setIsSubmitted(!isSubmitted);

  return (
    <ReviewContext.Provider value={{ isSubmitted, updateList }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => useContext(ReviewContext);

