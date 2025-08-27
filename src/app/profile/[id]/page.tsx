import { getUserById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, User as UserIcon, Award, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage({ params }: { params: { id: string } }) {
  const user = getUserById(params.id);

  if (!user) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
            <div className="relative h-48 md:h-64 bg-muted">
                <Image 
                    src={`https://picsum.photos/seed/${user.id}-bg/1200/400`}
                    alt={`${user.name}'s cover photo`}
                    fill
                    data-ai-hint="abstract background"
                    className="object-cover"
                />
                 <div className="absolute top-1/2 left-8 -translate-y-8 md:translate-y-0 md:top-auto md:bottom-8">
                     <Image
                        src={user.profilePicture}
                        alt={user.name}
                        width={160}
                        height={160}
                        data-ai-hint="person portrait"
                        className="rounded-full object-cover border-4 border-background shadow-lg"
                    />
                 </div>
            </div>
            <CardContent className="pt-28 md:pt-12 px-8 pb-8">
                <h1 className="text-4xl font-bold font-headline">{user.name}</h1>
                <div className="flex items-center gap-2 text-lg text-muted-foreground mb-6">
                    <MapPin className="w-5 h-5" />
                    <span>{user.location}</span>
                </div>
                
                <Separator className="my-6" />

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold font-headline flex items-center gap-2 mb-3"><UserIcon/>About Me</h2>
                            <p className="text-base text-foreground/80 leading-relaxed">{user.about}</p>
                        </div>
                    </div>
                    <div>
                         <h2 className="text-2xl font-bold font-headline flex items-center gap-2 mb-4"><Award/>Skills</h2>
                        <div className="space-y-4">
                            {user.skills.map((skill) => (
                                <div key={skill.name}>
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-semibold">{skill.name}</h3>
                                        <Badge variant={skill.level === 'Expert' ? 'default' : 'secondary'}>{skill.level}</Badge>
                                    </div>
                                    <div className="flex">
                                        {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((level, i) => {
                                            const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
                                            const userSkillIndex = skillLevels.indexOf(skill.level);
                                            return (
                                                <Star key={level} className={`w-5 h-5 ${i <= userSkillIndex ? 'text-yellow-400 fill-current' : 'text-muted-foreground/50'}`} />
                                            )
                                        })}
                                    </div>
                                    {skill.description && <p className="text-sm text-muted-foreground mt-1">{skill.description}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
