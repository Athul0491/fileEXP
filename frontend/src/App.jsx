import { useState, useEffect } from "react";
import { GetDisks } from "../../frontend/wailsjs/go/main/App.js";
import { OpenDirectory } from "../../frontend/wailsjs/go/main/App.js";
import DiskList from "./components/Disks/DiskList.jsx";
import { DirectoryContents } from "./components/DirectoryContents.jsx";
import FolderNavigation from "./components/FolderNavigation.jsx";

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

  useEffect(() => {
    getData().catch(console.error);
  }, []);

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
      <FolderNavigation
        onBackArrowClick={onBackArrowClick}
        canGoBackward={canGoBackward()}
        onForwardArrowClick={onForwardArrowClick}
        canGoForward={canGoForward()}
      />

      {pathHistory[historyPlace] === "" ? (
        <DiskList disks={disks} onClick={onDiskClick} />
      ) : (
        <DirectoryContents
          content={directoryContents}
          onDirectoryClick={onDirectoryClick}
        />
      )}
    </div>
  );
}

export default App;
