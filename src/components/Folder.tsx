import { Dispatch, SetStateAction } from 'react';

import { FileType } from '@/types/file';
import {
  ArrowIcon,
  FolderCollapseIcon,
  FolderExpandIcon,
} from '@/assets/icons';

interface FolderProps {
  explorer: FileType;
  expandFolder: boolean;
  setExpandFolder: Dispatch<SetStateAction<boolean>>;
}

export const Folder = ({
  explorer,
  expandFolder,
  setExpandFolder,
}: FolderProps) => {
  const { name } = explorer;

  return (
    <div className="folder" onClick={() => setExpandFolder(!expandFolder)}>
      <span className="icon">
        {expandFolder ? (
          <>
            <ArrowIcon className="rotate" /> <FolderCollapseIcon />
          </>
        ) : (
          <>
            <ArrowIcon />
            <FolderExpandIcon />
          </>
        )}
      </span>

      <span>{name}</span>
    </div>
  );
};
