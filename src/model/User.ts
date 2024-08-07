export default interface User {
    uid?: string
    email: string
    name: string
    token?: string
    provider?: string
    imageUrl?: string
    password?: string
    confirmPassword?: string
};
