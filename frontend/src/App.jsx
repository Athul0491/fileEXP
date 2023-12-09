import { useState, useEffect } from "react";
import { GetDisks } from "../../frontend/wailsjs/go/main/App.js";
import { OpenDirectory } from "../../frontend/wailsjs/go/main/App.js";
import DiskList from "./components/Disks/DiskList.jsx";
import { DirectoryContents } from "./components/DirectoryContents.jsx";
import FolderNavigation from "./components/FolderNavigation.jsx";
import useNavigation from "./hooks/useNavigation";

function App() {
  const [disks, setDisks] = useState([{}]);
  const [directoryContents, setDirectoryContents] = useState([]);

  const {
    pathHistory,
    setPathHistory,
    historyPlace,
    setHistoryPlace,
    onBackArrowClick,
    onForwardArrowClick,
    canGoBackward,
    canGoForward,
  } = useNavigation();

  async function updateDirectoryContents() {
    const contents = await OpenDirectory(pathHistory[historyPlace]);
    setDirectoryContents(contents);
  }

  async function onDiskClick(letter) {
    const path = letter + ":/";
    if (pathHistory[pathHistory.length - 1] != path) {
      pathHistory.push(path);
    }
    setHistoryPlace(pathHistory.length - 1);

    // const directoryContents = await OpenDirectory(path);
    // setDirectoryContents(directoryContents);
    updateDirectoryContents();
  }

  async function onDirectoryClick(name) {
    const currentPath = pathHistory[pathHistory.length - 1];
    const newPath = currentPath + name + "/";

    pathHistory.push(newPath);
    setHistoryPlace(pathHistory.length - 1);

    const directoryContents = await OpenDirectory(pathHistory[historyPlace]);
    setDirectoryContents(directoryContents);
  }

  async function getDisks() {
    const disks = await GetDisks();
    setDisks(disks);
  }

  useEffect(() => {
    if (pathHistory[historyPlace] == "") {
      getDisks().catch(console.error);
      return;
    }
    updateCurrentDirectory();
  }, [historyPlace]);

  async function updateCurrentDirectory() {
    console.log(pathHistory);
    if (pathHistory[historyPlace] == "") {
      return getDisks();
    }

    await updateDirectoryContents();
  }

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
