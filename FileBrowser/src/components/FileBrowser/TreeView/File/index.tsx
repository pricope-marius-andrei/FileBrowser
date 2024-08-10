import { DisclosurePanel } from "@headlessui/react"
import { useContext } from "react";
import { FileBrowserContext } from "../../../../contexts/fileBrowserContext";

export const File = ({name, path}:any) => {

    const {setActivePath} = useContext(FileBrowserContext);
  return (
    <DisclosurePanel onClick={()=>{setActivePath(path)}} className="ml-2 cursor-pointer">
        📄{name}
    </DisclosurePanel>
  )
}
