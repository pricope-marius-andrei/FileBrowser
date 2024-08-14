import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'

export default function NewFileModal({isOpen, setIsOpen}) {
  const dispatch = useDispatch();
  const {activePath,setActivePath} = useContext(FileBrowserContext);
  const [newFileName, setNewFileName] = useState('');
  const [newFileType, setNewFileType] = useState('TXT');
  const [uploadedFile, setUploadedFile] = useState(null);

function handleCreateNewFile() {
  uploadedFile && localStorage.setItem(activePath + '/' + newFileName, uploadedFile);

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


import { Radio, RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const types = ['TXT','JSON', 'PNG']

function SelectNewFileType({ newFileType, setNewFileType, setUploadedFile }) {

  return (
    <div className="w-full px-4">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup
          value={newFileType}
          onChange={setNewFileType}
          aria-label="Select file type"
          className="space-y-2"
        >
          {types.map((type) => (
            <RadioGroup.Option
              key={type}
              value={type}
              className="group relative flex cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
            >
              <div className="flex w-full items-center justify-between">
                <div className="text-sm/6">
                  <p className="font-semibold text-black">{type}</p>
                </div>
                {newFileType === "PNG" && type === "PNG" && (<UploadImageInput setUploadedFile={setUploadedFile}/> )}
                <CheckCircleIcon className="size-6 fill-green-400 opacity-0 transition group-data-[checked]:opacity-100" />
              </div>
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
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
        {/* <Description className="text-sm/6 text-black/50"></Description> */}
        <Input
          className={clsx(
            'mt-3 block w-full rounded-lg border border-stone-100  py-1.5 px-3 text-sm/6 text-black/75',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
          )}
          placeholder='Type file name'
          value={newFileName} 
          onChange={handleInputChange}
        />
      </Field>
    </div>
  )
}


function UploadImageInput({ setUploadedFile }) {
  function handleFileUpload(event) {
    const file = event.target.files[0]; 

    if (file) {
      const reader = new FileReader();
      
      reader.onload = () => {
        const base64Image = reader.result;
        setUploadedFile(base64Image); 
      };

      reader.readAsDataURL(file); 
    }
  }

  return (
    <input
      type="file"
      onChange={handleFileUpload}
      className="block ml-4 w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  );
}