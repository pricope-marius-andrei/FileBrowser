import { TabPanel } from '@headlessui/react'
import { useContext, useEffect } from 'react';
import { FileBrowserContext } from '../../../../contexts/fileBrowserContext';
import { FolderHierachyTable } from '../FolderHierarchyTable';

interface ViewPanelProps {
  kind: "file" | "folder";
}

export const ViewPanel = ({kind}:ViewPanelProps) => {

  const {currentItem} = useContext(FileBrowserContext);
  return (
      <TabPanel className="m-10 p-2">
      {
        kind === "file" ?
        <div>
          {currentItem?.content}
        </div>
        :
        <FolderHierachyTable
          data={currentItem?.items}
        />
      }
      </TabPanel>
    
  )
}
