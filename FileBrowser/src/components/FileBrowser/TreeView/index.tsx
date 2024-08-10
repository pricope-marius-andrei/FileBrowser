import { Folder } from "./Folder"
import { File } from "./File";
import { useContext } from "react";
import { FileBrowserContext } from "../../../contexts/fileBrowserContext";

export const TreeView = () => {
    const localStorageFileBrowserData = localStorage.getItem("fileBrowserData");
    const fileBrowserData = localStorageFileBrowserData ? JSON.parse(localStorageFileBrowserData) : null;
    const {activePath} = useContext(FileBrowserContext);

    const handleAddNewItem = () => {

        const folderFromPath = activePath.split("/");
        const fields = folderFromPath.slice(2,folderFromPath.lenght);

        let currentPathStep = fileBrowserData;
        fields.forEach((field:any)=> {
           console.log(field);
           currentPathStep = currentPathStep.find((obj:any) => obj.name === field).items;
        })

        currentPathStep.push( {"name":"puiut", "path": activePath + "/puiut.txt", "kind":"file", "type": "TXT"});

        localStorage.setItem("fileBrowserData",JSON.stringify(fileBrowserData))
        
        
        console.log(fields);
    }
  return (
    <>
        <div className="flex items-start flex-col">
            {
                fileBrowserData.map((treeViewElement:any) => 
                    treeViewElement.kind === "folder" ? <Folder path={treeViewElement.path} name={treeViewElement.name} items={treeViewElement.items}/> : <File path={treeViewElement.path} name={treeViewElement.name}/>  
                )
            }
            <button onClick={handleAddNewItem}>Add new item</button>
        </div>
    </>
  )
}
