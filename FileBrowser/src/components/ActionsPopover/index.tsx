import { Popover } from '@headlessui/react';
import { useContext, useState } from "react";
import { FileBrowserContext } from '../../contexts/fileBrowserContext';
import NewFileModal from '../FileBrowser/TreeView/File/NewFileModal';

export default function ActionsPopover({setShowActionsPopover , path}:any) {
 const [showNewFileModal, setShowNewFileModal] = useState(false);
  const {setActivePath} = useContext(FileBrowserContext);
  return (
    <Popover
           onMouseEnter={() => setShowActionsPopover(true)}
           onMouseLeave={() => setShowActionsPopover(false)}
           className="absolute flex flex-col -translate-x-full -translate-y-1/2 gap-1"
         >
           <Popover.Panel
             static
             className="relative z-10 text-sm text-black bg-white rounded hover:scale-110"
             onClick={()=>{setShowNewFileModal(true); setActivePath(path)}}
           >
                ➕📄
            <NewFileModal isOpen={showNewFileModal} setIsOpen={setShowNewFileModal}/> 
           </Popover.Panel>
         
           <Popover.Panel
             static
             className="relative z-10 text-sm text-black bg-white rounded hover:scale-110"
           >
            ➜🗑️
           </Popover.Panel>
         </Popover>
  );
}
