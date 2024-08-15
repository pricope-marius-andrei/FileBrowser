import { Field, Input } from "@headlessui/react";
import clsx from "clsx";
import { ChangeEvent } from "react";

export function NameInput({ newFolderName, setNewFolderName }: { newFolderName: string; setNewFolderName: (value: string) => void; }) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(event.target.value);
  };

  return (
    <div className="w-full max-w-md px-4">
      <Field>
        <Input
          className={clsx(
            'mt-4 block w-full rounded-lg border border-stone-100  py-1.5 px-3 text-sm/6 text-black/75',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
          )}
          placeholder='Type folder name'
          value={newFolderName}
          onChange={handleInputChange} />
      </Field>
    </div>
  );
}
