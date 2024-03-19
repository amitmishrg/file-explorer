/**
 * Renders a file explorer component.
 *
 * @param {FileType} props.explorerData - The data for the explorer.
 * @param {function} props.deleteFile - The function to delete a file.
 * @param {function} props.renameFile - The function to rename a file.
 * @returns {JSX.Element} The file explorer component.
 */

import { useState } from 'react';

import { FileType, Type } from '@/types/file';
import { Folder } from './Folder';
import { File } from './File';

interface FileExplorerProps {
  explorerData: FileType;
  deleteFile: (fileId: number) => void;
  renameFile: (fileId: number, fileName: string) => void;
}

export const FileExplorer = (props: FileExplorerProps) => {
  const { explorerData, deleteFile, renameFile } = props;
  const { type, data } = explorerData;

  const [expandFolder, setExpandFolder] = useState(false);

  return (
    <>
      {type === Type.Folder ? (
        <>
          <Folder
            explorer={explorerData}
            expandFolder={expandFolder}
            setExpandFolder={setExpandFolder}
          />

          {expandFolder && (
            <div className="childs">
              {data?.map((explorer) => (
                <FileExplorer
                  key={explorer.id}
                  explorerData={explorer}
                  deleteFile={deleteFile}
                  renameFile={renameFile}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <File {...props} />
      )}
    </>
  );
};
