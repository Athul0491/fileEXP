import { Dispatch, SetStateAction, useState } from "react";
import { DirectoryContent } from "../types";
import SearchFilter from "./SearchFilter";
import Input, { InputSize } from "../ui/Input";
import { Search_Directory } from "../../wailsjs/go/main/App.js";

interface Props {
  currentDirectoryPath: string;
  setSearchResults: Dispatch<SetStateAction<DirectoryContent[]>>;
}

export interface ISearchFilter {
  extension: string;
  acceptFiles: boolean;
  acceptDirectories: boolean;
}

export default function SearchBar({
  currentDirectoryPath,
  setSearchResults,
}: Props) {
  // console.log(currentDirectoryPath);
  // console.log(setSearchResults);
  const [searchValue, setSearchValue] = useState("");
  const [searchFilter, setSearchFilter] = useState<ISearchFilter>({
    extension: "",
    acceptFiles: true,
    acceptDirectories: true,
  });

  const split = currentDirectoryPath.split("/");
  const currentPlace = split[split.length - 2];

  async function onSearch() {
    const results = await Search_Directory(
      searchValue,
      currentDirectoryPath,
      searchFilter.extension,
      searchFilter.acceptFiles,
      searchFilter.acceptDirectories
    );

    setSearchResults(results);
  }

  return (
    <div>
      <Input
        value={searchValue}
        setValue={setSearchValue}
        placeholder={`Search ${currentPlace || "PC."}`}
        className="rounded-bl-none rounded-br-none"
        onSubmit={onSearch}
        size={InputSize.Large}
      />
      <SearchFilter filters={searchFilter} setFilters={setSearchFilter} />
    </div>
  );
}
