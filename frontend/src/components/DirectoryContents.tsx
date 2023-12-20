import DirectoryEntity from "./DirectoryEntity";
import { DirectoryContent } from "../types";

interface Props {
  content: DirectoryContent[];
  onDirectoryClick: (directoryName: string) => any;
  onFileClick: (fileName: string) => any;
}

export function DirectoryContents({ content, onDirectoryClick, onFileClick }: Props) {
  return (
    <>
      {content.length === 0 ? "There are no files in this directory." : ""}

      {content.map((content, idx) => {
        const [fileType, fileName] = Object.entries(content)[0];

        return (
          <DirectoryEntity
            type={fileType === "Directory" ? "directory" : "file"}
            onDoubleClick={() =>
              fileType === "Directory"
                ? onDirectoryClick(fileName)
                : onFileClick(fileName)
            }
            key={idx}
            name={fileName}
          />
        );
      })}
    </>
  );
}
