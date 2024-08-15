import { DisclosurePanel } from "@headlessui/react"
import { useContext, useState } from "react";
import { FileBrowserContext } from "../../../../contexts/fileBrowserContext";
import { getActiveItem } from "../../../../utils/treeNavigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import FileActionsPopover from "../../../ActionsPopover/FileActionsPopover";
import { FileSystemItem, FolderItem } from "../../../../types/FileBrowserTypes";

interface FileProps {
    name: string;
    path: string;
}

export const File = ({name, path}:FileProps) => {
    const [showActionsPopover, setShowActionsPopover] = useState<boolean>(false);
    const {setActivePath, setCurrentItem} = useContext(FileBrowserContext);

    const reduxFileBrowserData : FileSystemItem[] = useSelector((state:RootState) => state.fileBrowser);
    const localStorageFileBrowserData : string | null = localStorage.getItem("fileBrowserData");
    const fileBrowserData : FileSystemItem[] = localStorageFileBrowserData ? JSON.parse(localStorageFileBrowserData) : reduxFileBrowserData;

  return (
    <div>
      {showActionsPopover && (<FileActionsPopover setShowActionsPopover={setShowActionsPopover} path={path}/>)}
      <DisclosurePanel 
        className="cursor-pointer"
        onClick={()=> {
          setActivePath(path);
          setCurrentItem(getActiveItem(fileBrowserData as FolderItem[], path))
        }} 
        onMouseEnter={() => setShowActionsPopover(true)}
        onMouseLeave={() => setShowActionsPopover(false)}>
          <div>📄{name}</div>
      </DisclosurePanel>
    </div>
  )
}
