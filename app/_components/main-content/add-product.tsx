/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from 'react'
import DefaultButton from '../buttons/button';
import { ChevronRight } from 'lucide-react';
import { ProductType } from './main-content';
import DescriptionStep from './description-step';
import VariantStep from './variants-step';
import CombinationStep from './combination-step';
import PriceStep from './price-step';
import { useGlobalContext } from '@/app/Context/store';
import { breadCrumSteps } from '@/constants/breadcrum-steps';



interface addProductType {
    setAddProductActive: (active: boolean) => void;
    addProductActive: boolean;
    products: ProductType[];
}

interface VariantProp {
    name: string;
    values: string[];
}

interface CombinationProp {
    name: string;
    sku: string;
    quantity: number;
    inStock: boolean;
}


const generatePermutations = (arrays: any[]) => {
    return arrays.reduce((acc: any[], curr: any[]) =>
        acc.flatMap((a: any) => curr.map((c: any) => [...a, c])), [[]]
    );
};



const AddProduct = ({ setAddProductActive, addProductActive }: addProductType) => {
    const onCancel = () => {
        if (addProductActive) {
            setAddProductActive(!addProductActive);
        }
    }

    const {activeSteps, setActiveSteps, updateProducts, updateVariants, data} = useGlobalContext();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const variants = data[0].variants;
    const products = data[0].products;
    const [localVariant, setLocalVariant] = useState<VariantProp[]>(variants);
    
    const lastProductVariants = products[products.length - 1].variants;
    const variantValues = lastProductVariants.map(item => item.values);

    const permutations = generatePermutations(variantValues);
    const [combo, setCombo] = useState<CombinationProp[]>(() =>
        permutations.map((perm:any, index:number) => ({
            name: perm.join('/'),
            sku: `SKU-${index + 1}`,
            quantity: 0,
            inStock: true
        }))
    );
    const onHandleStep = () => {
        const nextStepIndex = currentStepIndex + 1;
        if (nextStepIndex < breadCrumSteps.length) {
            setCurrentStepIndex(nextStepIndex);
            setActiveSteps((prevActiveSteps) => [
                ...prevActiveSteps,
                breadCrumSteps[nextStepIndex].stepName,
            ]);
        }
    };
    
    const handleUpdateProduct = () => {
        const updatedProduct = {
            name: productName,
            category: productCategory,
            brand: productBrand,
            image: image,
            variants: data[0].products[0].variants,
            combinations: data[0].products[0].combinations,
            priceInr: 1000, // Set a default price or get it from input
            discount: data[0].products[0].discount,
        };
        updateProducts(updatedProduct); // Call to updateProducts with the new product
        console.log(data);
    };

    const handleUpdateVariant=()=>{
        updateVariants(products.length-1, localVariant);
    };


    useEffect(()=>{
        if(activeSteps.length===2) handleUpdateProduct();
    },[activeSteps]);

    useEffect(()=>{
        if (activeSteps.length===3) handleUpdateVariant();
    },[activeSteps]);

    const [productName, setProductName] = useState<string>("");
    const [productCategory, setProductCategory] = useState("");
    const [productBrand, setProductBrand] = useState<string>("");
    const [image, setImage] = useState<string>("");


    return (
        <div className="w-full flex flex-col items-start h-screen">
            <div className="px-5 pt-3 bg-white w-full flex flex-row items-start justify-between">
                <p className="text-xl font-semibold">Add Product{activeSteps.length}</p>
                <div className="flex flex-row gap-2">
                    <div onClick={onCancel}>
                        <DefaultButton label="Cancel" varient="secondary" size={''} />
                    </div>
                    <div onClick={onHandleStep}>
                        <DefaultButton label="Next" varient="primary" size={''} />
                    </div>
                </div>
            </div>
            <section className="mx-5 mt-3 flex flex-row items-center justify-start">
                {
                    breadCrumSteps.map((item, index) => {
                        const isActive = activeSteps.includes(item.stepName);

                        return (
                            <div key={item.id || index} className="flex flex-row items-center gap-2">
                                <div
                                    className={`${isActive ? "bg-sky-100" : "bg-white"} px-3 py-1 rounded-lg hover:cursor-pointer`}
                                >
                                    <p className={`text-xs ${isActive ? "text-sky-600" : "text-slate-400"} font-semibold`}>
                                        {item.stepName}
                                    </p>
                                </div>
                                {index < breadCrumSteps.length - 1 && <ChevronRight />}
                            </div>
                        );
                    })
                }
            </section>
            {
                activeSteps.length===1?
                (<DescriptionStep
                    productName={productName}
                    setProductName={setProductName}
                    productCategory={productCategory}
                    setProductCategory={setProductCategory}
                    productBrand={productBrand}
                    setProductBrand={setProductBrand}
                    image={image}
                    setImage={setImage}
                />):
                activeSteps.length===2?
                (<VariantStep 
                    setLocalVariant={setLocalVariant} 
                    localVariant={localVariant}
                />):
                activeSteps.length===3?
                (<CombinationStep
                    setCombo={setCombo}
                    combo={combo}
                />):
                (<PriceStep/>)
            }
        </div>
    )
}

export default AddProduct