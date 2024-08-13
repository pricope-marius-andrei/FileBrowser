import { Popover } from '@headlessui/react';
import {  useContext } from "react";
import { FileBrowserContext } from '../../contexts/fileBrowserContext';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../state/fileBrowserSlice';

export default function FileActionsPopover({setShowActionsPopover , path}:any) {
  const dispatch = useDispatch();
  const {setActivePath} = useContext(FileBrowserContext);

  const handleDeleteFile = () => {
    setActivePath(path.split("/").slice(0, -1).join("/"))
    setShowActionsPopover(false);
    dispatch(deleteItem({path}));
  }
  
  return (
    <Popover
           onMouseEnter={() => setShowActionsPopover(true)}
           onMouseLeave={() => setShowActionsPopover(false)}
           className="absolute -translate-x-full"
         >
          {/* mby rename, clone, move file */}
           <Popover.Panel
             static
             className="relative z-10 text-sm text-black bg-white rounded hover:scale-110 cursor-pointer"
             onClick={()=>handleDeleteFile()}
           >
            ➜🗑️
           </Popover.Panel>
         </Popover>
  );
}
