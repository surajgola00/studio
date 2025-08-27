import type { Category, User } from '@/lib/types';
import { Palette, Dumbbell, HeartPulse, Mic, Code, Camera, Brush, Utensils } from 'lucide-react';

export const categories: Category[] = [
  { name: 'Art & Design', slug: 'art-design', icon: Palette, image: 'https://picsum.photos/600/400?random=1' },
  { name: 'Fitness & Health', slug: 'fitness-health', icon: Dumbbell, image: 'https://picsum.photos/600/400?random=2' },
  { name: 'Beauty & Skincare', slug: 'beauty-skincare', icon: HeartPulse, image: 'https://picsum.photos/600/400?random=3' },
  { name: 'Music & Audio', slug: 'music-audio', icon: Mic, image: 'https://picsum.photos/600/400?random=4' },
  { name: 'Programming', slug: 'programming', icon: Code, image: 'https://picsum.photos/600/400?random=5' },
  { name: 'Photography', slug: 'photography', icon: Camera, image: 'https://picsum.photos/600/400?random=6' },
  { name: 'Fashion', slug: 'fashion', icon: Brush, image: 'https://picsum.photos/600/400?random=7' },
  { name: 'Cooking', slug: 'cooking', icon: Utensils, image: 'https://picsum.photos/600/400?random=8' },
];

