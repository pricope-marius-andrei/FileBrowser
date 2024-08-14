import { Transition } from "@headlessui/react";
import { useState } from "react";
import { openPath } from "../../utils/treeNavigation";



export const FilteredItem = ({data}:any) => {
  const [showActionsPopover, setShowActionsPopover] = useState(false);
  const currentPath:string = data.path;
  // const reduxFileBrowserData = useSelector((state:RootState) => state.fileBrowser);
  // const localStorageFileBrowserData = localStorage.getItem("fileBrowserData");
  // const fileBrowserData =  localStorageFileBrowserData ? JSON.parse(localStorageFileBrowserData) : reduxFileBrowserData;
  
  
  // const {setActivePath, setCurrentItem} = useContext(FileBrowserContext);

  const handleClickItem = () => {
      // const treeViewRoot = document.getElementById('treeViewRoot');
      openPath(currentPath);
  }

  return (
    <div
        onMouseEnter={() => setShowActionsPopover(true)}
        onMouseLeave={() => setShowActionsPopover(false)}
        onClick={handleClickItem}
    >
        <div className="cursor-pointer w-64 relative p-2 bg-gray-700 hover:bg-slate-500">
            {data.isFolder  ? '📁' : '📄'} {data.name}
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
