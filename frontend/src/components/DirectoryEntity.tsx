import { MouseEventHandler } from "react";
import { DirectoryEntityType } from "../types";
import { FaFile, FaFolder } from "react-icons/fa";

interface Props {
  name: string;
  type: DirectoryEntityType;
  onDoubleClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function DirectoryEntity({ name, type, onDoubleClick }: Props) {
  var icon =
    type === "file" ? (
      <FaFile size={24} color="gray" />
    ) : (
      <FaFolder size={24} color="#FFD54F" />
    );
  return (
    <>
      <button
        className="directory-entity bg-background hover:bg-darker cursor-pointer w-full h-8 flex"
        id="directory-entity"
        onDoubleClick={onDoubleClick}
      >
        <div className="mr-1">{icon}</div>
        {name}
      </button>
    </>
  );
}
