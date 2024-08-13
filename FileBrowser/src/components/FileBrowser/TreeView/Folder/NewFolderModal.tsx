import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'

export default function NewFolderModal({isOpen, setIsOpen}) {
  const dispatch = useDispatch();
  const {activePath} = useContext(FileBrowserContext);
  const [newFolderName, setNewFolderName] = useState('');
  function handleCreateNewFolder() {
    dispatch(addItem({ activePath , newItem: { name: newFolderName.trim(), path: activePath + '/' + newFolderName, kind: "folder", items:[] } }))

    setIsOpen(false)
  }
  function closeModal() {
    setIsOpen(false)
  }
  return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Craete a folder in {activePath} folder
                  </Dialog.Title>
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}

import { Description, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { FileBrowserContext } from '../../../../contexts/fileBrowserContext';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../../state/fileBrowserSlice';

function NameInput({newFolderName, setNewFolderName}) {
  const handleInputChange = (event) => {
    setNewFolderName(event.target.value);
  };

  return (
    <div className="w-full max-w-md px-4">
      <Field>
        <Label className="text-sm/6 font-medium text-white">Folder Name</Label>
        {/* <Description className="text-sm/6 text-black/50"></Description> */}
        <Input

          className={clsx(
            'mt-3 block w-full rounded-lg border border-stone-100  py-1.5 px-3 text-sm/6 text-black/75',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
          )}
          value={newFolderName} 
          onChange={handleInputChange}
        />
      </Field>
    </div>
  )
}
