export default interface Project {
    id: number;
    title: string;
    screenshot: string;
    description: string;
    bullets: string[];
    showOnResume: boolean;
    resumeOrder?: number;
    startDate?: string;
    endDate?: string;
    technologies: string[];
    website: string;
}