import { useContext } from 'react';
import { FileBrowserContext } from '../../../contexts/fileBrowserContext';
import { TabGroup, TabList, TabPanels } from '@headlessui/react';
import { StylesTab } from './StyledTab';
import { ViewPanel } from './ViewPanel';
import { EditorPanel } from './EditorPanel';
import ViewImage from './ViewImage';

export const ViewItem = () => {
    const { activePath, currentItem } = useContext(FileBrowserContext);
    const currentItemKind = currentItem?.kind;
    const currentItemType = currentItem?.type;  
    
    return (
        <div className='flex h-screen grow p-5'>
            <div className='flex justify-between items-center grow h-28'>
                    <TabGroup className="grow h-20" manual>
                        <div className='flex justify-between'>
                            <h1>{activePath}</h1>
                            {currentItemKind === "file" && currentItemType !== "PNG" && (
                                <TabList className="self-end bg-slate-600 rounded-xl">
                                    <StylesTab>View</StylesTab>
                                    <StylesTab>Editor</StylesTab>
                                </TabList>
                            )}
                        </div>
                        <div className='mt-4'>
                            {currentItemKind === "file" && currentItemType !== "PNG" && (
                                <TabPanels>
                                    <ViewPanel kind={currentItemKind} />
                                    <EditorPanel />
                                </TabPanels>
                            )}
                            {currentItemKind === "folder" && (
                                <TabPanels>
                                    <ViewPanel kind={currentItemKind} />
                                </TabPanels>
                            )}
                            {currentItemKind === "file" && currentItemType === "PNG" && (
                                <ViewImage />
                            )}
                        </div>
                    </TabGroup>
            </div>
        </div>
    );
};
