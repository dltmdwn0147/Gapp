// src/types/index.ts

export interface BannerItem {
    id: number;
    bg: string;
    imageUrl: string;
    title: string;
    subtitle: string;
    date: string;
    place: string;
    content: string; // 🌟 icons 대신 content로 변경
}

export interface MenuItem {
    id: number;
    place: string;
    name: string;
}