import { useState, useEffect } from "react";
import { GetDisks } from "../../frontend/wailsjs/go/main/App.js";
import { OpenDirectory } from "../../frontend/wailsjs/go/main/App.js";
import DiskComponent from "./components/DiskComponent.jsx";
import Directory from "./components/Directory.jsx";
import File from "./components/File.jsx";
import fs from "fs";

function App() {
  const [disks, setDisks] = useState([{}]);
  const [currentPath, setCurrentPath] = useState("");
  const [directoryContents, setDirectoryContents] = useState([]);
  async function onDiskClick(letter) {
    // console.log(letter);
    setCurrentPath(letter + ":/");
    // console.log(currentPath);
    const directoryContents = await OpenDirectory(letter + ":/");
    setDirectoryContents(directoryContents);
  }
  async function onDirectoryClick(name) {
    setCurrentPath(name + "/");
    const directoryContents = await OpenDirectory(currentPath);
    setDirectoryContents(directoryContents);
  }
  async function getData() {
    const disks = await GetDisks();
    setDisks(disks);
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

  if (currentPath.length == 0) {
    return (
      <div className="flex space-x-2 p-4">
        {disks.map((disk, idx) => (
          <DiskComponent
            onClick={() => onDiskClick(disk.letter)}
            disk={disk}
            key={idx}
          />
        ))}
      </div>
    );
  } else {
    return (
      <>
        {directoryContents.map((content, idx) => {
          // console.log(content, "content");
          const fileType = content.match("[?:[a-zA-Z0-9-_.]+(?:.txt|.sql)")
            ? "File"
            : "Directory";
          content = splitPath(content);
          // console.log(fileType, "fileType");
          // console.log(drive, dir, fileName, "fileName");
          // console.log(typeof content, "type");
          if (fileType === "Directory") {
            return (
              <Directory
                onClick={() => onDirectoryClick(content.fileName)}
                key={idx}
                name={content.fileName}
              />
            );
          } else {
            return <File key={idx} name={content.fileName} />;
          }
        })}
      </>
    );
  }
}

export default App;
