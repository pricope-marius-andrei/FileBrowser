import { DisclosurePanel } from "@headlessui/react"
import { useContext } from "react";
import { FileBrowserContext } from "../../../../contexts/fileBrowserContext";
import { getActiveItem } from "../../../../utils/treeNavigation";

export const File = ({name, path}:any) => {

    const {activePath, setActivePath, setCurrentItem} = useContext(FileBrowserContext);

    const localStorageFileBrowserData = localStorage.getItem("fileBrowserData");
    const fileBrowserData = localStorageFileBrowserData ? JSON.parse(localStorageFileBrowserData) : null;

  return (
    <DisclosurePanel onClick={()=>{setActivePath(path), setCurrentItem(getActiveItem(fileBrowserData,path))}} className="ml-2 cursor-pointer">
        📄{name}
    </DisclosurePanel>
  )
}
