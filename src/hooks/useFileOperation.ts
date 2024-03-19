/**
 * Custom hook for file operations in a file explorer.
 *
 * @returns An object containing the file explorer data, as well as functions for deleting and renaming files.
 */

import { useState } from 'react';

import { Files } from '@/data/file-explorer';
import { FileType } from '@/types/file';

export const useFileOperation = () => {
  const [fileExplorerData, setFileExplorerData] = useState(Files as FileType);

  const deleteFile = (explorerData: FileType, fileId: number): FileType => {
    if (explorerData.id === fileId) {
      explorerData = {} as FileType;
      return explorerData;
    }

    const childrens = explorerData.data?.map((exp) => {
      return deleteFile(exp, fileId);
    });

    return { ...explorerData, data: childrens };
  };

  const renameFile = (
    explorerData: FileType,
    fileId: number,
    fileName: string
  ): FileType => {
    if (explorerData.id === fileId) return { ...explorerData, name: fileName };

    const childrens = explorerData.data?.map((exp) => {
      return renameFile(exp, fileId, fileName);
    });

    return { ...explorerData, data: childrens };
  };

  const handleFileDetele = (fileId: number) => {
    const explorerData = deleteFile(fileExplorerData, fileId);
    setFileExplorerData(explorerData);
  };

  const handleRenameFile = (fileId: number, fileName: string) => {
    const explorerData = renameFile(fileExplorerData, fileId, fileName);
    setFileExplorerData(explorerData);
  };

  return { fileExplorerData, handleFileDetele, handleRenameFile };
};
