export interface Person {
    name: string;
    bday: string;
}
export interface BirthdayListProps {
    year: number;
    jsonData: Person[];
}