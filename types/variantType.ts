export interface VariantPropType {
    name: string;
    values: string[];
}

export interface VariantStepProps {
    localVariant: VariantPropType[];
    setLocalVariant: React.Dispatch<React.SetStateAction<VariantPropType[]>>;
}
