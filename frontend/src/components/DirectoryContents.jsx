import DirectoryEntity from "./DirectoryEntity";

export function DirectoryContents({ content, onDirectoryClick }) {
  function splitPath(path) {
    const parts = path.split("/");
    const drive = parts[0];
    const dir = parts.slice(1, -1).join("/");
    const fileName = parts[parts.length - 1];
    return { drive, dir, fileName };
  }
  return (
    <>
      {content.length === 0 ? "There are no files in this directory." : ""}

      {content.map((fullPath, idx) => {
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
  );
}
