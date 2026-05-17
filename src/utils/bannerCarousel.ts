/** iOS VirtualizedList 성능을 위해 복제 횟수 제한 (무한 스크롤 체감은 유지) */
export const INFINITE_MULTIPLIER = 5;

export function buildInfiniteData<T>(data: T[]): T[] {
    return Array(INFINITE_MULTIPLIER).fill(data).flat();
}

export function getMiddleIndex(originalLength: number): number {
    return originalLength * Math.floor(INFINITE_MULTIPLIER / 2);
}

/** NativeWind bg 클래스 → iOS에서도 확실히 적용되는 배경색 */
export const BANNER_BG_COLORS: Record<string, string> = {
    'bg-blue-600': '#2563eb',
    'bg-slate-800': '#1e293b',
    'bg-emerald-600': '#059669',
    'bg-amber-600': '#d97706',
    'bg-amber-500': '#f59e0b',
    'bg-red-600': '#dc2626',
    'bg-indigo-600': '#4f46e5',
    'bg-indigo-700': '#4338ca',
    'bg-rose-600': '#e11d48',
    'bg-cyan-600': '#0891b2',
    'bg-violet-600': '#7c3aed',
    'bg-orange-500': '#f97316',
    'bg-sky-600': '#0284c7',
};

export function getBannerBackgroundColor(bgClass: string): string {
    return BANNER_BG_COLORS[bgClass] ?? '#2563eb';
}
