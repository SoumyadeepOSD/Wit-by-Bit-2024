import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Switch } from '@/components/ui/switch';

interface CombinationProp {
    name: string;
    sku: string;
    quantity: number;
    inStock: boolean;
}


interface comboProp{
    combo: CombinationProp[]
    setCombo:React.Dispatch<React.SetStateAction<CombinationProp[]>>;
}

const CombinationStep = ({combo, setCombo}:comboProp) => {
    // Handler to update the SKU, quantity, or inStock state
    const handleInputChange = (index: number, field: string, value: any) => {
        setCombo((prev) =>
            prev.map((item, idx) =>
                idx === index ? { ...item, [field]: value } : item
            )
        );
    };

    return (
        <Card className="ml-5 mt-5 max-w-fit">
            <CardHeader>
                <CardTitle>Combinations</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 items-center text-xs">
                    <p className="ml-32">SKU *</p>
                    <div className="grid grid-cols-2 ml-[52px]">
                        <p>In stock</p>
                        <p className="-ml-4">Quantity</p>
                    </div>
                </div>
                {
                    combo.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 items-center text-sm w-96 my-2">
                            <p className="w-20">{item.name}</p>
                            <div className="grid grid-cols-4 items-center gap-4 w-[450px]">
                                <Input
                                    value={item.sku}
                                    onChange={(e) => handleInputChange(index, 'sku', e.target.value)}
                                />
                                <Switch
                                    checked={item.inStock}
                                    onCheckedChange={(checked) => handleInputChange(index, 'inStock', checked)}
                                />
                                <Input
                                    className={`-ml-16 ${item.inStock ? "bg-white":"bg-[#E2E8F0]"} `}
                                    type="number"
                                    value={item.inStock ? item.quantity: ""}
                                    disabled={!item.inStock}
                                    onChange={(e) => handleInputChange(index, 'quantity', parseInt(e.target.value) || 0)}
                                />
                            </div>
                        </div>
                    ))
                }
            </CardContent>
        </Card>
    );
};

export default CombinationStep;
