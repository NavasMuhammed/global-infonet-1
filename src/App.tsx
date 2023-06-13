import { BirthdayList } from "./components/bdayList"
import jsonData from "./data/data.ts"

function App() {

  return (
    <> <BirthdayList jsonData={jsonData} year={1995} /></>
  )
}

export default App
