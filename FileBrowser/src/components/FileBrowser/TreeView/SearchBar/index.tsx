import { useEffect, useState } from 'react'
import { FolderItem } from '../../../../types/FileBrowserTypes';

import Dictaphone from '../../../Dictaphone';


const flattenFileSystem = (data:any) => {
    let result:any = [];

    data.forEach((item:FolderItem) => {
        if (item.kind === 'folder' && item.items) {
            result.push({ ...item, isFolder: true });
            result = result.concat(flattenFileSystem(item.items));
        } else {
            result.push({ ...item, isFolder: false });
        }
    });

    return result;
};

export default function SearchBar({rawData, setFilteredData}:any) {
    const [searchQuery, setSearchQuery] = useState('');
    const rawFlattenedData = flattenFileSystem(rawData);
   

    useEffect(() => {
        if(searchQuery !== '') {
            const flattenedData = rawFlattenedData.filter((item:any) => 
                
                item.name.toLowerCase().includes(searchQuery.toLowerCase()));             
    
                setFilteredData(flattenedData);
        }
    }, [searchQuery]);

    const handleSearch = (query:string) => {
        setSearchQuery(query);
        if(query !== '') {
            const flattenedData = rawFlattenedData.filter((item:any) => 
                
            item.name.toLowerCase().includes(query.toLowerCase()));             

            setFilteredData(flattenedData);
        }
        else 
        {
            setFilteredData([]);
            // setActivePath('');
            // setCurrentItem({});
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
