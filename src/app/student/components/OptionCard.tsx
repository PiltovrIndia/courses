import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OptionCardProps {
  option: string;
  selectedOption: string;
  onSelect: (option: string) => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, selectedOption, onSelect }) => {
  const handleClick = () => {
    onSelect(option);
  };

  return (
    <Card className={`p-4 cursor-pointer ${selectedOption === option.split(',')[0] ? 'bg-blue-500 text-white' : 'bg-white-300'}`} onClick={handleClick}>
      {option.split(',')[1]} {/* Display the option text */}
    </Card>
  );
};

export default OptionCard;
0