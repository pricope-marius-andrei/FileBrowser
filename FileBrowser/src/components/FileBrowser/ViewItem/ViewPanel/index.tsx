import { TabPanel } from '@headlessui/react'
import { useContext } from 'react';
import { FileBrowserContext } from '../../../../contexts/fileBrowserContext';

export const ViewPanel = () => {

  const {currentItem} = useContext(FileBrowserContext);

  return (
    <TabPanel className="m-10 p-2">
        {currentItem?.content}
    </TabPanel>
  )
}
