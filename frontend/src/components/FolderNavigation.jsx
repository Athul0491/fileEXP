import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function FolderNavigation({
  onBackArrowClick,
  canGoBackward,
  onForwardArrowClick,
  canGoForward,
}) {
  return (
    <div className="mb-5">
      <div className="space-x-4">
        <button onClick={onBackArrowClick} disabled={!canGoBackward}>
          <FaArrowLeft
            size={48}
            className={canGoBackward ? undefined : "text-gray-600"}
          />
        </button>

        <button onClick={onForwardArrowClick} disabled={!canGoForward}>
          <FaArrowRight
            size={48}
            className={canGoForward ? undefined : "text-gray-600"}
          />
        </button>
      </div>
    </div>
  );
}
