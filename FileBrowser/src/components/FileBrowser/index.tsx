import { FileBrowserContext } from '../../contexts/fileBrowserContext'
import { TreeView } from './TreeView'
import {useEffect, useState } from 'react'
import { ViewItem } from './ViewItem'
import { getActiveItem } from '../../utils/treeNavigation'
import { FileSystemItem } from '../../types/FileBrowserTypes'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'

export const FileBrowser = () => {
    const reduxFileBrowserData = useSelector((state:RootState) => state.fileBrowser);
    const [activePath, setActivePath] = useState<string>('root/public');
    const [currentItem, setCurrentItem] = useState<FileSystemItem>({} as FileSystemItem);

    useEffect(() => {
      const localStorageFileBrowserData = localStorage.getItem("fileBrowserData");
      const fileBrowserData = localStorageFileBrowserData ? JSON.parse(localStorageFileBrowserData as string) : reduxFileBrowserData ;
      const activeItem = getActiveItem(fileBrowserData, activePath) as FileSystemItem;
      setCurrentItem(activeItem);
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
