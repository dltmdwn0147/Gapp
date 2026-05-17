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

export interface NoticeItemProps {
    id: string;
    type: string;
    category: string;
    title: string;
    department: string;
    date: string;
    targetYear?: string;
}

export interface DeptNoticeItemProps extends NoticeItemProps {}