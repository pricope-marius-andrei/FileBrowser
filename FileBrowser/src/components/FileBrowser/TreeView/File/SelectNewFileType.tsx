import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { UploadImageInput } from './UploadImageInput';
import { FileTypes } from '../../../../types/FileBrowserTypes';

const types = ['TXT','JSON', 'PNG']

interface SelectNewFileTypeProps {
  newFileType: FileTypes;
  setNewFileType: (value: FileTypes) => void;
  setUploadedFile: (value: string) => void;
}

export default function SelectNewFileType({ newFileType, setNewFileType, setUploadedFile }:SelectNewFileTypeProps) {
  
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