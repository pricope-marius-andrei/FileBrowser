import { FileBrowserContext } from '../../contexts/fileBrowserContext'
import { TreeView } from './TreeView'
import { useState } from 'react'
import { ViewItem } from './ViewItem'

export const FileBrowser = () => {
    const [activePath, setActivePath] = useState("");
    const [currentItem, setCurrentItem] = useState({});
 
  return (
    <>
        <div className='flex bg-slate-800 font-normal text-white'>
            <FileBrowserContext.Provider value={{activePath, setActivePath, currentItem, setCurrentItem}}>
                <div id='treeViewRoot' className='relative'>
                  <TreeView/>
                </div>
                <ViewItem/>
            </FileBrowserContext.Provider>
        </div>
    </>
  )
}
