import { useState, useEffect } from "react";
import "./App.css";
import { OpenDirectory } from "../wailsjs/go/main/App";

const App = () => {
  const [currentDirectory, setCurrentDirectory] = useState("D:/");
  const [directoryContents, setDirectoryContents] = useState(["D:/"]);
  const updateDirectoryContents = (content) => setDirectoryContents(content);
  const updateDirectory = (directory) => setCurrentDirectory(directory);

  const showDirectoryContents = (directory) => {
    OpenDirectory(directory)
      .then((content) => updateDirectoryContents(content)) // Handle success
      .catch((error) => {
        console.error(error); // Handle error
      });
    // console.log(directoryContents);
  };

  const handleClick = (dir) => {
    // setCurrentDirectory(
    console.log("handle click");
    console.log(dir);
    updateDirectory(dir);
    // console.log(currentDirectory);
    showDirectoryContents(currentDirectory);
    // console.log("ending wala chalray", directoryContents);
    // console.log(document.getElementsByClassName("directoryContent"));
  };
  // let render = 0;
  // useEffect(() => {
  //   if (render === 0) {
  //     console.log("useEffect");
  //     showDirectoryContents(currentDirectory);
  //   }
  //   render += 1;
  // }, []);

  return (
    <div id="App">
      <div id="directoryContents" className="directoryContents">
        <h3>
          {directoryContents.length > 0 &&
            directoryContents.map((dir, index) => (
              <div
                onClick={() => handleClick(dir)}
                key={index}
                id={dir}
                className={`directoryContent directoryContent${index}`}
              >
                <p>{dir}</p>
              </div>
            ))}
        </h3>
      </div>
    </div>
  );
};

export default App;
