export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description?: string;
}

export interface User {
  id: string;
  name: string;
  location: string;
  about: string;
  profilePicture: string;
  skills: Skill[];
  category: string;
}

export interface Category {
  name:string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}
