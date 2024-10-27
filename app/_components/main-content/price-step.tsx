import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface priceInfoType {
    priceInr: number;
    discount: number;
    discountType: string;
}

interface PriceStepProp {
    priceInfo: priceInfoType;
    setPriceInfo: React.Dispatch<React.SetStateAction<priceInfoType>>;
}

const PriceStep = ({ priceInfo, setPriceInfo }: PriceStepProp) => {
   
    // Toggle function without argument, switching based on current state
    const toggleDiscountType = () => {
        setPriceInfo((prev) => ({
            ...prev,
            discountType: prev.discountType === "pct" ? "flat" : "pct",
        }));
    };

    const handleInputChange = (field: keyof priceInfoType, value: number | string) => {
        setPriceInfo((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <Card className="ml-5 mt-5 w-[37%]">
            <CardHeader>
                <CardTitle>Price Info</CardTitle>
            </CardHeader>
            <CardContent>
                <Label htmlFor="text">Price *</Label>
                {priceInfo.priceInr.toString().length!=0 && <span className="px-2 relative top-[30px] -left-10 text-black">₹</span>}
                <Input 
                    value={priceInfo.priceInr}
                    onChange={(e) => handleInputChange("priceInr", e.target.value)} 
                    className="pl-6"
                />
                <Label htmlFor="text">Discount</Label>
                <div className="flex flex-row items-center gap-5 justify-start">
                    <Input 
                        value={priceInfo.discount}
                        onChange={(e) => handleInputChange("discount", e.target.value)} 
                    />
                    <div className="w-24 h-10 bg-[#E6EEF2] rounded-lg grid grid-cols-2 border-2 border-[#E6EEF2]">
                        <div
                            className={`flex items-center justify-center ${priceInfo.discountType === "pct" ? "bg-transparent" : "bg-white"} rounded-l-lg hover:cursor-pointer`}
                            onClick={toggleDiscountType}
                        >
                            <p>%</p>
                        </div>
                        <div
                            className={`flex items-center ${priceInfo.discountType === "pct" ? "bg-white" : "bg-transparent"} justify-center rounded-r-lg hover:cursor-pointer`}
                            onClick={toggleDiscountType}
                        >
                            <p>$</p>
                        </div>
                    </div>
                </div>
                {priceInfo.discount.toString().length===0&&(<p className="text-red-500 mt-2">Discount can&apos;t be empty</p>)}
                {priceInfo.priceInr.toString()===" " || priceInfo.priceInr<1&&(<p className="text-red-500 mt-2">Price can&apos;t be empty or 0</p>)}
            </CardContent>
        </Card>
    );
};

export default PriceStep;
