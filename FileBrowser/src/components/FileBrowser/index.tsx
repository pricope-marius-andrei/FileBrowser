import { FileBrowserContext } from '../../contexts/fileBrowserContext'
import { TreeView } from './TreeView'
import {useEffect, useState } from 'react'
import { ViewItem } from './ViewItem'
import { getActiveItem } from '../../utils/treeNavigation'

export const FileBrowser = () => {
    const [activePath, setActivePath] = useState('src/data/public');
    const [currentItem, setCurrentItem] = useState({});
    const [currentItemRef,setCurrentItemRef] = useState(null);

    useEffect(() => {
      const fileBrowserData = JSON.parse(localStorage.getItem("fileBrowserData"));
        setCurrentItem(getActiveItem(fileBrowserData, activePath));
    }, [activePath]);
    
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
