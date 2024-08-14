import { FileBrowserContext } from '../../contexts/fileBrowserContext'
import { TreeView } from './TreeView'
import {useEffect, useState } from 'react'
import { ViewItem } from './ViewItem'
import { getActiveItem } from '../../utils/treeNavigation'

export const FileBrowser = () => {
    const [activePath, setActivePath] = useState('root/public');
    const [currentItem, setCurrentItem] = useState({});


    useEffect(() => {
      const fileBrowserData = JSON.parse(localStorage.getItem("fileBrowserData"));
        setCurrentItem(getActiveItem(fileBrowserData, activePath));
    }, [activePath]);
    
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
