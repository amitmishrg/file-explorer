/**
 * Renders a file component.
 *
 * @param {Object} explorerData - The data of the file to be rendered.
 * @param {Function} deleteFile - The function to delete the file.
 * @param {Function} renameFile - The function to rename the file.
 * @returns {JSX.Element} The file component.
 */

import { useState, MouseEvent, SyntheticEvent, KeyboardEvent } from 'react';

import { FileType, OperationType } from '@/types/file';
import { useEventContext } from '@/context/EventTypeContext';
import { FileIcons } from '@/consts';
import { ContextMenu } from './ContextMenu';

interface FileProps {
  explorerData: FileType;
  deleteFile: (fileId: number) => void;
  renameFile: (fileId: number, fileName: string) => void;
}

export const File = ({ explorerData, deleteFile, renameFile }: FileProps) => {
  const { id, name, meta } = explorerData;

  const [active, setActive] = useState(false);
  const [openContextMenu, setOpenContextMenu] = useState(false);

  const [fileEditable, setFileEditable] = useState(false);
  const [fileName, setFileName] = useState(name);

  const { setEvent } = useEventContext();

  const handleFileClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.type === 'click') setActive(true);
    else if (event.type === 'contextmenu') setOpenContextMenu(true);
  };

  const handleOnBlur = () => {
    setActive(false);
    setOpenContextMenu(false);
  };

  const handleFileRename = (fileName: string) => {
    if (fileName !== name) {
      renameFile(id, fileName);
      setEvent({ fileName, type: OperationType.Rename });
    }
    setFileEditable(false);
  };

  const handleRenameEnter = (
    fileName: string,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event && event.code === 'Enter') {
      handleFileRename(fileName);
    }
  };

  const handleContextMenu = (e: SyntheticEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const { event } = target.dataset;

    switch (event) {
      case OperationType.Delete:
        deleteFile(id);
        setEvent({ fileName: name, type: OperationType.Delete });
        break;

      case OperationType.Rename:
        setFileEditable(true);
        setActive(true);
        break;

      case OperationType.Copy:
        navigator.clipboard.writeText(name);
        setEvent({ fileName: name, type: OperationType.Copy });
        break;
    }

    setOpenContextMenu(false);
  };

  return (
    <>
      {name && (
        <div
          tabIndex={0}
          onBlur={handleOnBlur}
          className={`file ${active ? 'active' : ''}`}
          onClick={handleFileClick}
          onContextMenu={handleFileClick}
        >
          {FileIcons[meta || 'default']}

          {fileEditable ? (
            <input
              type="text"
              value={fileName}
              onChange={({ target }) => setFileName(target.value)}
              onBlur={({ target }) => handleFileRename(target.value)}
              onKeyDown={(e) => handleRenameEnter(e.currentTarget.value, e)}
              autoFocus
            />
          ) : (
            <span>{name}</span>
          )}

          {openContextMenu && <ContextMenu onClick={handleContextMenu} />}
        </div>
      )}
    </>
  );
};
