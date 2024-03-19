import { SyntheticEvent } from 'react';

import { ContextMenus } from '@/consts';

interface ContextMenuProps {
  onClick: (e: SyntheticEvent<HTMLElement>) => void;
}

export const ContextMenu = ({ onClick }: ContextMenuProps) => {
  return (
    <div className="context-menu" onClick={onClick}>
      <ul>
        {ContextMenus.map(({ id, label }) => (
          <li data-event={id} key={id}>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};
