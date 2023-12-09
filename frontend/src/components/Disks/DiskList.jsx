import DiskComponent from "./DiskComponent";

export default function DiskList({ disks, onClick }) {
  return (
    <div className="space-x-4">
      {disks.map((disk, idx) => (
        <DiskComponent
          onClick={() => onClick(disk.letter)}
          disk={disk}
          key={idx}
        />
      ))}
    </div>
  );
}
