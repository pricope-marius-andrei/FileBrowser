import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import { FileBrowserContext } from '../../../../contexts/fileBrowserContext';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../../state/fileBrowserSlice';
import { NameInput } from './NameInput';

interface NewFolderModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function NewFolderModal({isOpen, setIsOpen}:NewFolderModalProps) {
  const dispatch = useDispatch();
  const {activePath,setActivePath} = useContext(FileBrowserContext);
  const [newFolderName, setNewFolderName] = useState('');
  function handleCreateNewFolder() {
    dispatch(addItem({ activePath , newItem: { name: newFolderName.trim(), path: activePath + '/' + newFolderName, kind: "folder", items:[] } }))
    setActivePath(activePath+'/'+newFolderName);
    setIsOpen(false)
  }
  function closeModal() {
    setIsOpen(false)
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
                    Craete a folder in {activePath} folder
                  </DialogTitle>
                  <NameInput newFolderName={newFolderName} setNewFolderName={setNewFolderName}/>
                  <div className="mt-4">
                    <button
                    disabled={newFolderName.trim() === ''}
                      type="button"
                      className={`inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2  ${newFolderName.trim() === '' ? 'cursor-not-allowed ' : ''}`}
                      onClick={handleCreateNewFolder}
                    >
                      Create New Folder!
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




