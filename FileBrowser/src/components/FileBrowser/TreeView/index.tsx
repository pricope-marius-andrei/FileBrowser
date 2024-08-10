import { Folder } from "./Folder"
import { File } from "./File";
export const TreeView = () => {
    const localStorageFileBrowserData = localStorage.getItem("fileBrowserData");
    const fileBrowserData = localStorageFileBrowserData ? JSON.parse(localStorageFileBrowserData) : null;
  return (
    <>
        <div className="flex items-start flex-col">
            {
                fileBrowserData.map((treeViewElement:any) => 
                    treeViewElement.kind === "folder" ? <Folder path={treeViewElement.path} name={treeViewElement.name} items={treeViewElement.items}/> : <File path={treeViewElement.path} name={treeViewElement.name}/>  
                )
            }
        </div>
    </>
  )
}
