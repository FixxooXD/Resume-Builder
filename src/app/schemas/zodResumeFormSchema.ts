// app/schemas/resumeSchema.ts
import { z } from 'zod';

// Define the Zod schema for resume form validation
export const resumeSchema = z.object({
  name: z.string().min(1, "Name is required").regex(/^[a-zA-Z\s]+$/, "Special Character are not allowed"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  // You can add more fields like education, experience, etc.
});
