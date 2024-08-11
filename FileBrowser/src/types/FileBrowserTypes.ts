export interface BaseItem {
    name: string;
    path: string;
    kind: "file" | "folder";
}

export interface FileItem extends BaseItem {
    kind: "file";
    type: "TXT" | "JSON" | "PNG";
    content?: string; 
}

export type FileSystemItem = FileItem | FolderItem;


export interface FolderItem extends BaseItem {
    kind: "folder";
    items: FileSystemItem[]; 
}