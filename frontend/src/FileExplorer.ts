import { DirectoryContent } from "./types";
import { Disk } from "./types";
import { OpenDirectory } from "../wailsjs/go/main/App";
import { GetDisks } from "../wailsjs/go/main/App";

// Complete this after the Go function is implemented
export async function openDirectory(path: string): Promise<DirectoryContent[]> {
  const contents = await OpenDirectory(path);
  // console.log(contents)
  // const content: DirectoryContent[] = contents.map

  return contents;
}

export async function getDisks(): Promise<Disk[]> {
  const disks = await GetDisks();
  const ret: Disk[] = disks.map((disk) => ({
    name: disk.name,
    letter: disk.letter,
    available_gb: disk.available_gb,
    used_gb: disk.used_gb,
    total_gb: disk.total_gb,
  }));
  return Promise.resolve(ret);
}
