import { useState } from "react";
import { openPath } from "../../utils/treeNavigation";
import { FileSystemItem } from "../../types/FileBrowserTypes";
import { Transition } from "@headlessui/react";

interface FilteredItemProps {
  data: FileSystemItem;
}

export const FilteredItem = ({data}:FilteredItemProps) => {
  const [showActionsPopover, setShowActionsPopover] = useState<boolean>(false);
  const currentPath:string = data.path;

  const handleClickItem = () => {
      openPath(currentPath);
  }

  return (
    <div
        onMouseEnter={() => setShowActionsPopover(true)}
        onMouseLeave={() => setShowActionsPopover(false)}
        onClick={handleClickItem}
    >
        <div className="cursor-pointer w-64 relative p-2 bg-gray-700 hover:bg-slate-500">
            {data.kind==='folder'  ? '📁' : '📄'} {data.name}
            {
              showActionsPopover &&
              <div className="">
                <Transition show={showActionsPopover} appear={true}>
                  <div className="absolute bottom-0 bg-slate-500 p-2 transition duration-300 ease-in data-[closed]:opacity-0">
                    {currentPath}
                  </div>
                </Transition>
              </div>
          }
        </div>
    </div>
  )
}
