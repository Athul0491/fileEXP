import { atom } from "jotai";
import { ContextMenuType } from "../types";

interface ContextMenuState {
  currentContextMenu: ContextMenuType;
  mouseX: number;
  mouseY: number;
}
export const contextMenuAtom = atom<ContextMenuState>({
  currentContextMenu: ContextMenuType.None,
  mouseX: 0,
  mouseY: 0,
});

const updateContextMenuAtom = (contextMenu:ContextMenuState, newContextMenu:ContextMenuState) => {
  contextMenu.currentContextMenu = newContextMenu.currentContextMenu;
  contextMenu.mouseX = newContextMenu.mouseX;
  contextMenu.mouseY = newContextMenu.mouseY;
}

// TODO: figure out how to do this with jotai