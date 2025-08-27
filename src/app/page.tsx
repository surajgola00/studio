import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, UserPlus, Search, Handshake } from 'lucide-react';
import SkillSuggestion from '@/components/skill-suggestion';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold font-headline mb-4 tracking-tight">
          Exchange Your Talent.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Welcome to Skill For Skill, the ultimate platform to connect, learn, and grow. Swap your expertise with a vibrant community, unlock new potentials, and collaborate on exciting projects.
        </p>
        <Button size="lg" asChild>
          <Link href="/browse">Start Exploring <ArrowRight className="ml-2 h-5 w-5" /></Link>
        </Button>
      </section>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <UserPlus className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Create Your Profile</h3>
            <p className="text-muted-foreground">Showcase your skills, add certifications, and upload glimpses of your work to attract the perfect match.</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="p-4 bg-primary/10 rounded-full mb-4">
              <Search className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Discover Skills</h3>
            <p className="text-muted-foreground">Browse through diverse categories, find talented individuals, and get AI-powered suggestions tailored to you.</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="p-4 bg-primary/10 rounded-full mb-4">
              <Handshake className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Connect & Swap</h3>
            <p className="text-muted-foreground">Match with others, start conversations, and begin your skill-swapping journey. It's that simple!</p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <SkillSuggestion />
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.slug} href={`/browse?category=${category.slug}`} passHref>
              <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-0 relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={600}
                    height={400}
                    data-ai-hint={`${category.slug.replace('-', ' ')}`}
                    className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold font-headline text-white flex items-center">
                      <category.icon className="w-6 h-6 mr-2 text-accent" />
                      {category.name}
                    </h3>
                  </div>
                  <Badge variant="secondary" className="absolute top-2 right-2 flex items-center gap-1">
                    Explore <ArrowRight className="w-3 h-3" />
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      
       <section className="text-center bg-card border rounded-lg p-8">
        <h2 className="text-3xl font-bold font-headline mb-4">Join Our Community Today!</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">Ready to take your skills to the next level? Sign up now and start your journey of learning, sharing, and collaborating.</p>
        <Button size="lg" asChild>
          <Link href="/profile/edit">Get Started for Free</Link>
        </Button>
      </section>
    </div>
  );
}
