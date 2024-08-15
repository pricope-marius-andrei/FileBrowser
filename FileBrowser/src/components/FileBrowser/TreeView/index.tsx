import { Folder } from "./Folder"
import { File } from "./File";
import { useSelector } from "react-redux";
import { FileSystemItem } from "../../../types/FileBrowserTypes";
import { RootState } from "../../../state/store";
import data from "../../../data/data.json"
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { FilteredItem } from "../../FilteredItem";

export const TreeView = () => {
    const fileBrowserData = useSelector((state:RootState) => state.fileBrowser);
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState(fileBrowserData);

    if(localStorage.getItem("fileBrowserData") === null)
    {
        localStorage.setItem("fileBrowserData", JSON.stringify(data));
    }

    useEffect(() => {
        // setData(filteredData);
        console.log("Filtered Data: ");
        console.log(filteredData);
    },[filteredData]);
    
    return (
        <div className="mr-10">
            <SearchBar rawData={fileBrowserData} setFilteredData={setFilteredData}/>
            <div>
                <div className="absolute bottom-0 z-20">
                { 
                    filteredData.length > 0 &&
                    filteredData.map((treeViewElement:any) => 
                        <FilteredItem key={treeViewElement.path} data={treeViewElement}/>)
                }
                </div>
                <div className="flex pl-10 py-7 w-52 no-scrollbar overflow-auto grow items-start flex-col">
                {
                    fileBrowserData.map((treeViewElement: FileSystemItem) => 
                        treeViewElement.kind === "folder" ? 
                        <Folder key={treeViewElement.name} path={treeViewElement.path} name={treeViewElement.name} items={treeViewElement.items}/> :
                        <File  key={treeViewElement.name} path={treeViewElement.path} name={treeViewElement.name}/>  
                    )
                }
                </div>
            </div>
        </div>
  )
}
