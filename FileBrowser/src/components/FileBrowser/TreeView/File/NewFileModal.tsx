import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'

export default function NewFileModal({isOpen, setIsOpen}) {
  const dispatch = useDispatch();
  const {activePath} = useContext(FileBrowserContext);
  const [newFileName, setNewFileName] = useState('');
  const [newFileType, setNewFileType] = useState('TXT');
  function handleCreateNewFile() {
    dispatch(addItem({ activePath , newItem: { name: newFileName.trim(), path: activePath + '/' + newFileName, kind: "file", type: newFileType } }))

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
                    Add a file to {activePath} folder
                  </Dialog.Title>
                  <SelectNewFileType newFileType={newFileType} setNewFileType={setNewFileType} />
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}


import { Radio, RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const types = ['TXT','JSON']

function SelectNewFileType({newFileType, setNewFileType}) {
  return (
    <div className="w-full px-4">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup  value={newFileType} onChange={setNewFileType} aria-label="Server size" className="space-y-2">
          {types.map((type) => (
            <Radio
              key={type}
              value={type}
              className="group relative flex cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
            >
              <div className="flex w-full items-center justify-between">
                <div className="text-sm/6">
                  <p className="font-semibold text-black">{type}</p>
                </div>
                <CheckCircleIcon className="size-6 fill-green-400 opacity-0 transition group-data-[checked]:opacity-100" />
              </div>
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

import { Description, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { FileBrowserContext } from '../../../../contexts/fileBrowserContext';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../../state/fileBrowserSlice';

function NameInput({newFileName, setNewFileName}) {
  const handleInputChange = (event) => {
    setNewFileName(event.target.value);
  };

  return (
    <div className="w-full max-w-md px-4">
      <Field>
        <Label className="text-sm/6 font-medium text-white">File Name</Label>
        <Description className="text-sm/6 text-black/50">Use your real name so people will recognize you.</Description>
        <Input

          className={clsx(
            'mt-3 block w-full rounded-lg border border-stone-100  py-1.5 px-3 text-sm/6 text-black/75',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
          )}
          value={newFileName} 
          onChange={handleInputChange}
        />
      </Field>
    </div>
  )
}
