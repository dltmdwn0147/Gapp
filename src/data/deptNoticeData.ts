import { DeptNoticeItemProps } from '../types';

export const DEPT_NOTICES_BY_DEPT: Record<string, DeptNoticeItemProps[]> = {
    '전자공학부': [
        {
            id: '1',
            type: '공지',
            category: '학과',
            title: '2026학년도 1학기 전자공학부 종합설계(캡스톤디자인) 최종 결과물 제출 안내',
            department: '전자공학부',
            date: '2026.05.15'
        },
        {
            id: '2',
            type: '취업',
            category: '채용',
            title: '[채용연계형] SK하이닉스/삼성전자 반도체 트랙 장학생 및 인턴 선발 공고',
            department: '학과사무실',
            date: '2026.05.14'
        },
        {
            id: '3',
            type: '공지',
            category: '학과',
            title: '반도체 공정 및 회로설계 실험실(IDE) 안전교육 미이수자 출입 제한 안내',
            department: '학생회',
            date: '2026.05.13'
        },
        {
            id: '4',
            type: '장학',
            category: '학과',
            title: '2026년 상반기 전자공학부 후원 기업(LG이노텍) 장학금 신청 안내',
            department: '학과사무실',
            date: '2026.05.10'
        },
        {
            id: '5',
            type: '행사',
            category: '학과',
            title: '제 8회 전자공학부 임베디드 시스템 제어 경진대회(MCU 활용) 참가자 모집',
            department: '학생회',
            date: '2026.05.08'
        },
    ],
    '경영학부': [
        {
            id: '1',
            type: '공지',
            category: '학과',
            title: '2026학년도 1학기 경영학부 전공 필수 과목 수강신청 일정 안내',
            department: '경영학부',
            date: '2026.05.15'
        },
        {
            id: '2',
            type: '행사',
            category: '학과',
            title: '경영학부 학술제 "Biz-Start" 기획팀 모집',
            department: '학생회',
            date: '2026.05.12'
        },
        {
            id: '3',
            type: '취업',
            category: '채용',
            title: '[추천채용] 카카오뱅크 동계 체험형 인턴십',
            department: '학과사무실',
            date: '2026.05.10'
        }
    ],
    '수학교육과': [
        {
            id: '1',
            type: '공지',
            category: '학과',
            title: '2026학년도 1학기 교육실습(교생) 오리엔테이션 안내',
            department: '수학교육과',
            date: '2026.05.15'
        },
        {
            id: '2',
            type: '행사',
            category: '학과',
            title: '제 20회 사범대학 수학교육과 학술세미나 개최',
            department: '수학교육과',
            date: '2026.05.14'
        }
    ]
};