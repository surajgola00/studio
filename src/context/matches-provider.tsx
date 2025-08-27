'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface MatchesContextType {
  matches: User[];
  addMatch: (user: User) => void;
  removeMatch: (userId: string) => void;
  isMatch: (userId: string) => boolean;
}

const MatchesContext = createContext<MatchesContextType | undefined>(undefined);

export const MatchesProvider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatches] = useState<User[]>([]);
  const { toast } = useToast();

  const addMatch = useCallback((user: User) => {
    if (!matches.some(match => match.id === user.id)) {
      setMatches(prevMatches => [...prevMatches, user]);
      toast({
        title: "New Match!",
        description: `You've matched with ${user.name}.`,
      });
    }
  }, [matches, toast]);
  
  const removeMatch = useCallback((userId: string) => {
    setMatches(prevMatches => prevMatches.filter(match => match.id !== userId));
  }, []);
  
  const isMatch = useCallback((userId:string) => {
    return matches.some(match => match.id === userId);
  }, [matches]);

  return (
    <MatchesContext.Provider value={{ matches, addMatch, removeMatch, isMatch }}>
      {children}
    </MatchesContext.Provider>
  );
};

export const useMatches = () => {
  const context = useContext(MatchesContext);
  if (context === undefined) {
    throw new Error('useMatches must be used within a MatchesProvider');
  }
  return context;
};
