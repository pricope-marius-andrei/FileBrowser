import { FileSystemItem, FolderItem } from "../types/FileBrowserTypes";

export const getActiveItem = (fileBrowserData: FolderItem[], activePath: string): FileSystemItem | undefined => {
  const activePathArray = activePath.split("/");
  const activeItemName = activePathArray[activePathArray.length - 1];
  const foldersToActiveItem =  activePathArray.slice(1, activePathArray.length - 1);

  let currentPathStep: FolderItem[] | undefined = fileBrowserData;
  foldersToActiveItem.forEach((field: string) => {
      currentPathStep = currentPathStep?.find((obj: FolderItem) => obj.name === field)?.items as FolderItem[];
  });

  return currentPathStep.find((obj: FileSystemItem) => obj.name === activeItemName);
};


export const openPath = async (path: string) => {
  const segments = path.split('/').slice(1);
  let currentElement = document.getElementById('treeViewRoot');

  if (!currentElement) {
    console.warn('TreeView root element not found');
    return;
  }

  const firstButton: HTMLButtonElement | undefined = Array.from(currentElement.querySelectorAll('button'))
    .find((btn:HTMLButtonElement) => btn.textContent?.includes(segments[0]));


  if (firstButton && firstButton.getAttribute('data-headlessui-state') === 'open') {
      firstButton.click();
  }


  for (const segment of segments) {

    let allButtons = Array.from(currentElement ? currentElement.querySelectorAll('button') : []);

    let button: any = allButtons.find((btn:any) => btn.textContent.includes(segment));

    if (button && button.getAttribute('data-headlessui-state') !== 'open') {
      await button.click();

      await new Promise(resolve => setTimeout(resolve, 0)); 

      currentElement = document.getElementById('treeViewRoot');
      allButtons = Array.from(currentElement ? currentElement.querySelectorAll('button') : []);

    }
  }
};
