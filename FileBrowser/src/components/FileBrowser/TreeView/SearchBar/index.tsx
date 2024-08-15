import { Dispatch, useEffect, useState } from 'react'
import { FileSystemItem } from '../../../../types/FileBrowserTypes';

import Dictaphone from '../../../Dictaphone';
import { flattenFileSystem } from '../../../../utils/fileOperations';

interface SearchBarProps {
    rawData: FileSystemItem[];
    setFilteredData: Dispatch<React.SetStateAction<FileSystemItem[]>>;
}

export default function SearchBar({rawData, setFilteredData}: SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const rawFlattenedData : FileSystemItem[] = flattenFileSystem(rawData);
   

    useEffect(() => {
        if(searchQuery !== '') {
            const flattenedData = rawFlattenedData.filter((item:FileSystemItem) => 
                
                item.name.toLowerCase().includes(searchQuery.toLowerCase()));             
    
                setFilteredData(flattenedData);
        }
    }, [searchQuery]);

    const handleSearch = (query:string) => {
        setSearchQuery(query);
        if(query !== '') {
            const flattenedData = rawFlattenedData.filter((item:FileSystemItem) => 
                
            item.name.toLowerCase().includes(query.toLowerCase()));             

            setFilteredData(flattenedData);
        }
        else 
        {
            setFilteredData([]);
        }
    }

  return (
    <div className='flex w-full'>
        <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery} 
            onChange={(e) => handleSearch(e.target.value)} 
            className="border bg-slate-900 p-2 mx-3 my-4 w-full rounded-lg text-white"
        />
        <Dictaphone searchCallback={setSearchQuery}/>
    </div>
  )
}
