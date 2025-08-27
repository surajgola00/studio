'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Icons } from './icons';
import { Button } from './ui/button';
import { Handshake, Home, MessageSquare, Pencil, Sparkles, User } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/browse', label: 'Browse', icon: Sparkles },
  { href: '/matches', label: 'Matches', icon: Handshake },
  { href: '/profile/edit', label: 'Edit Profile', icon: Pencil },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl font-headline">SkillSwap</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              asChild
              className={cn(
                'transition-colors',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              )}
            >
              <Link href={link.href} className="flex items-center gap-2">
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="md:hidden">
          {/* Mobile menu could be added here with a Sheet component */}
        </div>
      </div>
    </header>
  );
}
