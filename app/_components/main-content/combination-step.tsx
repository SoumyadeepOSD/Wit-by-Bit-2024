/* eslint-disable @typescript-eslint/no-explicit-any */
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { CombinationPropType, comboProp } from '@/types/combinationType';
import { Switch } from '@/components/ui/switch';
import { Input } from "@/components/ui/input";
import React from 'react';



const CombinationStep = ({combo, setCombo}:comboProp) => {
    // Handler to update the SKU, quantity, or inStock state
    const handleInputChange = (index: number, field: string, value: any) => {
        setCombo((prev) =>
            prev.map((item, idx) =>
                idx === index ? { ...item, [field]: value } : item
            )
        );
    };


    const hasDuplicateSKUs = (combo:CombinationPropType[]) => {
        const seenSKUS = new Set();
        for(const item of combo){
            if(seenSKUS.has(item.sku) && item.sku.trim()){
                return true;
            }
            seenSKUS.add(item.sku);
        }
        return false
    };



    return (
        <Card className="ml-5 mt-5 max-w-fit overflow-y-scroll overflow-x-hidden scrollbar-hide mb-10">
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
                                    onChange={(e) =>{ 
                                        const val = parseInt(e.target.value);
                                        handleInputChange(index, 'quantity', val < 0 ? 0 : val);
                                    }}
                                />
                            </div>
                        </div>
                    ))
                }
                {hasDuplicateSKUs(combo) && <p className="text-red-500 mt-2">Duplicate SKU</p>}
            </CardContent>
            <CardFooter>
                {combo.some(c=>c.inStock===true && c.quantity<1) ? <p className="text-red-500">Quantity can&apos;t be empty</p>:""}
                {combo.some(c=>c.sku==="") ? <p className="text-red-500">SKU can&apos;t be empty</p>:""}
            </CardFooter>
        </Card>
    );
};

export default CombinationStep;
