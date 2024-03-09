"use client"

import React from 'react';
import { Slider } from '@/components/ui/slider';

interface MyComponentProps {
  label: string;
  onSliderChange: (value: number) => void; // 外部から渡されるコールバック関数
}

const MyComponent: React.FC<MyComponentProps> = ({ label, onSliderChange }) => {
  const [sliderValue, setSliderValue] = React.useState<number[]>([50]);

  const handleSliderChange = (newValue: number[]) => {
    setSliderValue(newValue);
    onSliderChange(newValue[0]); // 外部のコールバック関数を呼び出す
  };

  return (
    <div>
      <Slider value={sliderValue} onValueChange={handleSliderChange} />
      <p>Point: {sliderValue}</p>
    </div>
  );
};

export default MyComponent;


