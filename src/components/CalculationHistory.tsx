
import { useState } from 'react';
import { Copy, Download, Trash2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalculationEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
  isSpecial?: boolean;
}

interface CalculationHistoryProps {
  entries: CalculationEntry[];
  onClearHistory: () => void;
}

const CalculationHistory = ({ entries, onClearHistory }: CalculationHistoryProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadHistory = () => {
    const content = entries.map(entry => 
      `${entry.expression} = ${entry.result} (${entry.timestamp.toLocaleString()})`
    ).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'voice-calc-history.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          📊 Calculation History
        </h3>
        <div className="flex gap-2">
          <button
            onClick={downloadHistory}
            disabled={entries.length === 0}
            className={cn(
              "p-2 rounded-lg border border-white/30 backdrop-blur-sm transition-all duration-300",
              entries.length > 0
                ? "bg-green-500/80 text-white hover:bg-green-500 hover:scale-105"
                : "bg-gray-500/50 text-gray-300 cursor-not-allowed"
            )}
            title="Download history"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={onClearHistory}
            disabled={entries.length === 0}
            className={cn(
              "p-2 rounded-lg border border-white/30 backdrop-blur-sm transition-all duration-300",
              entries.length > 0
                ? "bg-red-500/80 text-white hover:bg-red-500 hover:scale-105"
                : "bg-gray-500/50 text-gray-300 cursor-not-allowed"
            )}
            title="Clear history"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {entries.length === 0 ? (
          <div className="text-center text-purple-200 py-8">
            <div className="text-4xl mb-2">🧮</div>
            <p>No calculations yet!</p>
            <p className="text-sm">Start calculating to see history</p>
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className={cn(
                "p-3 rounded-lg border transition-all duration-300 group relative",
                entry.isSpecial
                  ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-300/50 shadow-lg"
                  : "bg-white/10 border-white/20 hover:bg-white/20"
              )}
            >
              {entry.isSpecial && (
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-mono text-white font-semibold">
                    {entry.expression} = {entry.result}
                    {entry.isSpecial && " 🎉"}
                  </div>
                  <div className="text-xs text-purple-200 mt-1">
                    {entry.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                
                <button
                  onClick={() => copyToClipboard(`${entry.expression} = ${entry.result}`, entry.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200"
                  title="Copy calculation"
                >
                  {copiedId === entry.id ? (
                    <span className="text-green-300 text-xs">✓</span>
                  ) : (
                    <Copy className="w-3 h-3 text-white" />
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalculationHistory;
