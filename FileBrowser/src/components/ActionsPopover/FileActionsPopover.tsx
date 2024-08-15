import { Popover, PopoverPanel } from '@headlessui/react';
import { useContext, useState } from "react";
import ConfirmDeleteModal from '../Modals/ConfirmDeleteModal';
import { FileBrowserContext } from '../../contexts/fileBrowserContext';

interface FileActionsPopoverProps {
  setShowActionsPopover: (value: boolean) => void;
  path: string;
}

export default function FileActionsPopover({setShowActionsPopover , path}:FileActionsPopoverProps) {
  const {setActivePath} = useContext(FileBrowserContext);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  
  return (
    <Popover
           onMouseEnter={() => setShowActionsPopover(true)}
           onMouseLeave={() => setShowActionsPopover(false)}
           className="absolute -translate-x-full"
         >
           <PopoverPanel
             static
             className="relative z-10 text-sm text-black bg-white rounded hover:scale-110 cursor-pointer"
             onClick={()=>{setShowConfirmDeleteModal(true); setActivePath(path)}}
           >
            ➜🗑️
            {showConfirmDeleteModal && (<ConfirmDeleteModal showConfirmDeleteModal={showConfirmDeleteModal} setShowConfirmDeleteModal={setShowConfirmDeleteModal} path={path}/>)}
           </PopoverPanel>
         </Popover>
  );
}
