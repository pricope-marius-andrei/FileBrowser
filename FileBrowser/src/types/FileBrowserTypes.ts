export interface BaseItem {
    name: string;
    path: string;
    kind: "file" | "folder";
}

export type FileTypes = 'TXT' | 'JSON' | 'PNG';


export interface FileItem extends BaseItem {
    kind: "file";
    type: FileTypes;
    content?: string; 
}

export type FileSystemItem = FileItem | FolderItem;


export interface FolderItem extends BaseItem {
    kind: "folder";
    items: FileSystemItem[]; 
}
