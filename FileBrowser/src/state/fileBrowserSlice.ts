import data from "../data/data.json";
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FileItem, FileSystemItem, FolderItem } from "../types/FileBrowserTypes";

// Define the base interface for items


// A `FileSystemItem` can be either a `FileItem` or `FolderItem`


const localStorageFileBrowserData : string | null= localStorage.getItem("fileBrowserData") 
const fileBrowserData : FileSystemItem[] = localStorageFileBrowserData ? JSON.parse(localStorageFileBrowserData) as FileSystemItem[] : data as FileSystemItem[];

// Assert the type of your imported data as `FileSystemItem[]`
const initialState: FileSystemItem[] = fileBrowserData;


const getActiveItem = (fileBrowserData: FolderItem[], activePath: string): FileSystemItem | undefined => {
    const activePathArray = activePath.split("/");
    const activeItemName = activePathArray[activePathArray.length - 1];
    const foldersToActiveItem = activePathArray.slice(2, activePathArray.length - 1);

    let currentPathStep: FolderItem[] | undefined = fileBrowserData;
    foldersToActiveItem.forEach((field: string) => {
        currentPathStep = currentPathStep?.find((obj: FolderItem) => obj.name === field)?.items as FolderItem[];
    });

    return currentPathStep.find((obj: FileSystemItem) => obj.name === activeItemName);
};

const fileBrowserSlice = createSlice({
    name: 'fileBrowser',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<{ activePath: string, newItem: FileItem | FolderItem }>) => {
            const { activePath, newItem } = action.payload;
            console.log(activePath);
            const activeItem = getActiveItem(state, activePath);
            
            if (activeItem) {
                const folder = activeItem as FolderItem;

                folder.items.push(newItem);
                localStorage.setItem("fileBrowserData", JSON.stringify(state));
            }
        },
    },
});


export const { addItem } = fileBrowserSlice.actions;

export default fileBrowserSlice.reducer;