import { useContext } from 'react'
import { FileBrowserContext } from '../../../contexts/fileBrowserContext'
import { TabGroup, TabList, TabPanels } from '@headlessui/react';
import { StylesTab } from './StyledTab';
import { ViewPanel } from './ViewPanel';
import { EditorPanel } from './EditorPanel';

export const ViewItem = () => {
    const {activePath, currentItem} = useContext(FileBrowserContext);
    const currentItemKind = currentItem?.kind;

  return (
    <div className='flex h-screen grow p-5'>
        <div className='flex justify-between items-center grow h-28 '>
          <TabGroup className="grow h-20" manual>
            <div className='flex justify-between'>
              <h1>
                  {activePath}
              </h1>
              {
                currentItemKind === "file" &&
                <TabList className="self-end bg-slate-600 rounded-xl">
                  <StylesTab>View</StylesTab>
                  <StylesTab>Editor</StylesTab>
                </TabList>
              }
            </div>
            {
              currentItemKind === "file" ?
              <TabPanels>
                <ViewPanel kind={currentItemKind}/>
                <EditorPanel/>   
              </TabPanels>
              :
              <TabPanels>
                <ViewPanel kind={currentItemKind}/> 
              </TabPanels>
            }
          </TabGroup>
        </div>

    </div>
  )
}
