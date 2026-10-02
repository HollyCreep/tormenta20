import React, { useState } from 'react';
import { Dices, FileText } from 'lucide-react';
import { CharacterRollHistoryTab } from './CharacterRollHistoryTab';
import { CharacterAuditTab } from './CharacterAuditTab';

interface LogsTabProps {
  characterId: string;
  characterName: string;
}

/**
 * Aba unificada de Logs do Personagem, com sub-abas "Rolagens" e "Auditoria".
 * Substitui as antigas abas separadas "Histórico" e "Auditoria" no CharacterSheetView.
 * Os dados já vêm filtrados pelo personagem ativo — sem necessidade de select de personagem.
 */
export const LogsTab: React.FC<LogsTabProps> = ({ characterId, characterName }) => {
  const [subTab, setSubTab] = useState<'rolagens' | 'auditoria'>('rolagens');

  return (
    <div>
      {/* Sub-abas: Rolagens | Auditoria */}
      <div className="sub-tabs sub-tabs-nested">
        <button
          type="button"
          className={subTab === 'rolagens' ? 'active' : ''}
          onClick={() => setSubTab('rolagens')}
        >
          <Dices size={14} />
          Rolagens
        </button>
        <button
          type="button"
          className={subTab === 'auditoria' ? 'active' : ''}
          onClick={() => setSubTab('auditoria')}
        >
          <FileText size={14} />
          Auditoria
        </button>
      </div>

      {/* Conteúdo das sub-abas */}
      {subTab === 'rolagens' && (
        <CharacterRollHistoryTab
          characterId={characterId}
          characterName={characterName}
        />
      )}
      {subTab === 'auditoria' && (
        <CharacterAuditTab
          characterId={characterId}
          characterName={characterName}
        />
      )}
    </div>
  );
};
