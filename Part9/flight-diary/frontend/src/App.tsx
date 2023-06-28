import { useState } from "react"

function App() {
  const [date, setDate] = useState('toto');

  return (
    <>
      <form>
        <label>
          date
          <input type="text" name="date" value={date} onChange={e => setDate(e.target.value)}/>
        </label>
        <div>
          visibility<input name="visibility"></input>
        </div>
        <div>
          weather<input name="weather"></input>
        </div>
        <div>
          comment<input name="comment"></input>
        </div>
      </form>
    </>
  )
}

export default App
