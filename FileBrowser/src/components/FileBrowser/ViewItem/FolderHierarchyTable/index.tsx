import { useContext, useEffect, useState } from 'react'
import { FileSystemItem, FolderItem } from '../../../../types/FileBrowserTypes'
import { FileBrowserContext } from '../../../../contexts/fileBrowserContext';

interface FolderHierachyTableProps {
    data: FolderItem[] | null;
} 

export const FolderHierachyTable = ({data}:FolderHierachyTableProps) => {

    const {setActivePath, setCurrentItem, currentItemRef} = useContext(FileBrowserContext);
    const [clickedItem, setClickedItem] = useState(false);
   

    const handleOpenItem = (item:FileSystemItem) => {
        setActivePath(item.path);
        setCurrentItem(item);
        setClickedItem(true);
    }


    useEffect(() => {
        if(clickedItem) {
            currentItemRef?.current.click();
            setClickedItem(false);
        }
    }, [currentItemRef]);
    
  return (
    <div className='flex flex-col grow rounded-lg border-white border-[1px]'>
        <div className='grid grid-cols-2 rounded-t-lg p-2 bg-gray-900'>
            <div>Name</div>
            <div>Extention</div>
        </div>
        <div className='rounded-b-lg overflow-hidden'>
        {
            data?.map((item:any) => 
                <div key={item.name}>
                    <hr></hr>
                    <div className='bg-gray-800 hover:bg-gray-700 grid grid-cols-2 p-4 cursor-pointer'>
                        <div onClick={() => handleOpenItem(item)} className='hover:underline'>{item.name}</div>
                        <div>{item.type}</div>
                    </div>
                </div>
            )

        }
        </div>
  </div>
  )
}
