import { Tab } from "@headlessui/react"

interface StylesTabProps {
  children: React.ReactNode;
}

export const StylesTab = ({ children}: StylesTabProps, ) => {
  return (
    <Tab className="data-[selected]:bg-slate-800 data-[selected]:border data-[selected]:border-2  border-slate-500  rounded-xl px-10 py-2 data-[selected]:text-white">{children}</Tab>
  );
};
