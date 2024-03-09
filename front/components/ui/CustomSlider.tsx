"use client"

import * as React from 'react';
import { Slider } from '@/components/ui/slider';

const MyComponent: React.FC = () => {
  const [sliderValue, setSliderValue] = React.useState<number[]>([5]); // スライダーの値を保持する状態

  // スライダーの値が変更されたときに呼び出されるコールバック関数
  const handleSliderChange = (newValue: number[]) => {
    setSliderValue(newValue); // スライダーの値を更新
  };

  return (
    <div>
      {/* スライダーコンポーネントをレンダリング */}
      <Slider value={sliderValue} onValueChange={handleSliderChange} />

      {/* スライダーの現在の値を表示 */}
      <p>現在のスライダーの位置: {sliderValue}</p>
    </div>
  );
};

export default MyComponent;
