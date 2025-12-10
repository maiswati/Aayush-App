import React, {useState} from 'react';
import {View, Text} from 'react-native';
import { GovernmentInsuranceTypeOptions } from '@/data/data';
import MultiSelectDropdown from './DropDownCheckBox';
interface GoverProps{
        selectedGovernmentInsurances: string[];
    setSelectedGovernmentInsurances: React.Dispatch<React.SetStateAction<string[]>>;

}
export default function Government({selectedGovernmentInsurances, setSelectedGovernmentInsurances}:GoverProps) {
    return (
        <>
        <MultiSelectDropdown
            data={GovernmentInsuranceTypeOptions}
            selected={selectedGovernmentInsurances}
            setSelected={setSelectedGovernmentInsurances}
            placeholder="Select Insurance Companies"
        />
        </>
    )
}