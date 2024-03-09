import MyComponent from '@/components/ui/CustomSlider';
import React, { useState, useEffect } from 'react';
 // 仮定のパス、実際のパスに合わせてください

// 親コンポーネント
const ParentComponent: React.FC = () => {
  // labelとスライダー値のマッピングを状態として保持
  const [sliders, setSliders] = useState<{ [label: string]: number }>({});
  
  // スライダー値の合計を計算
  const totalValue = Object.values(sliders).reduce((acc, curr) => acc + curr, 0);

  // labelごとにスライダー値を更新する関数
  const handleSliderChange = (label: string, value: number) => {
    setSliders(prev => ({ ...prev, [label]: value }));
  };

  return (
    <div>
      {/* MyComponentインスタンスを複数レンダリング */}
      <MyComponent label="fit" onSliderChange={(value) => handleSliderChange("A", value)} />
      <MyComponent label="Creativity" onSliderChange={(value) => handleSliderChange("B", value)} />
      <MyComponent label="Comprehensibility" onSliderChange={(value) => handleSliderChange("C", value)} />
      <MyComponent label="Moved" onSliderChange={(value) => handleSliderChange("D", value)} />
      <MyComponent label="Editing" onSliderChange={(value) => handleSliderChange("E", value)} />
      

      {/* 合計値を表示 */}
      <p>Total Value: {totalValue}</p>

    </div>
  );
};

export default ParentComponent;

