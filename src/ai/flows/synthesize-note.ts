
'use server';
/**
 * @fileOverview A Genkit flow for synthesizing tactical notes into summaries and action items.
 *
 * - synthesizeNote - Handles the AI synthesis process.
 * - SynthesizeNoteInput - Input type for the flow.
 * - SynthesizeNoteOutput - Return type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SynthesizeNoteInputSchema = z.object({
  content: z.string().describe('The raw content of the tactical note to synthesize.'),
});
export type SynthesizeNoteInput = z.infer<typeof SynthesizeNoteInputSchema>;

const SynthesizeNoteOutputSchema = z.object({
  summary: z.string().describe('A high-level executive summary of the note.'),
  actionItems: z.array(z.string()).describe('A list of immediate actionable directives derived from the content.'),
});
export type SynthesizeNoteOutput = z.infer<typeof SynthesizeNoteOutputSchema>;

export async function synthesizeNote(input: SynthesizeNoteInput): Promise<SynthesizeNoteOutput> {
  return synthesizeNoteFlow(input);
}

const synthesizeNotePrompt = ai.definePrompt({
  name: 'synthesizeNotePrompt',
  input: {schema: SynthesizeNoteInputSchema},
  output: {schema: SynthesizeNoteOutputSchema},
  prompt: `You are an elite tactical analyst at Camly Operations. 

Your task is to synthesize the following raw intelligence into a high-authority executive summary and a list of specific, actionable directives.

RAW INTELLIGENCE:
"""
{{{content}}}
"""

Keep the summary concise (max 3 sentences) and the action items highly tactical.`,
});

const synthesizeNoteFlow = ai.defineFlow(
  {
    name: 'synthesizeNoteFlow',
    inputSchema: SynthesizeNoteInputSchema,
    outputSchema: SynthesizeNoteOutputSchema,
  },
  async input => {
    const {output} = await synthesizeNotePrompt(input);
    return output!;
  }
);
