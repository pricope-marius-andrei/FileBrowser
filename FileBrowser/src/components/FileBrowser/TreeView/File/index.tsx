import { DisclosurePanel } from "@headlessui/react"
import { useContext, useState } from "react";
import { FileBrowserContext } from "../../../../contexts/fileBrowserContext";
import { getActiveItem } from "../../../../utils/treeNavigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import FileActionsPopover from "../../../ActionsPopover/FileActionsPopover";

export const File = ({name, path}:{name: string, path: string }) => {
    const [showActionsPopover, setShowActionsPopover] = useState(false);
    const {setActivePath, setCurrentItem} = useContext(FileBrowserContext);

    const reduxFileBrowserData = useSelector((state:RootState) => state.fileBrowser);

    const localStorageFileBrowserData = localStorage.getItem("fileBrowserData");
    const fileBrowserData = localStorageFileBrowserData ? JSON.parse(localStorageFileBrowserData) : reduxFileBrowserData;

  return (
    <div>
       {showActionsPopover && (<FileActionsPopover setShowActionsPopover={setShowActionsPopover} path={path}/>)}
    <DisclosurePanel onClick={()=>{setActivePath(path); setCurrentItem(getActiveItem(fileBrowserData, path))}} className="cursor-pointer"
    onMouseEnter={() => setShowActionsPopover(true)}
            onMouseLeave={() => setShowActionsPopover(false)}
            >
        <div>📄{name}</div>
    </DisclosurePanel>
    </div>
  )
}
