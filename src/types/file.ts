import { FileIcons } from '@/consts/icons';

export type FileType = {
  id: number;
  type: string;
  name: string;
  meta: keyof typeof FileIcons;
  data?: FileType[];
};

export enum Type {
  Folder = 'folder',
  File = 'file',
}

export enum OperationType {
  Delete = 'delete',
  Rename = 'rename',
  Copy = 'copy',
}

export type EventType = {
  fileName: string;
  type: OperationType;
};
