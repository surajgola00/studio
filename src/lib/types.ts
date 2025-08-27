export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description?: string;
  glimpse?: {
    type: 'photo' | 'video';
    url: string;
  };
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
}

export interface User {
  id: string;
  name: string;
  location: string;
  about: string;
  profilePicture: string;
  thumbnail: string;
  skills: Skill[];
  certifications: Certification[];
  category: string;
}

export interface Category {
  name:string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}