export const users: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    location: 'San Francisco, CA',
    about: "Full-stack developer with a passion for creating beautiful and functional web applications. I love teaching React and exchanging ideas about modern web development. In my free time, I'm an amateur photographer.",
    profilePicture: 'https://picsum.photos/seed/alex/800/800',
    thumbnail: 'https://picsum.photos/seed/alex-thumb/400/300',
    category: 'programming',
    skills: [
      { name: 'React', level: 'Expert', description: 'Building complex frontend applications.' },
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Photography', level: 'Intermediate' },
    ],
    certifications: [
      { name: 'Certified JavaScript Developer', issuer: 'Tech Certification Inc.', year: 2022 }
    ]
  },
  {
    id: '2',
    name: 'Maria Garcia',
    location: 'Miami, FL',
    about: "Certified Yoga instructor and wellness coach. My goal is to help people find balance and peace through movement and mindfulness. Let's connect and share our fitness journeys!",
    profilePicture: 'https://picsum.photos/seed/maria/800/800',
    thumbnail: 'https://picsum.photos/seed/maria-thumb/400/300',
    category: 'fitness-health',
    skills: [
      { name: 'Yoga', level: 'Expert', glimpse: { type: 'video', url: '#' } },
      { name: 'Meditation', level: 'Advanced' },
      { name: 'Nutrition', level: 'Intermediate' },
    ],
    certifications: [
      { name: 'RYT 500 Yoga Teacher', issuer: 'Yoga Alliance', year: 2020 }
    ],
  },
  {
    id: '3',
    name: 'James Smith',
    location: 'New York, NY',
    about: 'Professional chef with over 10 years of experience in French and Italian cuisine. I believe cooking is an art form and a way to bring people together. I can teach anything from basic knife skills to advanced pastry techniques.',
    profilePicture: 'https://picsum.photos/seed/james/800/800',
    thumbnail: 'https://picsum.photos/seed/james-thumb/400/300',
    category: 'cooking',
    skills: [
      { name: 'Italian Cuisine', level: 'Expert' },
      { name: 'Pastry', level: 'Advanced' },
      { name: 'Knife Skills', level: 'Expert' },
    ],
    certifications: [],
  },
  {
    id: '4',
    name: 'Chloe Kim',
    location: 'Los Angeles, CA',
    about: 'Fashion designer and stylist. I specialize in sustainable fashion and upcycling. Let me show you how to build a stylish and ethical wardrobe!',
    profilePicture: 'https://picsum.photos/seed/chloe/800/800',
    thumbnail: 'https://picsum.photos/seed/chloe-thumb/400/300',
    category: 'fashion',
    skills: [
      { name: 'Styling', level: 'Expert' },
      { name: 'Sewing', level: 'Advanced', glimpse: { type: 'photo', url: 'https://picsum.photos/400/300' } },
      { name: 'Fashion Illustration', level: 'Intermediate' },
    ],
    certifications: [],
  },
  {
    id: '5',
    name: 'Leo Chen',
    location: 'Austin, TX',
    about: 'Guitarist and music producer. I have been playing for 15 years and can teach various genres, from blues to rock. I can also help you get started with music production in Ableton Live.',
    profilePicture: 'https://picsum.photos/seed/leo/800/800',
    thumbnail: 'https://picsum.photos/seed/leo-thumb/400/300',
    category: 'music-audio',
    skills: [
      { name: 'Guitar', level: 'Expert' },
      { name: 'Music Production', level: 'Advanced' },
      { name: 'Songwriting', level: 'Intermediate' },
    ],
    certifications: [],
  },
  {
    id: '6',
    name: 'Sofia Rossi',
    location: 'Chicago, IL',
    about: 'Makeup artist and skincare enthusiast. I love helping people feel confident in their own skin. I can teach you everything from a natural everyday look to glamorous evening makeup.',
    profilePicture: 'https://picsum.photos/seed/sofia/800/800',
    thumbnail: 'https://picsum.photos/seed/sofia-thumb/400/300',
    category: 'beauty-skincare',
    skills: [
      { name: 'Makeup Artistry', level: 'Expert' },
      { name: 'Skincare Analysis', level: 'Advanced' },
    ],
    certifications: [
      { name: 'Certified Makeup Artist', issuer: 'Glamour Academy', year: 2019 }
    ],
  },
  {
    id: '7',
    name: 'David Lee',
    location: 'Seattle, WA',
    about: "I'm a digital illustrator and graphic designer. I specialize in character design and branding. I'm proficient with Procreate and the Adobe Creative Suite. Happy to share my techniques!",
    profilePicture: 'https://picsum.photos/seed/david/800/800',
    thumbnail: 'https://picsum.photos/seed/david-thumb/400/300',
    category: 'art-design',
    skills: [
      { name: 'Digital Illustration', level: 'Expert' },
      { name: 'Branding', level: 'Advanced' },
      { name: 'Procreate', level: 'Expert' },
    ],
    certifications: [],
  },
  {
    id: '8',
    name: 'Isabella Pereira',
    location: 'Denver, CO',
    about: 'Landscape photographer and hiker. I travel to capture the beauty of nature. I can teach you camera settings, composition, and post-processing in Lightroom.',
    profilePicture: 'https://picsum.photos/seed/isabella/800/800',
    thumbnail: 'https://picsum.photos/seed/isabella-thumb/400/300',
    category: 'photography',
    skills: [
      { name: 'Landscape Photography', level: 'Expert' },
      { name: 'Lightroom', level: 'Advanced' },
      { name: 'Composition', level: 'Advanced' },
    ],
    certifications: [],
  },
   {
    id: '9',
    name: 'Ben Carter',
    location: 'Boston, MA',
    about: "Python and Machine Learning enthusiast. I enjoy building predictive models and exploring data. I can help you learn the fundamentals of data science and Python programming.",
    profilePicture: 'https://picsum.photos/seed/ben/800/800',
    thumbnail: 'https://picsum.photos/seed/ben-thumb/400/300',
    category: 'programming',
    skills: [
      { name: 'Python', level: 'Expert' },
      { name: 'Machine Learning', level: 'Advanced' },
      { name: 'Data Analysis', level: 'Intermediate' },
    ],
    certifications: [],
  },
  {
    id: '10',
    name: 'Olivia Martinez',
    location: 'San Diego, CA',
    about: "Certified personal trainer and nutritionist. Passionate about helping others achieve their fitness goals through customized workout plans and healthy eating habits.",
    profilePicture: 'https://picsum.photos/seed/olivia/800/800',
    thumbnail: 'https://picsum.photos/seed/olivia-thumb/400/300',
    category: 'fitness-health',
    skills: [
      { name: 'Personal Training', level: 'Expert' },
      { name: 'Strength Training', level: 'Advanced' },
      { name: 'Meal Planning', level: 'Advanced' },
    ],
    certifications: [],
  }
];

export const getUserById = (id: string) => users.find(user => user.id === id);
