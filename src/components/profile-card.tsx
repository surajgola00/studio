'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { User } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  user: User;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
}

const SWIPE_THRESHOLD = 100;

export default function ProfileCard({ user, onSwipe, isTop }: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});
  const [isSwiping, setIsSwiping] = useState(false);

  useEffect(() => {
    if (!isTop) return;

    const card = cardRef.current;
    if (!card) return;
    
    let startX = 0;
    
    const onPointerDown = (e: PointerEvent) => {
        e.preventDefault();
        startX = e.clientX;
        card.setPointerCapture(e.pointerId);
        setIsSwiping(true);
    };
    
    const onPointerMove = (e: PointerEvent) => {
        if (!card.hasPointerCapture(e.pointerId)) return;
        const currentX = e.clientX;
        const deltaX = currentX - startX;
        const rotation = deltaX / 20;

        setStyle({
            transform: `translateX(${deltaX}px) rotate(${rotation}deg)`,
        });
    };
    
    const onPointerUp = (e: PointerEvent) => {
        if (!card.hasPointerCapture(e.pointerId)) return;
        card.releasePointerCapture(e.pointerId);
        
        const currentX = e.clientX;
        const deltaX = currentX - startX;
        
        if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
            const direction = deltaX > 0 ? 'right' : 'left';
            const endX = direction === 'right' ? window.innerWidth : -window.innerWidth;
            const rotation = deltaX / 20;
            setStyle({
                transform: `translateX(${endX}px) rotate(${rotation * 4}deg)`,
                transition: 'transform 0.5s ease-out'
            });
            setTimeout(() => onSwipe(direction), 500);
        } else {
             setStyle({
                transform: 'translateX(0px) rotate(0deg)',
                transition: 'transform 0.3s ease-in-out'
            });
        }
        setIsSwiping(false);
    };

    card.addEventListener('pointerdown', onPointerDown);
    card.addEventListener('pointermove', onPointerMove);
    card.addEventListener('pointerup', onPointerUp);

    return () => {
        card.removeEventListener('pointerdown', onPointerDown);
        card.removeEventListener('pointermove', onPointerMove);
        card.removeEventListener('pointerup', onPointerUp);
    }

  }, [isTop, onSwipe]);

  useEffect(() => {
    // Reset transition when not swiping for rubber-band effect
    if (!isSwiping) {
        const timeout = setTimeout(() => {
            setStyle(prev => ({...prev, transition: ''}));
        }, 300);
        return () => clearTimeout(timeout);
    }
  }, [isSwiping]);


  return (
    <Card
      ref={cardRef}
      style={style}
      className={cn(
        "absolute w-full h-[550px] rounded-2xl overflow-hidden shadow-2xl bg-card border-2",
        "touch-none cursor-grab",
        isTop && "active:cursor-grabbing",
        !isTop && "scale-[0.95] -translate-y-4 opacity-50"
      )}
    >
      <CardContent className="relative p-0 h-full">
        <Image
          src={user.profilePicture}
          alt={user.name}
          fill
          data-ai-hint="person portrait"
          className="object-cover"
          priority={isTop}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-3xl font-bold font-headline">{user.name}</h2>
          <div className="flex items-center gap-2 text-base mb-3 text-gray-200">
            <MapPin className="w-4 h-4" />
            <span>{user.location}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.skills.slice(0, 3).map((skill) => (
              <Badge key={skill.name} variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
