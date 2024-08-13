import { Folder } from "./Folder"
import { File } from "./File";
import { useSelector } from "react-redux";
import { FileSystemItem } from "../../../types/FileBrowserTypes";
import { RootState } from "../../../state/store";
import data from "../../../data/data.json"

export const TreeView = () => {
    const fileBrowserData = useSelector((state:RootState) => state.fileBrowser);
    

    if(localStorage.getItem("fileBrowserData") === null)
    {
        localStorage.setItem("fileBrowserData", JSON.stringify(data));
    }
    return (
        <div className="flex w-52 overflow-auto items-start flex-col p-8">
        {
            fileBrowserData.map((treeViewElement : FileSystemItem) => 
                treeViewElement.kind === "folder" ? 
                <Folder key={treeViewElement.name} path={treeViewElement.path} name={treeViewElement.name} items={treeViewElement.items}/> :
                <File  key={treeViewElement.name} path={treeViewElement.path} name={treeViewElement.name}/>  
            )
        }
        </div>
  )
}
