import { FileBrowserContext } from '../../contexts/fileBrowserContext'
import { TreeView } from './TreeView'
import { useRef, useState } from 'react'
import { ViewItem } from './ViewItem'

export const FileBrowser = () => {
    const [activePath, setActivePath] = useState("");
    const [currentItem, setCurrentItem] = useState({});
    const [currentItemRef,setCurrentItemRef] = useState(null);
 
  return (
    <>
        <div className='flex bg-slate-800 font-normal text-white'>
            <FileBrowserContext.Provider value={{activePath, setActivePath, currentItem, setCurrentItem, currentItemRef,setCurrentItemRef}}>
                <TreeView/>
                <ViewItem/>
            </FileBrowserContext.Provider>
        </div>
    </>
  )
}
