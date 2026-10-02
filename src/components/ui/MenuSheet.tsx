import React from 'react';
import { Sheet } from './Sheet';

export interface MenuItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  onSelect: () => void;
  danger?: boolean;
  hidden?: boolean;
}

interface MenuSheetProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  items: MenuItem[];
}

/** Menu de ações em bottom sheet (substitui fileiras de botões pequenos). */
export const MenuSheet: React.FC<MenuSheetProps> = ({ open, onClose, title, subtitle, items }) => (
  <Sheet open={open} onClose={onClose} title={title} subtitle={subtitle} size="sm" flush>
    <div className="menu" role="menu">
      {items
        .filter((i) => !i.hidden)
        .map((item) => (
          <button
            key={item.id}
            type="button"
            role="menuitem"
            className={`menu-item${item.danger ? ' menu-item-danger' : ''}`}
            onClick={() => {
              onClose();
              // Executa após o fechamento para não empilhar sheets durante a animação
              window.setTimeout(item.onSelect, 0);
            }}
          >
            {item.icon}
            <span className="grow">
              {item.label}
              {item.description && <span className="menu-item-sub">{item.description}</span>}
            </span>
          </button>
        ))}
    </div>
  </Sheet>
);
