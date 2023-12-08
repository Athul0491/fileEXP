import { FaFile, FaFolder } from "react-icons/fa";

export default function DirectoryEntity({ name, type, onClick }) {
  var icon =
    type === "file" ? (
      <FaFile size={24} color="gray" />
    ) : (
      <FaFolder size={24} color="#FFD54F" />
    );
  return (
    <>
      <button
        className="bg-background hover:bg-darker cursor-pointer w-full h-8 flex"
        onClick={onClick}
      >
        <div className="mr-1">{icon}</div>
        {name}
      </button>
    </>
  );
}
