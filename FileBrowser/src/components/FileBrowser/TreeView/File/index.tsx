import { DisclosurePanel } from "@headlessui/react"
import { readFileContent } from "../../../../utils/fileOperations"

export const File = ({name, path}:any) => {

    // const getFileContent = async () => {
    //     const content = await readFileContent(path);
    //     console.log(content);
    // }
  return (
    <DisclosurePanel onClick={()=>{}} className="ml-2 cursor-pointer">
        📄{name}
    </DisclosurePanel>
  )
}
