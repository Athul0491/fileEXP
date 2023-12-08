export default function DiskComponent({ disk, onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-5 w-56 bg-gray-300 radius rounded cursor-pointer"
    >
      <h3>
        {disk.name} ({disk.letter})
      </h3>
      <progress
        max="100"
        value={(parseFloat(disk.used_gb) / parseFloat(disk.total_gb)) * 100}
      />{" "}
      <br />
      {disk.total_gb - disk.used_gb} GB free of {disk.total_gb} GB
    </button>
  );
}
