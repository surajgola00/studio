import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import SkillSuggestion from '@/components/skill-suggestion';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
          Unlock Your Potential
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover and exchange skills with a vibrant community. Whether you're a beginner or an expert, there's always something new to learn and share.
        </p>
      </section>

      <section className="mb-12">
        <SkillSuggestion />
      </section>

      <section>
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
    </div>
  );
}
