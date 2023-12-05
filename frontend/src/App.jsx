import { useState } from "react";
import logo from "./assets/images/logo-universal.png";
import "./App.css";
import { Greet } from "../wailsjs/go/main/App";
import { openDirectory } from "../wailsjs/go/main/App";

function App() {
  const [resultText, setResultText] = useState(
    "Please enter your name below 👇"
  );
  const [name, setName] = useState("");
  const updateName = (e) => setName(e.target.value);
  const updateResultText = (result) => setResultText(result);

  function greet() {
    Greet(name).then(updateResultText);
  }
  function dirr() {
    console.log("dirr");
    openDirectory("D:/Athul/spark/spark")
      .then((result, err) => console.log(result)) // Handle success

      //   .then((buffer) => console.log(buffer))
      .catch((error) => {
        console.error(error); // Handle error
      });
    console.log("birr");
    // console.log(resultText);
  }

  return (
    // <div id="App">
    //   <img src={logo} id="logo" alt="logo" />
    //   <div id="result" className="result">
    //     {resultText}
    //   </div>
    //   <div id="input" className="input-box">
    //     <input
    //       id="name"
    //       className="input"
    //       onChange={updateName}
    //       autoComplete="off"
    //       name="input"
    //       type="text"
    //     />
    //     <button className="btn" onClick={greet}>
    //       Greet
    //     </button>
    //   </div>
    // </div>
    <>
      <h1>Hello from wails</h1>
      <button onClick={() => dirr()}>Show files</button>
    </>
  );
}

export default App;
