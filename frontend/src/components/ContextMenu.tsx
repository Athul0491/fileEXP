import { ContextMenuState } from '../types';
import { contextMenuStateAtom, NO_CONTEXT_MENU } from "../store/store";
import { useAtom } from "jotai";

interface ContextMenuOption {
  name: string;
  onClick: Function;
}

interface Props {
  options: ContextMenuOption[];
}

export default function ContextMenu({ options }: Props) {
  const [contextMenuState, setContextMenuState] = useAtom(contextMenuStateAtom);
  const [{ mouseX, mouseY }] = useAtom<ContextMenuState>(contextMenuStateAtom);
    
  return (
    <div
      id="context-menu"
      className="bg-darker w-56"
      style={{
        position: "absolute",
        left: mouseX,
        top: mouseY,
      }}
    >
      {options.map((option, idx) => (
        <div key={idx}>
          <button
            onClick={() => {
              option.onClick();
              setContextMenuState(NO_CONTEXT_MENU);
            }}
            className="bg-darker hover:bg-gray-600 w-full"
          >
            {option.name}
          </button>
          <br />
        </div>
      ))}
    </div>
  );
}
