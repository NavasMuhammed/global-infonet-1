import { useState, useEffect } from "react";
import { BirthdayListProps } from "../types/types";
import "./bdayList.scss"
import randomColor from 'randomcolor';
const getRandomColor = () => {
    return randomColor();
};
export const BirthdayList: React.FC<BirthdayListProps> = ({ year, jsonData }) => {
    const [birthdaysByDay, setBirthdaysByDay] = useState<Record<string, string[]>>({});

    useEffect(() => {
        return setBirthdaysByDay(getBirthdaysByDay(year));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year]);

    function getBirthdaysByDay(year: number | string) {
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
        //returns the day based on the date provided
        return daysOfWeek[date.getDay()];
    }

    return (
        <div className="main--container">
            {
                Object.entries(birthdaysByDay).map(([day, names]) => (
                    <div key={day} className="day--wrapper">
                        <div className="day--container">
                            <span className="day--banner">{day.slice(0, 3)}</span>
                            {names.length > 0 ? (
                                <>
                                    {names.map((name, index) => (
                                        <span key={index} style={{ backgroundColor: getRandomColor() }} className={`name--card columns-${name.length < 4 ? name.length : 4}`} >
                                            {name.split(" ")[0][0].toLocaleUpperCase()}
                                            {name.split(" ")[1][0].toLocaleUpperCase()}
                                        </span>
                                    ))}
                                </>
                            ) : (
                                <span className='name--card black columns-4'>&gt;&#xfe4f;&lt;</span>
                            )}
                        </div>
                        <span  >{names.length} birthdays</span>
                    </div>
                ))
            }
        </div>
    );
};