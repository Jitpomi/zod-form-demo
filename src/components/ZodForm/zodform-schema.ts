import  Type from 'zod';

export const ZodFormSchema = Type.object({
  title: Type.string(),
  today: Type.string(),
});

export type ZodType = Type.infer<typeof ZodFormSchema>;
