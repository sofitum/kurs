import React, { useState } from 'react';
import { Play, SkipForward, RotateCcw } from 'lucide-react';

interface Registers {
  AX: number;
  BX: number;
  CX: number;
  DX: number;
  IP: number;
  FLAGS: number;
}

export default function CPUSimulatorLab() {
  const [registers, setRegisters] = useState<Registers>({
    AX: 0, BX: 0, CX: 0, DX: 0, IP: 0, FLAGS: 0
  });
  
  const [code, setCode] = useState(`MOV AX, 5
MOV BX, 10
ADD AX, BX
SUB BX, 3
MOV CX, AX
ADD CX, BX`);
  
  const [currentLine, setCurrentLine] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const executeInstruction = (instruction: string, regs: Registers): Registers => {
    const parts = instruction.trim().split(/\s+/);
    if (parts.length === 0) return regs;

    const cmd = parts[0].toUpperCase();
    const args = parts.slice(1).join('').split(',').map(arg => arg.trim());

    const newRegs = { ...regs };

    switch (cmd) {
      case 'MOV':
        if (args.length === 2) {
          const dest = args[0] as keyof Registers;
          const src = args[1];
          
          if (src in newRegs) {
            newRegs[dest] = newRegs[src as keyof Registers];
          } else {
            newRegs[dest] = parseInt(src) || 0;
          }
          setOutput(prev => [...prev, `${cmd} ${args[0]}, ${args[1]} -> ${dest} = ${newRegs[dest]}`]);
        }
        break;

      case 'ADD':
        if (args.length === 2) {
          const dest = args[0] as keyof Registers;
          const src = args[1];
          
          if (src in newRegs) {
            newRegs[dest] += newRegs[src as keyof Registers];
          } else {
            newRegs[dest] += parseInt(src) || 0;
          }
          setOutput(prev => [...prev, `${cmd} ${args[0]}, ${args[1]} -> ${dest} = ${newRegs[dest]}`]);
        }
        break;

      case 'SUB':
        if (args.length === 2) {
          const dest = args[0] as keyof Registers;
          const src = args[1];
          
          if (src in newRegs) {
            newRegs[dest] -= newRegs[src as keyof Registers];
          } else {
            newRegs[dest] -= parseInt(src) || 0;
          }
          setOutput(prev => [...prev, `${cmd} ${args[0]}, ${args[1]} -> ${dest} = ${newRegs[dest]}`]);
        }
        break;

      case 'INC':
        if (args.length === 1) {
          const dest = args[0] as keyof Registers;
          newRegs[dest]++;
          setOutput(prev => [...prev, `${cmd} ${args[0]} -> ${dest} = ${newRegs[dest]}`]);
        }
        break;

      case 'DEC':
        if (args.length === 1) {
          const dest = args[0] as keyof Registers;
          newRegs[dest]--;
          setOutput(prev => [...prev, `${cmd} ${args[0]} -> ${dest} = ${newRegs[dest]}`]);
        }
        break;

      default:
        setOutput(prev => [...prev, `Неизвестная команда: ${cmd}`]);
    }

    newRegs.IP++;
    return newRegs;
  };

  const runAll = () => {
    const lines = code.split('\n').filter(line => line.trim() !== '');
    let currentRegs = { AX: 0, BX: 0, CX: 0, DX: 0, IP: 0, FLAGS: 0 };
    
    setOutput([]);
    setIsRunning(true);
    
    lines.forEach((line, index) => {
      setTimeout(() => {
        currentRegs = executeInstruction(line, currentRegs);
        setRegisters(currentRegs);
        setCurrentLine(index + 1);
        
        if (index === lines.length - 1) {
          setIsRunning(false);
          setOutput(prev => [...prev, 'Выполнение завершено']);
        }
      }, index * 500);
    });
  };

  const stepForward = () => {
    const lines = code.split('\n').filter(line => line.trim() !== '');
    
    if (currentLine < lines.length) {
      const newRegs = executeInstruction(lines[currentLine], registers);
      setRegisters(newRegs);
      setCurrentLine(currentLine + 1);
    } else {
      setOutput(prev => [...prev, 'Достигнут конец программы']);
    }
  };

  const reset = () => {
    setRegisters({ AX: 0, BX: 0, CX: 0, DX: 0, IP: 0, FLAGS: 0 });
    setCurrentLine(0);
    setIsRunning(false);
    setOutput([]);
  };

  const formatRegisterValue = (value: number) => {
    return value.toString().padStart(4, '0');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Редактор кода */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Ассемблерный код</h3>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите ассемблерные команды..."
          />
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={runAll}
              disabled={isRunning}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Play size={16} />
              <span>Выполнить все</span>
            </button>
            
            <button
              onClick={stepForward}
              disabled={isRunning}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <SkipForward size={16} />
              <span>Шаг</span>
            </button>
            
            <button
              onClick={reset}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw size={16} />
              <span>Сброс</span>
            </button>
          </div>
        </div>

        {/* Регистры */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Состояние регистров</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            {Object.entries(registers).map(([name, value]) => (
              <div key={name} className="flex items-center justify-between p-3 bg-white rounded border">
                <span className="font-mono font-semibold text-gray-700">{name}:</span>
                <span className="font-mono text-blue-600 font-bold">
                  {formatRegisterValue(value)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="text-sm text-gray-600">
            <p><strong>Текущая строка:</strong> {currentLine}</p>
            <p><strong>Статус:</strong> {isRunning ? 'Выполняется...' : 'Остановлен'}</p>
          </div>
        </div>
      </div>

      {/* Вывод */}
      {output.length > 0 && (
        <div className="bg-gray-900 text-green-400 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Вывод выполнения:</h4>
          <div className="font-mono text-sm space-y-1 max-h-40 overflow-y-auto">
            {output.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>
      )}

      {/* Справка по командам */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Поддерживаемые команды:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <p><code>MOV dest, src</code> - Копирование значения</p>
            <p><code>ADD dest, src</code> - Сложение</p>
            <p><code>SUB dest, src</code> - Вычитание</p>
          </div>
          <div>
            <p><code>INC reg</code> - Увеличение на 1</p>
            <p><code>DEC reg</code> - Уменьшение на 1</p>
            <p>Регистры: AX, BX, CX, DX</p>
          </div>
        </div>
      </div>
    </div>
  );
}