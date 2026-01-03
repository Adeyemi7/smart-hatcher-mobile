// import { z } from 'zod';

// export const loginSchema = z.object({
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z.string().min(1, { message: "Password is required" }),
// });

// export const signUpSchema = z.object({
//   username: z.string().min(3, { message: "Username must be 3+ chars" }),
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z.string().min(6, { message: "Password must be 6+ chars" }),
//   confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

// export const resetSchema = z.object({
//   email: z.string().email({ message: "Invalid email address" }),
// });


import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const signUpSchema = z.object({
  username: z.string().min(3, { message: "Username must be 3+ chars" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be 6+ chars" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // This ensures the error attaches to the confirmPassword field
});

export const resetSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});