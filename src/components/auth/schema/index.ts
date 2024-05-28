import * as z from 'zod';

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Please provide a valid email adress.'
    }),
    username: z.string().min(3, {
        message: 'Please enter your name.'
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    })
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        })
    }
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Please provide a valid email adress.'
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    })
}).superRefine(({ email, password }, ctx) => {
    if (email && password) {
        ctx.addIssue({
            code: "custom",
            message: "the password didi not match",
            path: ['email']
        })
    }
})