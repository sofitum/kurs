import React, { useState } from 'react';
import { CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';

interface Component {
  id: string;
  name: string;
  type: 'cpu' | 'ram' | 'gpu' | 'storage';
  compatibility: string[];
}

interface InstalledComponent {
  slotId: string;
  component: Component;
}

export default function PCBuilderLab() {
  const [installedComponents, setInstalledComponents] = useState<InstalledComponent[]>([]);
  const [draggedComponent, setDraggedComponent] = useState<Component | null>(null);
  const [compatibilityResult, setCompatibilityResult] = useState<string>('');

  const components: Component[] = [
    { id: 'intel-i7', name: 'Intel Core i7-12700K', type: 'cpu', compatibility: ['lga1700'] },
    { id: 'amd-ryzen', name: 'AMD Ryzen 7 5800X', type: 'cpu', compatibility: ['am4'] },
    { id: 'corsair-ram', name: 'Corsair DDR4 16GB', type: 'ram', compatibility: ['ddr4'] },
    { id: 'kingston-ram', name: 'Kingston DDR5 32GB', type: 'ram', compatibility: ['ddr5'] },
    { id: 'rtx-3070', name: 'NVIDIA RTX 3070', type: 'gpu', compatibility: ['pcie'] },
    { id: 'samsung-ssd', name: 'Samsung SSD 1TB', type: 'storage', compatibility: ['sata', 'nvme'] }
  ];

  const slots = [
    { id: 'cpu-slot', type: 'cpu', name: 'CPU Socket', compatibility: ['lga1700', 'am4'] },
    { id: 'ram-slot', type:'ram', name: 'RAM Slot', compatibility: ['ddr4', 'ddr5'] },
    { id: 'gpu-slot', type: 'gpu', name: 'PCIe x16 Slot', compatibility: ['pcie'] },
    { id: 'storage-slot', type: 'storage', name: 'Storage Slot', compatibility: ['sata', 'nvme'] }
  ];

  const handleDragStart = (component: Component) => {
    setDraggedComponent(component);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    
    if (!draggedComponent) return;

    const slot = slots.find(s => s.id === slotId);
    if (!slot || slot.type !== draggedComponent.type) {
      setCompatibilityResult('❌ Компонент не подходит для этого слота!');
      return;
    }

    // Проверяем совместимость
    const isCompatible = draggedComponent.compatibility.some(comp => 
      slot.compatibility.includes(comp)
    );

    if (!isCompatible) {
      setCompatibilityResult('❌ Компонент несовместим с этим слотом!');
      return;
    }

    // Удаляем предыдущий компонент этого типа
    const newInstalled = installedComponents.filter(ic => ic.slotId !== slotId);
    
    // Добавляем новый компонент
    newInstalled.push({ slotId, component: draggedComponent });
    
    setInstalledComponents(newInstalled);
    setDraggedComponent(null);
    setCompatibilityResult('✅ Компонент успешно установлен!');
  };

  const checkCompatibility = () => {
    const requiredSlots = ['cpu-slot', 'ram-slot', 'gpu-slot', 'storage-slot'];
    const installedSlots = installedComponents.map(ic => ic.slotId);
    
    const missingComponents = requiredSlots.filter(slot => !installedSlots.includes(slot));
    
    if (missingComponents.length === 0) {
      setCompatibilityResult('🎉 Все компоненты установлены! Компьютер готов к работе.');
    } else {
      const missingNames = missingComponents.map(slot => {
        const slotInfo = slots.find(s => s.id === slot);
        return slotInfo?.name || slot;
      }).join(', ');
      setCompatibilityResult(`❌ Не хватает компонентов: ${missingNames}`);
    }
  };

  const reset = () => {
    setInstalledComponents([]);
    setCompatibilityResult('');
  };

  const getInstalledComponent = (slotId: string) => {
    return installedComponents.find(ic => ic.slotId === slotId);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Панель компонентов */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Доступные компоненты</h3>
          <div className="space-y-3">
            {components.map((component) => (
              <div
                key={component.id}
                draggable
                onDragStart={() => handleDragStart(component)}
                className="bg-white p-4 rounded-lg border border-gray-200 cursor-move hover:shadow-md transition-shadow"
              >
                <div className="font-medium text-gray-900">{component.name}</div>
                <div className="text-sm text-gray-500 capitalize">{component.type}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Материнская плата */}
        <div className="bg-amber-900 rounded-lg p-6 relative min-h-[400px]">
          <h3 className="text-lg font-semibold text-white mb-4">Материнская плата</h3>
          
          {slots.map((slot) => {
            const installed = getInstalledComponent(slot.id);
            return (
              <div
                key={slot.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, slot.id)}
                className={`absolute border-2 border-dashed rounded-lg p-3 transition-colors ${
                  installed 
                    ? 'border-green-400 bg-green-100' 
                    : 'border-white border-opacity-50 hover:border-opacity-100'
                }`}
                style={{
                  top: slot.id === 'cpu-slot' ? '20%' : 
                       slot.id === 'ram-slot' ? '40%' :
                       slot.id === 'gpu-slot' ? '60%' : '80%',
                  left: '20%',
                  width: '60%',
                  height: slot.id === 'cpu-slot' ? '15%' : '10%'
                }}
              >
                {installed ? (
                  <div className="text-sm font-medium text-green-800">
                    {installed.component.name}
                  </div>
                ) : (
                  <div className="text-sm text-white opacity-75">
                    {slot.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Кнопки управления */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <button
          onClick={checkCompatibility}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <CheckCircle size={20} />
          <span>Проверить совместимость</span>
        </button>
        
        <button
          onClick={reset}
          className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <RotateCcw size={20} />
          <span>Сбросить</span>
        </button>
      </div>

      {/* Результат проверки */}
      {compatibilityResult && (
        <div className={`p-4 rounded-lg border ${
          compatibilityResult.includes('❌') 
            ? 'bg-red-50 border-red-200 text-red-800'
            : compatibilityResult.includes('🎉')
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          <div className="flex items-center space-x-2">
            <AlertCircle size={20} />
            <span className="font-medium">{compatibilityResult}</span>
          </div>
        </div>
      )}

      {/* Инструкции */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Инструкции:</h4>
        <ul className="text-blue-800 space-y-1 text-sm">
          <li>• Перетащите компоненты из левой панели на соответствующие слоты материнской платы</li>
          <li>• Убедитесь, что компоненты совместимы с выбранными слотами</li>
          <li>• После установки всех компонентов нажмите "Проверить совместимость"</li>
          <li>• Используйте кнопку "Сбросить" для начала заново</li>
        </ul>
      </div>
    </div>
  );
}