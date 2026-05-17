export interface UserInfo {
    college: string;
    department: string;
    id: string;
    name: string;
}

export const DUMMY_USERS: Record<string, UserInfo> = {
    "221125139": {
        college: "IT 공과대학",
        department: "전자공학부",
        id: "221125139",
        name: "이승주"
    },
    "202300001": {
        college: "경영대학",
        department: "경영학부",
        id: "202300001",
        name: "김진주"
    },
    "202412345": {
        college: "사범대학",
        department: "수학교육과",
        id: "202412345",
        name: "박교수"
    }
};
