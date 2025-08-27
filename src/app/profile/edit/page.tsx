'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2, Upload, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  location: z.string().min(2, 'Location is required.'),
  about: z.string().min(20, 'Tell us a bit more about yourself (at least 20 characters).').max(500),
  thumbnail: z.any().optional(),
  skills: z.array(z.object({
    name: z.string().min(1, 'Skill name is required.'),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
    glimpse: z.any().optional(),
  })).min(1, 'Please add at least one skill.'),
  certifications: z.array(z.object({
    name: z.string().min(2, 'Certification name is required.'),
    issuer: z.string().min(2, 'Issuer name is required.'),
    year: z.coerce.number().min(1980).max(new Date().getFullYear()),
  })).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileEditPage() {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      location: '',
      about: '',
      skills: [{ name: '', level: 'Intermediate' }],
      certifications: [],
    },
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control: form.control,
    name: 'skills',
  });

  const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({
    control: form.control,
    name: 'certifications',
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    toast({
      title: 'Profile Updated!',
      description: 'Your changes have been saved successfully.',
    });
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Edit Your Profile</CardTitle>
          <CardDescription>Keep your profile updated to attract the best skill swaps.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Alex Johnson" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., San Francisco, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Thumbnail</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                        <Upload className="h-5 w-5 text-muted-foreground"/>
                      </div>
                    </FormControl>
                    <FormDescription>Upload a thumbnail image for your profile card.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Me</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your passions, skills, and what you'd like to learn." rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div>
                <h3 className="text-xl font-headline font-semibold mb-4">Your Skills</h3>
                {skillFields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-md mb-4 space-y-4">
                     <div className="flex items-start gap-4">
                        <FormField
                        control={form.control}
                        name={`skills.${index}.name`}
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                            <FormLabel>Skill Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Python, Guitar, Baking" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name={`skills.${index}.level`}
                        render={({ field }) => (
                            <FormItem>
                             <FormLabel>Proficiency</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="Beginner">Beginner</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Advanced">Advanced</SelectItem>
                                <SelectItem value="Expert">Expert</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="button" variant="ghost" size="icon" className="mt-8" onClick={() => removeSkill(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                     <FormField
                        control={form.control}
                        name={`skills.${index}.glimpse`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Skill Glimpse (Photo/Video)</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-2">
                                    <Input type="file" accept="image/*,video/*" onChange={(e) => field.onChange(e.target.files)} />
                                    <Upload className="h-5 w-5 text-muted-foreground"/>
                                </div>
                            </FormControl>
                             <FormDescription>Showcase your skill with a photo or short video.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendSkill({ name: '', level: 'Intermediate' })}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
                </Button>
                 <FormMessage>
                  {form.formState.errors.skills && !form.formState.errors.skills.root && (
                     form.formState.errors.skills.message
                  )}
                 </FormMessage>
              </div>

               <Separator />
              
               <div>
                <h3 className="text-xl font-headline font-semibold mb-4 flex items-center gap-2"><Award />Certifications</h3>
                {certFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-md p-4 mb-4">
                        <FormField
                            control={form.control}
                            name={`certifications.${index}.name`}
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Certification Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Certified JavaScript Developer" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`certifications.${index}.year`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Year</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g., 2023" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`certifications.${index}.issuer`}
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Issuer</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Tech Certification Inc." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-end">
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeCert(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
                 <Button type="button" variant="outline" size="sm" onClick={() => appendCert({ name: '', issuer: '', year: new Date().getFullYear() })}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Certification
                </Button>
              </div>

              <Button type="submit" size="lg">Save Changes</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
