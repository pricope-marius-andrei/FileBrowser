import { Dispatch, useEffect, useState } from 'react'
import { FileSystemItem } from '../../../../types/FileBrowserTypes';

import Dictaphone from '../../../Dictaphone';


const flattenFileSystem = (data:FileSystemItem[]) => {
    let result:FileSystemItem[] = [];

    data.forEach((item:FileSystemItem) => {
        if (item.kind === 'folder' && item.items) {
            result.push({ ...item });
            result = result.concat(flattenFileSystem(item.items));
        } else {
            result.push({ ...item });
        }
    });

    return result;
};

export default function SearchBar({rawData, setFilteredData}: {rawData:FileSystemItem[], setFilteredData:Dispatch<React.SetStateAction<FileSystemItem[]>>}) {
    const [searchQuery, setSearchQuery] = useState('');
    const rawFlattenedData = flattenFileSystem(rawData);
   

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
