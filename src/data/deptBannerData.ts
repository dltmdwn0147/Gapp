import { BannerItem } from '../types';

export const DEPT_BANNER_DATA_BY_DEPT: Record<string, BannerItem[]> = {
    '전자공학부': [
        {
            id: 1,
            bg: 'bg-indigo-700',
            imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop',
            title: '코딩의 한계에\n도전하라',
            subtitle: '컴퓨터/전자 해커톤',
            date: '2025.07.05(토) - 07.06(일)',
            place: 'IT 교육관 301호',
            content: '24시간 동안 몰입하여 개발하고 상금도 쟁취할 수 있는 열정 넘치는 해커톤.'
        },
        {
            id: 2,
            bg: 'bg-rose-600',
            imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600&auto=format&fit=crop',
            title: '함께 만드는\n즐거운 추억',
            subtitle: '학과 연합 MT',
            date: '2025.08.20(수) - 08.22(금)',
            place: '대성리 푸른 계곡',
            content: '여름 방학의 낭만을 가득 담은 학과 구성원들과의 즐거운 2박 3일 여행.'
        },
        {
            id: 3,
            bg: 'bg-cyan-600',
            imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop',
            title: '선배가 들려주는\n진짜 사회 이야기',
            subtitle: '졸업생 초청 멘토링',
            date: '2025.09.15(월) 18:00',
            place: '멀티미디어실',
            content: '현직에 계신 선배님들께 듣는 생생한 직무 분석과 취업 준비 노하우.'
        },
        {
            id: 4,
            bg: 'bg-violet-600',
            imageUrl: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=600&auto=format&fit=crop',
            title: '우리의 손으로\n이끄는 학과',
            subtitle: '정기 학생회 선거',
            date: '2025.11.10(월) - 11.12(수)',
            place: '학과 사무실 앞',
            content: '우리 학과의 내일을 책임질 차기 학생회를 직접 투표로 선정하는 시간.'
        },
        {
            id: 5,
            bg: 'bg-orange-500',
            imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop',
            title: '전공 역량의\n결실',
            subtitle: '졸업 작품 전시회',
            date: '2025.12.01(월) - 12.03(수)',
            place: '학술 문화관 1층',
            content: '4년간의 학업을 마무리하며 직접 개발한 멋진 작품들을 선보이는 자리.'
        },
    ],
    '경영학부': [
        {
            id: 1,
            bg: 'bg-emerald-600',
            imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop',
            title: '실전 비즈니스\n아이디어 피칭',
            subtitle: '창업 경진대회',
            date: '2025.09.20(토)',
            place: '경영관 대강당',
            content: '미래의 CEO를 꿈꾸는 경영학도들의 치열한 아이디어 피칭 데이.'
        },
        {
            id: 2,
            bg: 'bg-amber-500',
            imageUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=600&auto=format&fit=crop',
            title: '금융권 선배\n초청 강연',
            subtitle: '금융권 취업 전략',
            date: '2025.10.15(수) 17:00',
            place: '경영관 101호',
            content: '은행, 증권사 현직 선배들이 직접 들려주는 생생한 취업 성공기.'
        }
    ],
    '수학교육과': [
        {
            id: 1,
            bg: 'bg-sky-600',
            imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop',
            title: '좋은 교사가\n되기 위한 첫걸음',
            subtitle: '수업 시연 경연대회',
            date: '2025.11.05(수)',
            place: '사범관 203호',
            content: '예비 교사들의 창의적이고 효과적인 수업 설계 및 시연 대회.'
        }
    ]
};
