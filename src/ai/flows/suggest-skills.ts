// This file holds the Genkit flow for suggesting relevant skills and categories based on user profile and interactions.

'use server';

/**
 * @fileOverview A skill suggestion AI agent.
 *
 * - suggestSkills - A function that handles the skill suggestion process.
 * - SuggestSkillsInput - The input type for the suggestSkills function.
 * - SuggestSkillsOutput - The return type for the suggestSkills function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSkillsInputSchema = z.object({
  userProfile: z
    .string()
    .describe('The user profile, including skills, experience, and interests.'),
  pastInteractions: z
    .string()
    .describe('A summary of the user past interactions with the app, including liked profiles and search queries.'),
});
export type SuggestSkillsInput = z.infer<typeof SuggestSkillsInputSchema>;

const SuggestSkillsOutputSchema = z.object({
  suggestedSkills: z
    .array(z.string())
    .describe('An array of suggested skills based on the user profile and past interactions.'),
  suggestedCategories: z
    .array(z.string())
    .describe('An array of suggested categories based on the user profile and past interactions.'),
});
export type SuggestSkillsOutput = z.infer<typeof SuggestSkillsOutputSchema>;

export async function suggestSkills(input: SuggestSkillsInput): Promise<SuggestSkillsOutput> {
  return suggestSkillsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSkillsPrompt',
  input: {schema: SuggestSkillsInputSchema},
  output: {schema: SuggestSkillsOutputSchema},
  prompt: `You are an AI assistant that suggests relevant skills and categories to users based on their profile and past interactions.

  User Profile: {{{userProfile}}}
  Past Interactions: {{{pastInteractions}}}

  Based on the above information, suggest relevant skills and categories that the user might be interested in.
  Return the suggested skills and categories in the format specified in the output schema.
  Do not suggest skills or categories that are already present in the user profile.
  Limit the number of suggested skills and categories to 5 each.
  `,
});

const suggestSkillsFlow = ai.defineFlow(
  {
    name: 'suggestSkillsFlow',
    inputSchema: SuggestSkillsInputSchema,
    outputSchema: SuggestSkillsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
