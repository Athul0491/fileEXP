import { atom } from "jotai";
import { ContextMenuType, ContextMenuState } from "../types";

export const contextMenuStateAtom = atom<ContextMenuState>({
  currentContextMenu: ContextMenuType.None,
  mouseX: 0,
  mouseY: 0,
});

export const NO_CONTEXT_MENU = {
  currentContextMenu: ContextMenuType.None,
  mouseX: 0,
  mouseY: 0,
};