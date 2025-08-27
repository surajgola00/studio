'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { users as allUsers } from '@/lib/data';
import type { User } from '@/lib/types';
import ProfileCard from '@/components/profile-card';
import { useMatches } from '@/context/matches-provider';
import { Button } from '@/components/ui/button';
import { X, Heart, Undo } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = useMemo(() => {
    return allUsers
      .filter(user => category ? user.category === category : true)
      .filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.skills.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [category, searchQuery]);

  const [users, setUsers] = useState<User[]>([]);
  const { addMatch } = useMatches();
  const [lastSwiped, setLastSwiped] = useState<User | null>(null);

  useEffect(() => {
    setUsers(filteredUsers);
  }, [filteredUsers]);

  const handleSwipe = (direction: 'left' | 'right', user: User) => {
    if (direction === 'right') {
      addMatch(user);
    }
    setLastSwiped(user);
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  };
  
  const handleUndo = () => {
    if (lastSwiped) {
      setUsers(prev => [lastSwiped, ...prev]);
      setLastSwiped(null);
    }
  };
  
  const currentCard = users[users.length - 1];

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-sm mb-4">
        <Input 
          type="text"
          placeholder="Search by name or skill..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="relative w-full max-w-sm h-[550px] mb-6">
        {users.length > 0 ? (
          users.map((user, index) => (
            <ProfileCard
              key={user.id}
              user={user}
              onSwipe={(direction) => handleSwipe(direction, user)}
              isTop={index === users.length - 1}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-card rounded-xl shadow-lg border">
            <p className="text-xl text-muted-foreground">No more profiles to show.</p>
            <p className="text-sm text-muted-foreground">Try a different category or search.</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="w-16 h-16 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-600"
          onClick={() => currentCard && handleSwipe('left', currentCard)}
          disabled={!currentCard}
        >
          <X className="w-8 h-8" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full"
          onClick={handleUndo}
          disabled={!lastSwiped}
        >
          <Undo className="w-6 h-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-16 h-16 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500/10 hover:text-green-600"
          onClick={() => currentCard && handleSwipe('right', currentCard)}
          disabled={!currentCard}
        >
          <Heart className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
