import { FileBrowserContext } from '../../contexts/fileBrowserContext'
import { TreeView } from './TreeView'
import { useEffect, useState } from 'react'
import data from "../../data/data.json"
import { readFileContent } from '../../utils/fileOperations'

export const FileBrowser = () => {
  const [activePath, setActivePath] = useState("");
  const [initialDataFileBrowserContext, setInitialDataFileBrowserContext] = useState(data);

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
    <FileBrowserContext.Provider value={{activePath, setActivePath, initialDataFileBrowserContext}}>
        <TreeView/>
    </FileBrowserContext.Provider>
    </>
  )
}
