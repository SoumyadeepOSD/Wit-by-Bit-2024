/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2Icon, XIcon } from 'lucide-react';
import React, { useState } from "react";
import { useGlobalContext } from "@/app/Context/store";

interface Variant {
    name: string;
    values: string[];
}

interface VariantStepProps {
    localVariant: Variant[];
    setLocalVariant: React.Dispatch<React.SetStateAction<Variant[]>>;
}


const VariantStep = ({localVariant, setLocalVariant}:VariantStepProps) => {
    const [newValue, setNewValue] = useState<string>(""); // Track the current input value for adding new values
    const [currentVariantIndex, setCurrentVariantIndex] = useState<number | null>(null);

    const {activeSteps} = useGlobalContext();


    

    // Remove a sub-variant value
    const removeSubVariant = (variantIndex: number, subVariantIndex: number) => {
        setLocalVariant((prevVariants) =>
            prevVariants.map((variant, index) => {
                if (index === variantIndex) {
                    const updatedValues = variant.values.filter((_, valueIndex) => valueIndex !== subVariantIndex);
                    return { ...variant, values: updatedValues };
                }
                return variant;
            })
        );
    };

    // Delete a full variant
    const deleteVariant = (variantIndex: number) => {
        setLocalVariant((prevVariants) => prevVariants.filter((_, index) => index !== variantIndex));
    };

    // Add a new variant with an empty key and empty values array
    const addNewVariant = () => {
        const newVariant = {
            name: "",
            values: []
        };
        setLocalVariant([...localVariant, newVariant]);
    };

    // Handle Enter key to add a new value to the correct variant
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Enter' && newValue.trim()) {
            setLocalVariant((prevVariants) =>
                prevVariants.map((variant, variantIndex) => {
                    if (variantIndex === index) {
                        return {
                            ...variant,
                            values: [...variant.values, newValue], // Add the new value to the variant's values array
                        };
                    }
                    return variant;
                })
            );
            setNewValue(""); // Clear the input field after pressing Enter
        }
    };

    // Update the key (name) of a specific variant
    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newKey = e.target.value;
        setLocalVariant((prevVariants) =>
            prevVariants.map((variant, variantIndex) => {
                if (variantIndex === index) {
                    return {
                        ...variant,
                        name: newKey, // Update the name of the variant
                    };
                }
                return variant;
            })
        );
    };

    return (
        <Card className="ml-5 mt-5 w-[37%]">
            <CardHeader>
                <CardTitle>Variants {activeSteps.length}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row items-center justify-start gap-14 w-[60%]">
                    <p>Option *</p>
                    <p>Values *</p>
                </div>
                {
                    localVariant.map((item, index) => (
                        <div key={index} className="flex flex-row items-center justify-start gap-2 w-full my-2">
                            <Input
                                className="w-[110px]"
                                placeholder=""
                                value={item.name}
                                onChange={(e) => handleKeyChange(e, index)}
                            />
                            <div className="flex flex-row items-center justify-start border-gray-200 border-[1px] rounded-md py-[5px]">
                                {
                                    item.values.map((var_value, var_value_index) => (
                                        <div key={`${index}-${var_value_index}`} className="flex flex-row items-center justify-around bg-gray-200 rounded-md max-w-fit gap-2 px-2 mx-1">
                                            <p>{var_value}</p>
                                            <XIcon color="black" size={20} onClick={() => { removeSubVariant(index, var_value_index) }} className="hover:cursor-pointer" />
                                        </div>
                                    ))
                                }
                                <Input
                                    placeholder=""
                                    className="border-white focus-visible:outline-none"
                                    value={index === currentVariantIndex ? newValue : ''} // Show input value for the current variant
                                    onChange={(e) => {
                                        setNewValue(e.target.value);
                                        setCurrentVariantIndex(index); // Track the current variant index
                                    }}
                                    onKeyDown={(e) => handleKeyDown(e, index)} // Handle Enter key
                                />
                            </div>
                            <Trash2Icon color="red" size={24} className="hover:cursor-pointer" onClick={() => { deleteVariant(index) }} />
                        </div>
                    ))
                }
            </CardContent>
            <CardFooter>
                <div className="flex flex-row items-center gap-2 hover:cursor-pointer hover:bg-sky-50" onClick={addNewVariant}>
                    <Plus color="#0284c7" />
                    <p className="text-sky-600 text-sm font-semibold">Add Option</p>
                </div>
            </CardFooter>
        </Card>
    );
};

export default VariantStep;
