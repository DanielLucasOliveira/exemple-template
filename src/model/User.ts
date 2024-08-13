export default interface User {
    uid?: string
    email: string
    name: string
    token?: string
    provider?: string
    image?: string
    password?: string
    confirmPassword?: string
};
