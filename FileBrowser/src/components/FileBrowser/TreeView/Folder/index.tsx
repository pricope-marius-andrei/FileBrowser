import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { File } from "../File"
import { useContext } from "react"
import { FileBrowserContext } from "../../../../contexts/fileBrowserContext"
export const Folder = ({name, path, items}:any) => {

    const {setActivePath} = useContext(FileBrowserContext);

return (
    <Disclosure>
        <DisclosureButton onClick={()=>(setActivePath(path))}>📁{name}</DisclosureButton>
        {
            items.map((element:any) => 
            {
                return element.kind === "folder" ? 
                <DisclosurePanel className="ml-2" key={element.name}>
                    <Folder path={element.path} name={element.name} items={element.items}/>
                </DisclosurePanel> : <File name={element.name} path={element.path}/>
                }
            )
        }
    </Disclosure>
  )
}
