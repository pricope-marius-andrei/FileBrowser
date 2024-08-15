import { Popover, PopoverPanel } from '@headlessui/react';
import {  useContext } from "react";
import { FileBrowserContext } from '../../contexts/fileBrowserContext';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../state/fileBrowserSlice';

interface FileActionsPopoverProps {
  setShowActionsPopover: (value: boolean) => void;
  path: string;
}

export default function FileActionsPopover({setShowActionsPopover , path}:FileActionsPopoverProps) {
  const dispatch = useDispatch();
  const {setActivePath, currentItem} = useContext(FileBrowserContext);

  const handleDeleteFile = () => {
    setActivePath(path.split("/").slice(0, -1).join("/"))
    setShowActionsPopover(false);
    dispatch(deleteItem({path}));

    if(currentItem.type === 'PNG')
      localStorage.removeItem(currentItem.path);
  }
  
  return (
    <Popover
           onMouseEnter={() => setShowActionsPopover(true)}
           onMouseLeave={() => setShowActionsPopover(false)}
           className="absolute -translate-x-full"
         >
           <PopoverPanel
             static
             className="relative z-10 text-sm text-black bg-white rounded hover:scale-110 cursor-pointer"
             onClick={()=>handleDeleteFile()}
           >
            ➜🗑️
           </PopoverPanel>
         </Popover>
  );
}
