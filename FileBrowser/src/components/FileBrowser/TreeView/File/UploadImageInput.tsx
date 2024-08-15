import { ChangeEvent } from "react";

interface UploadImageInputProps {
  setUploadedFile: (value: string) => void;
}

export function UploadImageInput({ setUploadedFile }: UploadImageInputProps) {
  function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    let file = {} as File;
    if (event.target.files) file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result;
        if (typeof base64Image === 'string') {
          setUploadedFile(base64Image);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <input
      type="file"
      onChange={handleFileUpload}
      className="block ml-4 w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-blue-700 hover:file:bg-blue-100" />
  );
}
