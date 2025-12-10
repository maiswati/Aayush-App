import React, { useState } from 'react';
import {View, Text} from 'react-native';
import { PrivateInsuranceTypeOptions } from '@/data/data';
import MultiSelectDropdown from './DropDownCheckBox';

interface PrivaProp{
    setSelectedPrivateInsurances: React.Dispatch<React.SetStateAction<string[]>>;
    selectedPrivateInsurances: string[];
} 

export default function Private({selectedPrivateInsurances, setSelectedPrivateInsurances}:PrivaProp) {
    return (
        <>
             <MultiSelectDropdown
                        data={PrivateInsuranceTypeOptions}
                        selected={selectedPrivateInsurances}
                        setSelected={setSelectedPrivateInsurances}
                        placeholder="Select Insurance Companies"
                    />
        </>
    )
}