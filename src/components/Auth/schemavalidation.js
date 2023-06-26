import {z} from 'zod'

export const registerschema = z.object({
    username: z
        .string()
        .min(5, 'Username must be at least 5 characters')
        .max(50, 'Username must not exceed 50 characters')
        .nonempty("Username is required"),
    email: z
        .string()
        .email('Invalid email address'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Password must contain letters, numbers, and special characters'),
    passwordconfirm: z
        .string(),
    name: z
        .string()
        .min(5, 'Name must be at least 5 characters')
        .max(50, 'Name must not exceed 50 characters')
        .nonempty("Name is required"),
    phone: z
        .string()
        .refine((value) => value.startsWith('254'), 'Phone number must start with 254')
        .refine((value) => /^\d{12}$/.test(value), 'Invalid phone number'),
}).refine((data) => data.password === data.passwordconfirm, {
    message: 'Passwords do not match',
    path: ['passwordconfirm'],
})

export const loginschema = z.object({
    username: z
        .string()
        .nonempty("Username is required"),
    password: z
        .string()
        .nonempty('Password is required'),
})


export const passwordresetschema = z.object({
    email: z
        .string()
        .email('Invalid email address'),
})


export const checkoutschema = z.object({
    address: z
        .string()
        .min(10, 'Address must be at least 10 characters')
        .max(100, 'Address must not exceed 100 characters')
        .nonempty("Username is required"),
    phone: z
        .string()
        .refine((value) => value.startsWith('254'), 'Phone number must start with 254')
        .refine((value) => /^\d{12}$/.test(value), 'Invalid phone number'),
})