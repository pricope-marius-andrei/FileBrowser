import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { useContext, useState } from "react";
import { File } from "../File";
import { FileBrowserContext } from "../../../../contexts/fileBrowserContext";
import { getActiveItem } from "../../../../utils/treeNavigation";
import ActionsPopover from "../../../ActionsPopover";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";

export const Folder = ({name, path, items }: any) => {
  const { setActivePath, setCurrentItem } = useContext(FileBrowserContext);
  const reduxFileBrowserData = useSelector((state:RootState) => state.fileBrowser);
  
  const localStorageFileBrowserData = localStorage.getItem("fileBrowserData");
  const fileBrowserData = localStorageFileBrowserData
    ? JSON.parse(localStorageFileBrowserData)
    : reduxFileBrowserData;

  const [showActionsPopover, setShowActionsPopover] = useState(false);

  return (
    <Disclosure>
      {({ open }) => (
        <div className="relative">
          <DisclosureButton
            className="flex items-center"
            onClick={() => {
              setActivePath(path);
              setCurrentItem(getActiveItem(fileBrowserData, path));
            }}
            onMouseEnter={() => setShowActionsPopover(true)}
            onMouseLeave={() => setShowActionsPopover(false)}
          >
            {open ? "📂" : "📁"} {name}
          </DisclosureButton>

          {showActionsPopover && (
           <ActionsPopover setShowActionsPopover={setShowActionsPopover} path={path}/>
          )}

          <DisclosurePanel className="ml-4">
            {items.map((element: any) => {
              return element.kind === "folder" ? (
                <Folder
                  key={element.path}
                  path={element.path}
                  name={element.name}
                  items={element.items}
                />
              ) : (
                <File key={element.path} name={element.name} path={element.path} />
              );
            })}
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
};