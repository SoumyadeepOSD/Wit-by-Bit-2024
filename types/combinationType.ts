export interface CombinationPropType {
    name: string;
    sku: string;
    quantity: number;
    inStock: boolean;
}



export interface comboProp{
    combo: CombinationPropType[]
    setCombo:React.Dispatch<React.SetStateAction<CombinationPropType[]>>;
}