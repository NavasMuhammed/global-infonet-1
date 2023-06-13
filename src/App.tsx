import { useState } from "react";
import { BirthdayList } from "./components/bdayList";
import jsonData from "./data/data";
import "./App.scss"

const App: React.FC = () => {
  const [year, setYear] = useState<number>(0);
  const [showBirthdays, setShowBirthdays] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBirthdays(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a year:
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
        </label>
        <button type="submit">Show Birthdays</button>
      </form>
      {showBirthdays && <BirthdayList year={year} jsonData={jsonData} />}
    </div>
  );
};

export default App