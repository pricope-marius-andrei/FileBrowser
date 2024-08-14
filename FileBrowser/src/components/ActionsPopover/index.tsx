import { Popover } from '@headlessui/react';
import { useContext, useState } from "react";
import { FileBrowserContext } from '../../contexts/fileBrowserContext';
import NewFileModal from '../FileBrowser/TreeView/File/NewFileModal';
import NewFolderModal from '../FileBrowser/TreeView/Folder/NewFolderModal';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../state/fileBrowserSlice';

export default function ActionsPopover({setShowActionsPopover , path}:any) {
  const dispatch = useDispatch();
 const [showNewFileModal, setShowNewFileModal] = useState(false);
 const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const {setActivePath} = useContext(FileBrowserContext);

  const handleDeleteFolder = () => {
    dispatch(deleteItem({path}))
    setActivePath(path.split("/").slice(0, -1).join("/"));
  }
  return (
    <Popover
           onMouseEnter={() => setShowActionsPopover(true)}
          // onMouseLeave={() => {console.log('here');setShowActionsPopover(false)}}
           className="absolute flex flex-col -translate-x-full -translate-y-2/3 gap-1"
         >
           <Popover.Panel
             static
             className="relative z-10 text-sm text-black bg-white rounded hover:scale-110 cursor-pointer"
             onClick={()=>{setShowNewFileModal(true); setActivePath(path)}}
           >
                ➕📄
            <NewFileModal isOpen={showNewFileModal} setIsOpen={setShowNewFileModal}/> 
           </Popover.Panel>

           <Popover.Panel
             static
             className="relative z-10 text-sm text-black bg-white rounded hover:scale-110 cursor-pointer"
             onClick={()=>{setShowNewFolderModal(true); setActivePath(path)}}
           >
                ➕📁
            <NewFolderModal isOpen={showNewFolderModal} setIsOpen={setShowNewFolderModal}/> 
           </Popover.Panel>
         
           <Popover.Panel
             static
             className="relative z-10 text-sm text-black bg-white rounded hover:scale-110 cursor-pointer"
             onClick={()=>handleDeleteFolder()}
           >
            ➜🗑️
           </Popover.Panel>
         </Popover>
  );
}
