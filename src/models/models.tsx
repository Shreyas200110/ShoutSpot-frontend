export interface SpaceType {
    logo: string;
    heading: string;
    videoCount: number;
    textCount: number;
}

export interface OverviewCardProps {
    iconPath: string,
    total: string,
    maxAllowed: string,
    title: string
};