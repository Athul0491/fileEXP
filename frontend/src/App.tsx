import { useState, useEffect } from "react";
import { DirectoryContent, Disk } from "./types";
import { getDisks, openDirectory, openFile } from "./FileExplorer";
import DiskList from "./components/Disks/DiskList";
import { DirectoryContents } from "./components/DirectoryContents";
import FolderNavigation from "./components/FolderNavigation";
import SearchBar from "./components/SearchBar";
import SearchFilter from "./components/SearchFilter";
import useNavigation from "./hooks/useNavigation";

function App() {
  const [disks, setDisks] = useState<Disk[]>([]);
  const [directoryContents, setDirectoryContents] = useState<DirectoryContent[]>([]);
  const [searchResults, setSearchResults] = useState<DirectoryContent[]>([]);

  const { pathHistory, setPathHistory, historyPlace, setHistoryPlace, onBackArrowClick, onForwardArrowClick, canGoBackward, canGoForward} = useNavigation();

  async function updateDirectoryContents() {
    const contents = await openDirectory(pathHistory[historyPlace]);
    setDirectoryContents(contents);
  }

  async function onDiskClick(letter: string) {
    const path = letter + ":/";
    if (pathHistory[pathHistory.length - 1] != path) {
      pathHistory.push(path);
    }
    setHistoryPlace(pathHistory.length - 1);
    const directoryContent = await openDirectory(pathHistory[historyPlace]);
    setDirectoryContents(directoryContent);
  }

  async function onDirectoryClick(name: string) {
    console.log(pathHistory, "pathHistory");
    console.log(name, "name");
    const newPath = name + "/";
    pathHistory.push(newPath);
    setHistoryPlace(pathHistory.length - 1);

    updateDirectoryContents();
  }

  async function getDisk() {
    const disks = await getDisks();
    setDisks(disks);
  }
  async function updateCurrentDirectory() {
    if (pathHistory[historyPlace] == "") {
      return getDisk();
    }

    await updateDirectoryContents();
  }

  useEffect(() => {
    if (pathHistory[historyPlace] == "") {
      getDisk().catch((err) => console.error(err));
      return;
    }
    updateCurrentDirectory();
  }, [historyPlace]);

  return (
    <div className="p-4">
      <div className="flex justify-between pb-5">
        <FolderNavigation
          onBackArrowClick={onBackArrowClick}
          canGoBackward={canGoBackward()}
          onForwardArrowClick={onForwardArrowClick}
          canGoForward={canGoForward()}
        />

        <SearchBar
          currentDirectoryPath={pathHistory[historyPlace]}
          setSearchResults={setSearchResults}
        />
      </div>
      {pathHistory[historyPlace] === "" && searchResults.length === 0 ? (
        <DiskList disks={disks} onClick={onDiskClick} />
      ) : (
        <DirectoryContents
          content={
            searchResults && searchResults.length === 0
              ? directoryContents != null
                ? directoryContents
                : []
              : searchResults
          }
          onDirectoryClick={onDirectoryClick}
          onFileClick={openFile}
        />
      )}
    </div>
  );
}

export default App;
