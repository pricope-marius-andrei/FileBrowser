import { FileBrowserContext } from '../../contexts/fileBrowserContext'
import { TreeView } from './TreeView'
import { useEffect, useState } from 'react'
import data from "../../data/data.json"
import { ViewItem } from '../ViewItem'

export const FileBrowser = () => {
    const [activePath, setActivePath] = useState("");
 
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
