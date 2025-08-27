'use client';

import { useState } from 'react';
import { suggestSkills, SuggestSkillsOutput } from '@/ai/flows/suggest-skills';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles, Loader2, Lightbulb, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SkillSuggestion() {
  const [suggestions, setSuggestions] = useState<SuggestSkillsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestSkills = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);

    const mockProfile = {
      userProfile: "Software developer with 5 years of experience in JavaScript and Python. Interested in learning new programming languages and frameworks. Also enjoys hiking and photography.",
      pastInteractions: "Liked profiles related to 'Web Development', 'Data Science', and 'Outdoor Adventures'. Searched for 'Go', 'Rust', and 'landscape photography'."
    };

    try {
      const result = await suggestSkills(mockProfile);
      setSuggestions(result);
    } catch (e) {
      setError('Failed to get suggestions. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card/50 border-2 border-dashed border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
                <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <div>
                <CardTitle className="font-headline text-2xl">Discover Your Next Skill</CardTitle>
                <CardDescription>Let our AI suggest skills and categories tailored for you.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center text-center">
            {!suggestions && (
              <Button onClick={handleSuggestSkills} disabled={isLoading} className="mb-6">
              {isLoading ? (
                  <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                  </>
              ) : (
                  <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get AI Suggestions
                  </>
              )}
              </Button>
            )}

            {error && <p className="text-destructive">{error}</p>}
            
            {suggestions && (
            <div className="w-full text-left grid md:grid-cols-2 gap-6 animate-in fade-in-50 duration-500">
                <div>
                    <h4 className="font-semibold text-lg mb-3">Suggested Skills</h4>
                    <div className="space-y-3">
                        {suggestions.suggestedSkills.map(skill => (
                            <Link key={skill.slug} href={`/browse?search=${skill.slug}`} className="block p-3 rounded-md border hover:bg-muted/50 transition-colors">
                                <h5 className="font-semibold flex items-center">{skill.name} <ArrowRight className="w-4 h-4 ml-2 text-muted-foreground"/></h5>
                                <p className="text-sm text-muted-foreground">{skill.reason}</p>
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-lg mb-3">Suggested Categories</h4>
                     <div className="space-y-3">
                        {suggestions.suggestedCategories.map(cat => (
                            <Link key={cat.slug} href={`/browse?category=${cat.slug}`} className="block p-3 rounded-md border hover:bg-muted/50 transition-colors">
                                <h5 className="font-semibold flex items-center">{cat.name} <ArrowRight className="w-4 h-4 ml-2 text-muted-foreground"/></h5>
                                <p className="text-sm text-muted-foreground">{cat.reason}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
