"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2Icon, XIcon } from 'lucide-react';
import React, { useState } from "react";
import { VariantPropType, VariantStepProps } from "@/types/variantType";


const VariantStep = ({ localVariant, setLocalVariant }: VariantStepProps) => {
    const [newValue, setNewValue] = useState<string>(""); // Track the current input value for adding new values
    const [currentVariantIndex, setCurrentVariantIndex] = useState<number | null>(null);


    // Remove a sub-variant value
    const removeSubVariant = (variantIndex: number, subVariantIndex: number) => {
        setLocalVariant((prevVariants) =>
            prevVariants.map((variant: VariantPropType, index: number) => {
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
        setLocalVariant([...localVariant, newVariant]); // Add new variant
    };

    // Handle Enter key to add a new value to the correct variant
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Enter' && newValue.trim()) {
            const updatedVariants = localVariant.map((variant, variantIndex) => {
                if (variantIndex === index) {
                    return {
                        ...variant,
                        values: [...variant.values, newValue],
                    };
                }
                return variant;
            });
            setLocalVariant(updatedVariants);
            setNewValue("");
        }
    };

    // Update the key (name) of a specific variant
    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newKey = e.target.value;
        const updatedVariants = localVariant.map((variant, variantIndex) => {
            if (variantIndex === index) {
                return {
                    ...variant,
                    name: newKey,
                };
            }
            return variant;
        });
        setLocalVariant(updatedVariants);
    };

    return (
        <Card className="ml-5 mt-5 w-[37%]">
            <CardHeader>
                <CardTitle>Variants</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row items-center justify-start gap-14 w-[60%]">
                    <p>Option *</p>
                    <p>Values *</p>
                </div>
                {localVariant.map((item, index) => (
                    <div key={index} className="flex flex-row items-center justify-start gap-2 w-full my-2">
                        {/* Apply red border if option (name) is empty */}
                        <Input
                            className={`w-[110px] ${item.name.length === 0 ? "border-red-500" : ""} focus-visible:outline-none focus-visible:ring-0`}
                            placeholder=""
                            value={item.name}
                            onChange={(e) => handleKeyChange(e, index)}
                        />

                        <div className={`flex flex-row items-center justify-start border-gray-200 border-[1px] rounded-md overflow-x-scroll scrollbar-hide w-full ${item.values.length === 0 ? "border-red-500" : ""}`}>
                            {item.values.map((var_value, var_value_index) => (
                                <div key={`${index}-${var_value_index}`} className="flex flex-row items-center justify-around bg-gray-200 rounded-md max-w-fit gap-2 px-2 mx-1">
                                    <p>{var_value}</p>
                                    <XIcon color="black" size={20} onClick={() => { removeSubVariant(index, var_value_index) }} className="hover:cursor-pointer" />
                                </div>
                            ))}

                            {/* Apply red border if the new value input is empty */}
                            <div>
                                <Input
                                    placeholder=""
                                    className="border-white focus-visible:outline-none focus-visible:ring-0"
                                    value={index === currentVariantIndex ? newValue : ''}
                                    onChange={(e) => {
                                        setNewValue(e.target.value);
                                        setCurrentVariantIndex(index); // Track the current variant index
                                    }}
                                    onKeyDown={(e) => handleKeyDown(e, index)} // Handle Enter key
                                />
                            </div>
                        </div>

                        <div>
                            <Trash2Icon color="red" size={24} className="hover:cursor-pointer" onClick={() => { deleteVariant(index) }} />
                        </div>
                    </div>
                ))}

                {/* Display a warning if any option or values array is empty */}
                {localVariant.some(variant => variant.name.length === 0 || variant.values.length === 0) && (
                    <p className="text-red-500 mt-2">Option can&apos;t be empty</p>
                )}
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
