import React, { useState } from 'react';
import { Dices, FileText } from 'lucide-react';
import { CharacterRollHistoryTab } from './CharacterRollHistoryTab';
import { CharacterAuditTab } from './CharacterAuditTab';
import { Segmented } from '../ui/controls';

interface LogsTabProps {
  characterId: string;
  characterName: string;
  /** Muda a cada rolagem/alteração para recarregar os registros ao vivo. */
  revision?: string | number;
}

/** Registro do personagem: rolagens e auditoria de alterações (já filtrados pelo herói). */
export const LogsTab: React.FC<LogsTabProps> = ({ characterId, characterName, revision }) => {
  const [subTab, setSubTab] = useState<'rolagens' | 'auditoria'>('rolagens');

  return (
    <div className="stack">
      <Segmented<'rolagens' | 'auditoria'>
        value={subTab}
        onChange={setSubTab}
        ariaLabel="Tipo de registro"
        options={[
          { value: 'rolagens', label: 'Rolagens', icon: <Dices size={16} /> },
          { value: 'auditoria', label: 'Auditoria', icon: <FileText size={16} /> },
        ]}
      />
      {subTab === 'rolagens' ? (
        <CharacterRollHistoryTab characterId={characterId} characterName={characterName} revision={revision} />
      ) : (
        <CharacterAuditTab characterId={characterId} characterName={characterName} revision={revision} />
      )}
    </div>
  );
};
