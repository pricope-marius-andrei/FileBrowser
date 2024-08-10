import data from "../../../data/data.json"
import { Folder } from "./Folder"
import { File } from "./File";

export const TreeView = () => {
  return (
    <>
        <div className="flex items-start flex-col">
            {
                data.map((treeViewElement:any) => 
                    treeViewElement.kind === "folder" ? <Folder name={treeViewElement.name} items={treeViewElement.items}/> : <File path={treeViewElement.path} name={treeViewElement.name}/>  
                )
            }
        </div>
    </>
  )
}
