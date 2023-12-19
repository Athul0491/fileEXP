import { useState } from "react";

export default function useSearchFilter() {
  const [extValue, setExtValue] = useState("");
  const [acceptFilesValue, setAcceptFilesValue] = useState(true);
  const [acceptDirsValue, setAcceptDirsValue] = useState(true);

  return {
    extValue,
    setExtValue,
    acceptFilesValue,
    setAcceptFilesValue,
    acceptDirsValue,
    setAcceptDirsValue,
  };
}
