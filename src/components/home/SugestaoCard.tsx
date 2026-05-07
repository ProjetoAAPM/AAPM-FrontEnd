import React, { useState } from 'react';

interface SugestaoProps {
  texto: string;
  modoAdmin?: boolean;
  onRecusar: () => void;
}

const SugestaoCard = ({ texto, modoAdmin = false, onRecusar }: SugestaoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'pendente' | 'aprovado'>('pendente');

  return (
    <div className="w-full mb-3">
      <div className="bg-white rounded-[10px] shadow-sm border border-gray-100 overflow-hidden">
        <div 
          className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-col gap-1 flex-1 pr-2">
            <div className="flex items-center gap-2">
              <span className="text-[#101625] font-black text-[0.85rem] sm:text-[0.9rem]">Sugestão:</span>
              {modoAdmin && (
                <span className={`${status === 'aprovado' ? 'bg-green-600' : 'bg-yellow-500'} text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase`}>
                  {status}
                </span>
              )}
            </div>
            <p className={`text-gray-500 font-medium text-[0.8rem] sm:text-[0.85rem] leading-tight ${!isOpen ? 'line-clamp-1' : ''}`}>
              {texto}
            </p>
          </div>

          <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {isOpen && modoAdmin && (
          <div className="px-4 pb-4 pt-2 border-t border-gray-50 bg-gray-50/30 flex gap-2 animate-in fade-in slide-in-from-top-1">
            <button
              onClick={(e) => { e.stopPropagation(); setStatus('pendente'); }}
              className={`flex-1 py-1.5 rounded-lg font-black text-[10px] uppercase border-2 transition-all ${status === 'pendente' ? 'bg-yellow-500 text-white border-transparent' : 'bg-white border-gray-200 text-gray-400'}`}
            >
              Pendente
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onRecusar(); }}
              className="flex-1 py-1.5 rounded-lg font-black text-[10px] uppercase border-2 bg-white border-red-600 text-red-600 hover:bg-red-50"
            >
              Recusado
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setStatus('aprovado'); }}
              className={`flex-1 py-1.5 rounded-lg font-black text-[10px] uppercase border-2 transition-all ${status === 'aprovado' ? 'bg-green-600 text-white border-transparent' : 'bg-white border-gray-200 text-gray-400'}`}
            >
              Aprovado
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SugestaoCard;