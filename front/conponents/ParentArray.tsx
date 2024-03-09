import MyComponent from "@/components/ui/CustomSlider";
import { SheetDescription } from "@/components/ui/sheet";
import { useState } from "react";

const ParentArray: React.FC = () => {
    // スライダー値の配列を初期化（ここでは、"A", "B", "C"の3つの要素を持つと想定）
    const [sliderValues, setSliderValues] = useState<number[]>([50, 50, 50, 50, 50]);
  
    // 特定のlabelに対応するスライダー値を更新する関数
    const handleSliderChange = (label: string, value: number) => {
      const index = label.charCodeAt(0) - 'A'.charCodeAt(0); // "A"からの距離を計算してインデックスを得る
      setSliderValues(prev => {
        const newValues = [...prev];
        newValues[index] = value;
        return newValues;
      });
    };

    const values = sliderValues;
    console.log(values)
  
    return (
      <div>
        {/* "A", "B", "C"に対応するMyComponentインスタンスをレンダリング */}
        <SheetDescription>
         Fit  
         </SheetDescription>
        <MyComponent label="fit"  onSliderChange={(value) => handleSliderChange("A", value)} />
        <SheetDescription>
        Creativity
         </SheetDescription>
        <MyComponent label="Creativity" onSliderChange={(value) => handleSliderChange("B", value)} />
        <SheetDescription>
        Comprehensivility
         </SheetDescription>
        <MyComponent label="Comprehensivility" onSliderChange={(value) => handleSliderChange("C", value)} />
        <SheetDescription>
        Moved
         </SheetDescription>
        <MyComponent label="Moved" onSliderChange={(value) => handleSliderChange("D", value)} />
        <SheetDescription>
        Editing
         </SheetDescription>
        <MyComponent label="Editing" onSliderChange={(value) => handleSliderChange("E", value)} />
  
        {/* スライダー値の配列を表示 */}
        <p>Slider Values: {sliderValues.join(', ')}</p>
        
      </div>
    );
  };
  
  export default ParentArray;
