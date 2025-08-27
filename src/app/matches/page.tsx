'use client';

import { useMatches } from '@/context/matches-provider';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HeartCrack, MessageSquare } from 'lucide-react';

export default function MatchesPage() {
  const { matches, removeMatch } = useMatches();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-headline mb-8 text-center">Your Matches</h1>
      {matches.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">You have no matches yet.</p>
          <p className="text-muted-foreground">Go to the browse page to find new connections!</p>
          <Button asChild className="mt-4">
            <Link href="/browse">Start Swiping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {matches.map((user) => (
            <Card key={user.id} className="overflow-hidden group">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Link href={`/profile/${user.id}`} className="w-full">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={user.profilePicture}
                      alt={user.name}
                      width={128}
                      height={128}
                      data-ai-hint="person portrait"
                      className="rounded-full object-cover border-4 border-transparent group-hover:border-accent transition-all duration-300"
                    />
                  </div>
                  <h2 className="text-xl font-bold font-headline">{user.name}</h2>
                </Link>
                <p className="text-muted-foreground mb-3">{user.location}</p>
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                    {user.skills.slice(0, 2).map(skill => (
                        <Badge key={skill.name} variant="secondary">{skill.name}</Badge>
                    ))}
                </div>
                <div className="flex gap-2 w-full mt-auto">
                    <Button asChild size="sm" className="flex-1">
                        <Link href={`/profile/${user.id}`}><MessageSquare className="w-4 h-4 mr-2" />Message</Link>
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => removeMatch(user.id)}>
                        <HeartCrack className="w-4 h-4" />
                    </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
