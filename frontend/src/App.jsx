import { useState, useEffect } from "react";
import "./App.css";
import { OpenDirectory } from "../wailsjs/go/main/App";
import { GetDisks } from "../wailsjs/go/main/App";
import { PiArrowUUpLeftBold } from "react-icons/pi";
// interface Disk {
//   name: string;
//   used_gb: number;
//   total_gb: number;
// }
const App = () => {
  const [disks, setDisks] = useState([]);
  useEffect(() => {
    async function getData() {
      const disks = await GetDisks();
      setDisks(disks);
    }
    getData().catch(console.error);
  }, []);
  console.log(disks);
  const [currentDirectory, setCurrentDirectory] = useState("D:/");
  const [previousDirectory, setPreviousDirectory] = useState("");
  const [directoryContents, setDirectoryContents] = useState(["D:/"]);

  const showDirectoryContents = async (directory) => {
    try {
      const content = await OpenDirectory(directory);
      setDirectoryContents(content);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (dir) => {
    console.log("handle click");
    console.log(dir);
    setPreviousDirectory(currentDirectory);
    setCurrentDirectory(dir);
  };

  const handleBackClick = () => {
    if (previousDirectory !== "") {
      setCurrentDirectory(previousDirectory);
      setPreviousDirectory(getParentDirectory(previousDirectory));
    }
  };

  useEffect(() => {
    console.log(currentDirectory);
    showDirectoryContents(currentDirectory);
  }, [currentDirectory]);

  const getParentDirectory = (filePath) => {
    const segments = filePath.split("/");
    segments.pop();
    const parentDirectory = segments.join("/");
    return parentDirectory + "/";
  };

  return (
    <div id="App">
      <div>
        <PiArrowUUpLeftBold
          className="backButton"
          onClick={handleBackClick}
          size="2em"
        />
      </div>
      <div
        id="directoryContents"
        className="directoryContents max-h-100 overflow-y-auto"
      >
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
