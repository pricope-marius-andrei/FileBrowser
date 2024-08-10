import { FileBrowserContext } from '../../contexts/fileBrowserContext'
import { TreeView } from './TreeView'
import { useEffect, useState } from 'react'
import data from "../../data/data.json"
import { readFileContent } from '../../utils/fileOperations'
import { ViewItem } from '../ViewItem'

export const FileBrowser = () => {
    const [activePath, setActivePath] = useState("");
    localStorage.setItem("fileBrowserData", JSON.stringify(data));
    
    useEffect(()=>{
    // const getFileContent = async () => {
    //     const content = await readFileContent(activePath);
    //     console.log(content);
    // }

    console.log(activePath);
    // getFileContent();
    },[activePath])
  return (
    <>
        <div className='flex'>
            <FileBrowserContext.Provider value={{activePath, setActivePath}}>
                <TreeView/>
                <ViewItem/>
            </FileBrowserContext.Provider>
        </div>
    </>
  )
}
