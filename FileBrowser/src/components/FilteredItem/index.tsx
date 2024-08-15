import { useState } from "react";
import { openPath } from "../../utils/treeNavigation";
import { FileSystemItem } from "../../types/FileBrowserTypes";



export const FilteredItem = ({data}:{data:FileSystemItem}) => {
  const [showActionsPopover, setShowActionsPopover] = useState(false);
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
        </div>
        {
            showActionsPopover &&
            <div className="">
              {/* <Transition show={showActionsPopover} appear={true}>
                <div className="absolute bottom-0 bg-slate-500 p-2 bg-opacity-45 transition duration-300 ease-in data-[closed]:opacity-0">
                  {currentPath}
                </div>
              </Transition> */}
            </div>
        }
    </div>
  )
}
