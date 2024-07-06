/// <reference types="vite/client" />

interface Poem {
    id: number;
    title:string;
    authorName: string;
    avatarUrl:string;
    content: string;
    category: string;
    dynasty:string;
    likes: number;
    liked: boolean;
    translation: string;
    appreciation:string;
}

interface Author {
    id: number;
    avatarUrl: string;
    name: string;
    dynasty: string;
    bio: string;
    liked: boolean
    likes: number
}
interface User {
    id: number;
    username: string;
    userAccount: string;
    userStatus: string;
    userRole: string;
    profile: string;
}

interface FamousLine {
    id:number;
    title:string;
    content:string;
}