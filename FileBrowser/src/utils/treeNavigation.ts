import { FileSystemItem, FolderItem } from "../types/FileBrowserTypes";

export const getActiveItem = (fileBrowserData: FolderItem[], activePath: string): FileSystemItem | undefined => {
  const activePathArray = activePath.split("/");
  const activeItemName = activePathArray[activePathArray.length - 1];
  const foldersToActiveItem = activePathArray.slice(2, activePathArray.length - 1);

  let currentPathStep: FolderItem[] | undefined = fileBrowserData;
  foldersToActiveItem.forEach((field: string) => {
      currentPathStep = currentPathStep?.find((obj: FolderItem) => obj.name === field)?.items as FolderItem[];
  });

  return currentPathStep.find((obj: FileSystemItem) => obj.name === activeItemName);
};