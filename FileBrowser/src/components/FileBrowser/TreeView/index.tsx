import { Folder } from "./Folder"
import { File } from "./File";
import { useContext } from "react";
import { FileBrowserContext } from "../../../contexts/fileBrowserContext";

export const TreeView = () => {
    const {initialDataFileBrowserContext} = useContext(FileBrowserContext);
  return (
    <>
        <div className="flex items-start flex-col">
            {
                initialDataFileBrowserContext.map((treeViewElement:any) => 
                    treeViewElement.kind === "folder" ? <Folder path={treeViewElement.path} name={treeViewElement.name} items={treeViewElement.items}/> : <File path={treeViewElement.path} name={treeViewElement.name}/>  
                )
            }
        </div>
    </>
  )
}
