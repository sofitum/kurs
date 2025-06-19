import React, { useState, useRef } from 'react';
import { Play, Trash2, Plus } from 'lucide-react';

interface Gate {
  id: string;
  type: 'AND' | 'OR' | 'NOT' | 'XOR' | 'NAND' | 'NOR';
  x: number;
  y: number;
  inputs: boolean[];
  output: boolean;
}

interface InputNode {
  id: string;
  x: number;
  y: number;
  value: boolean;
}

interface OutputNode {
  id: string;
  x: number;
  y: number;
  value: boolean;
}

export default function LogicCircuitsLab() {
  const [gates, setGates] = useState<Gate[]>([]);
  const [inputs, setInputs] = useState<InputNode[]>([]);
  const [outputs, setOutputs] = useState<OutputNode[]>([]);
  const [selectedGateType, setSelectedGateType] = useState<Gate['type']>('AND');
  const canvasRef = useRef<HTMLDivElement>(null);

  const gateTypes = [
    { type: 'AND' as const, symbol: '&', description: 'И' },
    { type: 'OR' as const, symbol: '≥1', description: 'ИЛИ' },
    { type: 'NOT' as const, symbol: '1', description: 'НЕ' },
    { type: 'XOR' as const, symbol: '=1', description: 'Исключающее ИЛИ' },
    { type: 'NAND' as const, symbol: '&̄', description: 'И-НЕ' },
    { type: 'NOR' as const, symbol: '≥1̄', description: 'ИЛИ-НЕ' }
  ];

  const calculateGateOutput = (type: Gate['type'], inputs: boolean[]): boolean => {
    switch (type) {
      case 'AND':
        return inputs.every(input => input);
      case 'OR':
        return inputs.some(input => input);
      case 'NOT':
        return !inputs[0];
      case 'XOR':
        return inputs.filter(input => input).length === 1;
      case 'NAND':
        return !inputs.every(input => input);
      case 'NOR':
        return !inputs.some(input => input);
      default:
        return false;
    }
  };

  const addGate = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newGate: Gate = {
      id: `gate-${Date.now()}`,
      type: selectedGateType,
      x,
      y,
      inputs: selectedGateType === 'NOT' ? [false] : [false, false],
      output: false
    };

    setGates(prev => [...prev, newGate]);
  };

  const addInput = () => {
    const newInput: InputNode = {
      id: `input-${Date.now()}`,
      x: 50,
      y: 50 + inputs.length * 60,
      value: false
    };
    setInputs(prev => [...prev, newInput]);
  };

  const addOutput = () => {
    const newOutput: OutputNode = {
      id: `output-${Date.now()}`,
      x: 450,
      y: 50 + outputs.length * 60,
      value: false
    };
    setOutputs(prev => [...prev, newOutput]);
  };

  const toggleInput = (inputId: string) => {
    setInputs(prev => prev.map(input => 
      input.id === inputId ? { ...input, value: !input.value } : input
    ));
  };

  const simulate = () => {
    // Простая симуляция - обновляем выходы всех элементов
    setGates(prev => prev.map(gate => ({
      ...gate,
      output: calculateGateOutput(gate.type, gate.inputs)
    })));
  };

  const clearCanvas = () => {
    setGates([]);
    setInputs([]);
    setOutputs([]);
  };

  return (
    <div className="space-y-6">
      {/* Панель инструментов */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Инструменты</h3>
        
        {/* Выбор типа элемента */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Выберите логический элемент:
          </label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {gateTypes.map((gate) => (
              <button
                key={gate.type}
                onClick={() => setSelectedGateType(gate.type)}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  selectedGateType === gate.type
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-mono text-lg">{gate.symbol}</div>
                <div className="text-xs">{gate.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Кнопки управления */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={addInput}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={16} />
            <span>Добавить вход</span>
          </button>
          
          <button
            onClick={addOutput}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus size={16} />
            <span>Добавить выход</span>
          </button>
          
          <button
            onClick={simulate}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Play size={16} />
            <span>Симулировать</span>
          </button>
          
          <button
            onClick={clearCanvas}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 size={16} />
            <span>Очистить</span>
          </button>
        </div>
      </div>

      {/* Рабочая область */}
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg relative overflow-hidden">
        <div
          ref={canvasRef}
          onClick={addGate}
          className="w-full h-96 relative cursor-crosshair"
          style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        >
          {/* Входы */}
          {inputs.map((input) => (
            <div
              key={input.id}
              className={`absolute w-12 h-8 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                input.value 
                  ? 'bg-green-500 border-green-600 text-white' 
                  : 'bg-gray-200 border-gray-400 text-gray-700'
              }`}
              style={{ left: input.x, top: input.y }}
              onClick={(e) => {
                e.stopPropagation();
                toggleInput(input.id);
              }}
            >
              <span className="text-xs font-bold">{input.value ? '1' : '0'}</span>
            </div>
          ))}

          {/* Логические элементы */}
          {gates.map((gate) => (
            <div
              key={gate.id}
              className={`absolute w-16 h-12 rounded border-2 flex items-center justify-center font-mono font-bold transition-colors ${
                gate.output 
                  ? 'bg-green-100 border-green-500 text-green-800' 
                  : 'bg-gray-100 border-gray-400 text-gray-700'
              }`}
              style={{ left: gate.x, top: gate.y }}
            >
              {gateTypes.find(g => g.type === gate.type)?.symbol}
            </div>
          ))}

          {/* Выходы */}
          {outputs.map((output) => (
            <div
              key={output.id}
              className={`absolute w-12 h-8 rounded border-2 flex items-center justify-center transition-colors ${
                output.value 
                  ? 'bg-blue-500 border-blue-600 text-white' 
                  : 'bg-gray-200 border-gray-400 text-gray-700'
              }`}
              style={{ left: output.x, top: output.y }}
            >
              <span className="text-xs font-bold">{output.value ? '1' : '0'}</span>
            </div>
          ))}

          {/* Подсказка */}
          {gates.length === 0 && inputs.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <p className="text-lg font-medium">Кликните для добавления логического элемента</p>
                <p className="text-sm">Или используйте кнопки для добавления входов и выходов</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Таблица истинности */}
      {inputs.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Состояние входов</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {inputs.map((input, index) => (
              <div key={input.id} className="flex items-center justify-between p-2 bg-white rounded border">
                <span className="font-medium">Вход {index + 1}:</span>
                <span className={`font-bold ${input.value ? 'text-green-600' : 'text-gray-600'}`}>
                  {input.value ? '1' : '0'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Инструкции */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Инструкции:</h4>
        <ul className="text-blue-800 space-y-1 text-sm">
          <li>• Выберите тип логического элемента и кликните на рабочую область для его размещения</li>
          <li>• Добавьте входы и выходы с помощью соответствующих кнопок</li>
          <li>• Кликните на входы для изменения их состояния (0/1)</li>
          <li>• Нажмите "Симулировать" для обновления состояния всех элементов</li>
          <li>• Используйте "Очистить" для удаления всех элементов</li>
        </ul>
      </div>
    </div>
  );
}