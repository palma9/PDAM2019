export interface UserResponse {
    id: string;
    email: string;
    name: string;
    role: string;
    number: Number;
    school: string;
    substitutionsDone: number;
    substituted: Date[];
    picture: string;
}
