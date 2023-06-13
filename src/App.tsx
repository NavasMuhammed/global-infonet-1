import { useState } from "react";
import { BirthdayList } from "./components/bdayList";
import jsonData from "./data/data";
import "./App.scss";

const App: React.FC = () => {
  const [year, setYear] = useState<number | "">(0);
  const [inputYear, setInputYear] = useState<number | "">(0);
  const [showBirthdays, setShowBirthdays] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setYear(inputYear);
    setShowBirthdays(true);
  };

  const formattedJson = JSON.stringify(jsonData, null, 50);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    if (inputValue === "") {
      setInputYear("");
    } else {
      const parsedYear = parseInt(inputValue);
      if (!isNaN(parsedYear)) {
        setInputYear(parsedYear);
      }
    }
  };

  return (
    <>
      <div className="data--container">
        {showBirthdays && <BirthdayList year={year} jsonData={jsonData} />}
      </div>
      <div>
        <form className="form--container" onSubmit={handleSubmit}>
          <pre className="list--container">{formattedJson}</pre>
          <div className="input--container">
            <div>
              <label>Year</label>
              <input
                type="text"
                value={inputYear === "" ? "" : inputYear}
                onChange={handleYearChange}
              />
            </div>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default App;
