import { Disclosure } from "@headlessui/react";
import { useContext, useState } from "react";
import { File } from "../File";
import { FileBrowserContext } from "../../../../contexts/fileBrowserContext";
import { getActiveItem } from "../../../../utils/treeNavigation";
import ActionsPopover from "../../../ActionsPopover";

export const Folder = ({ name, path, items }: any) => {
  const { setActivePath, setCurrentItem } = useContext(FileBrowserContext);
  const localStorageFileBrowserData = localStorage.getItem("fileBrowserData");
  const fileBrowserData = localStorageFileBrowserData
    ? JSON.parse(localStorageFileBrowserData)
    : null;

  const [showActionsPopover, setShowActionsPopover] = useState(false);

  return (
    <Disclosure>
      {({ open }) => (
        <div className="relative">
          <Disclosure.Button
            className="flex items-center"
            onClick={() => {
              setActivePath(path);
              setCurrentItem(getActiveItem(fileBrowserData, path));
            }}
            onMouseEnter={() => setShowActionsPopover(true)}
            onMouseLeave={() => setShowActionsPopover(false)}
          >
            {open ? "📂" : "📁"} {name}
          </Disclosure.Button>

          {showActionsPopover && (
           <ActionsPopover setShowActionsPopover={setShowActionsPopover} path={path}/>
          )}

          <Disclosure.Panel className="ml-4">
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
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};