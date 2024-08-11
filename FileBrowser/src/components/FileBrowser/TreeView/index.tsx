import { Folder } from "./Folder"
import { File } from "./File";
import { useContext } from "react";
import { FileBrowserContext } from "../../../contexts/fileBrowserContext";
import {addItem} from '../../../state/fileBrowserSlice'
import { useDispatch, useSelector } from "react-redux";
import { FileSystemItem } from "../../../types/FileBrowserTypes";
import { RootState } from "../../../state/store";

export const TreeView = () => {
    const dispatch = useDispatch();
    const fileBrowserData = useSelector((state:RootState) => state.fileBrowser);
    const {activePath} = useContext(FileBrowserContext);
  return (
    <>
        <div className="flex items-start flex-col">
            {
                fileBrowserData.map((treeViewElement : FileSystemItem) => 
                    treeViewElement.kind === "folder" ? <Folder path={treeViewElement.path} name={treeViewElement.name} items={treeViewElement.items}/> : <File path={treeViewElement.path} name={treeViewElement.name}/>  
                )
            }
            <button onClick={()=>dispatch(addItem({ activePath , newItem: { name: "puiut", path: "src/data/public/puiut.txt", kind: "file", type: "TXT" } }))}>Add new item</button>
        </div>
    </>
  )
}
