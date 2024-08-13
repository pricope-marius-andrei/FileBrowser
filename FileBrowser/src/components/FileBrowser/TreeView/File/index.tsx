import { DisclosurePanel } from "@headlessui/react"
import { useContext } from "react";
import { FileBrowserContext } from "../../../../contexts/fileBrowserContext";
import { getActiveItem } from "../../../../utils/treeNavigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";

export const File = ({name, path}:any) => {

    const {setActivePath, setCurrentItem} = useContext(FileBrowserContext);
    const reduxFileBrowserData = useSelector((state:RootState) => state.fileBrowser);

    const localStorageFileBrowserData = localStorage.getItem("fileBrowserData");
    const fileBrowserData = localStorageFileBrowserData ? JSON.parse(localStorageFileBrowserData) : reduxFileBrowserData;

  return (
    <DisclosurePanel onClick={()=>{setActivePath(path); setCurrentItem(getActiveItem(fileBrowserData, path))}} className="cursor-pointer">
        📄{name}
    </DisclosurePanel>
  )
}
