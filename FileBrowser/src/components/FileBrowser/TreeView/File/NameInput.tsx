import { Field, Input } from "@headlessui/react";
import clsx from "clsx";
import { ChangeEvent } from "react";

interface NameInputProps {
  newFileName: string;
  setNewFileName: (value: string) => void;
}
export function NameInput({ newFileName, setNewFileName }: NameInputProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
          onChange={handleInputChange} />
      </Field>
    </div>
  );
}
