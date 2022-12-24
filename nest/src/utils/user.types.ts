export type SignupUser = {
    username: string
    email: string
    password: string;
}
export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}