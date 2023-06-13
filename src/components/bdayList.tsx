import { useState, useEffect } from "react";

interface Person {
    name: string;
    bday: string;
}
interface BirthdayListProps {
    year: number;
    jsonData: Person[];
}

export const BirthdayList: React.FC<BirthdayListProps> = ({ year, jsonData }) => {
    const [birthdaysByDay, setBirthdaysByDay] = useState<Record<string, string[]>>({});

    useEffect(() => {
        setBirthdaysByDay(getBirthdaysByDay(year));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year]);

    function getBirthdaysByDay(year: number) {
        const birthdaysByDay: Record<string, string[]> = {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
        };

        for (const person of jsonData) {
            const { name, bday } = person;
            const [day, month, bYear] = bday.split('/');
            const birthYear = parseInt(bYear, 10);

            if (birthYear === year) {
                const bdate = new Date(year, parseInt(month, 10) - 1, parseInt(day, 10));
                const dayOfWeek = getDayOfWeek(bdate);

                birthdaysByDay[dayOfWeek].push(name);
            }
        }

        return birthdaysByDay;
    }

    function getDayOfWeek(date: Date) {
        const daysOfWeek: string[] = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        return daysOfWeek[date.getDay()];
    }

    return (
        <div>
            {Object.entries(birthdaysByDay).map(([day, names]) => (
                <div key={day}>
                    <h3>{day}</h3>
                    {names.length > 0 ? (
                        <ul>
                            {names.map((name) => (
                                <li key={name}>{name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No birthdays</p>
                    )}
                </div>
            ))}
        </div>
    );
};