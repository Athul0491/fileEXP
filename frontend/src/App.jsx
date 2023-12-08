import { useState, useEffect } from "react";
import { GetDisks } from "../../frontend/wailsjs/go/main/App.js";
import { OpenDirectory } from "../../frontend/wailsjs/go/main/App.js";
import DiskComponent from "./components/DiskComponent.jsx";
// import Directory from "./components/Directory.jsx";
// import File from "./components/File.jsx";
import DirectoryEntity from "./components/DirectoryEntity";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function App() {
  const [disks, setDisks] = useState([{}]);
  const [directoryContents, setDirectoryContents] = useState([]);
  const [pathHistory, setPathHistory] = useState([""]);
  const [historyPlace, setHistoryPlace] = useState(0);

  async function onDiskClick(letter) {
    const path = letter + ":/";
    if (pathHistory[pathHistory.length - 1] != path) {
      pathHistory.push(path);
    }
    setHistoryPlace(pathHistory.length - 1);

    const directoryContents = await OpenDirectory(path);
    setDirectoryContents(directoryContents);
  }

  async function onDirectoryClick(name) {
    const currentPath = pathHistory[pathHistory.length - 1];
    const newPath = currentPath + name + "/";

    pathHistory.push(newPath);
    setHistoryPlace(pathHistory.length - 1);

    const directoryContents = await OpenDirectory(pathHistory[historyPlace]);
    setDirectoryContents(directoryContents);
  }

  async function getData() {
    const disks = await GetDisks();
    setDisks(disks);
  }

  function canGoForward() {
    return historyPlace < pathHistory.length - 1;
  }

  function canGoBackward() {
    return historyPlace > 0;
  }

  function onBackArrowClick() {
    pathHistory.push(pathHistory[historyPlace - 1]);
    setHistoryPlace(historyPlace - 1);
  }

  function onForwardArrowClick() {
    setHistoryPlace(historyPlace + 1);
  }

  function splitPath(path) {
    const parts = path.split("/");
    const drive = parts[0];
    const dir = parts.slice(1, -1).join("/");
    const fileName = parts[parts.length - 1];

    return { drive, dir, fileName };
  }

  useEffect(() => {
    getData().catch(console.error);
  }, []);

  // console.log(directoryContents);
  async function updateCurrentDirectory() {
    console.log(pathHistory);
    if (pathHistory[historyPlace] == "") {
      return getData();
    }

    const directoryContents = await OpenDirectory(pathHistory[historyPlace]);
    setDirectoryContents(directoryContents);
  }

  useEffect(() => {
    updateCurrentDirectory();
  }, [historyPlace]);

  return (
    <div className="p-4">
      <div className="mb-5">
        <div className="space-x-4">
          <button onClick={onBackArrowClick} disabled={!canGoBackward()}>
            <FaArrowLeft
              size={48}
              className={canGoBackward() ? undefined : "text-gray-600"}
            />
          </button>

          <button onClick={onForwardArrowClick} disabled={!canGoForward()}>
            <FaArrowRight
              size={48}
              className={canGoForward() ? undefined : "text-gray-600"}
            />
          </button>
        </div>
      </div>

      {pathHistory[historyPlace] === "" ? (
        <div className="space-x-4">
          {disks.map((disk, idx) => (
            <DiskComponent
              onClick={() => onDiskClick(disk.letter)}
              disk={disk}
              key={idx}
            />
          ))}
        </div>
      ) : (
        <>
          {directoryContents.length === 0
            ? "There are no files in this directory."
            : ""}

          {directoryContents.map((fullPath, idx) => {
            const content = splitPath(fullPath);
            const fileType = fullPath.includes(".") ? "File" : "Directory";
            return (
              <DirectoryEntity
                type={fileType === "Directory" ? "directory" : "file"}
                onClick={() =>
                  fileType === "Directory"
                    ? onDirectoryClick(content.fileName)
                    : undefined
                }
                key={idx}
                name={content.fileName}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default App;
