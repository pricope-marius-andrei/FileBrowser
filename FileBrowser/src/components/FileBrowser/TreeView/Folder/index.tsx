import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { File } from "../File"

export const Folder = ({name, items}:any) => {

return (
    <Disclosure>
        <DisclosureButton>📁{name}</DisclosureButton>
        {
            items.map((element:any) => 
            {
                return element.kind === "folder" ? 
                <DisclosurePanel className="ml-2" key={element.name}>
                    <Folder name={element.name} items={element.items}/>
                </DisclosurePanel> : <File name={element.name} path={element.path}/>
                }
            )
        }
    </Disclosure>
  )
}
