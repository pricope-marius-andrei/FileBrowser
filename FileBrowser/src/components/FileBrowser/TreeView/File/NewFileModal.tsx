import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import { FileBrowserContext } from '../../../../contexts/fileBrowserContext';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../../state/fileBrowserSlice';
import { FileTypes } from '../../../../types/FileBrowserTypes';
import SelectNewFileType from './SelectNewFileType';
import { NameInput } from './NameInput';

export default function NewFileModal({isOpen, setIsOpen}:{isOpen:boolean, setIsOpen: (value: boolean) => void}) {
  const dispatch = useDispatch();
  const {activePath,setActivePath} = useContext(FileBrowserContext);
  const [newFileName, setNewFileName] = useState('');
  const [newFileType, setNewFileType] = useState<FileTypes>('TXT');
  const [uploadedFile, setUploadedFile] = useState('');
  
  function handleCreateNewFile() {
    if(uploadedFile) localStorage.setItem(activePath + '/' + newFileName, uploadedFile);
    
    dispatch(addItem({ 
      activePath, 
      newItem: { 
        name: newFileName.trim(), 
        path: activePath + '/' + newFileName, 
        kind: "file", 
        type: newFileType 
      } 
    }));
    setActivePath(activePath+'/'+newFileName);
    setIsOpen(false);
  }
  
  function closeModal() {
    setIsOpen(false);
  }
  
  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add a file to {activePath} folder
                  </DialogTitle>
                  <SelectNewFileType newFileType={newFileType} setNewFileType={setNewFileType} setUploadedFile={setUploadedFile}/>
                  <NameInput newFileName={newFileName} setNewFileName={setNewFileName}/>
                  <div className="mt-4">
                    <button
                    disabled={newFileName.trim() === ''}
                    type="button"
                      className={`inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2  ${newFileName.trim() === '' ? 'cursor-not-allowed ' : ''}`}
                      onClick={handleCreateNewFile}
                    >
                      Create New File!
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}


