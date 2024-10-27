/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { CombinationPropType } from '@/types/combinationType';
import { breadCrumSteps } from '@/constants/breadcrum-steps';
import { useGlobalContext } from '@/app/Context/store';
import { VariantPropType } from '@/types/variantType';
import { priceInfoType } from '@/types/priceIntoType';
import React, { useEffect, useState } from 'react'
import DescriptionStep from './description-step';
import CombinationStep from './combination-step';
import DefaultButton from '../buttons/button';
import { ProductType } from './main-content';
import { ChevronRight } from 'lucide-react';
import VariantStep from './variants-step';
import PriceStep from './price-step';
import { errorType } from '@/types/descriptionType';

interface addProductType {
    setAddProductActive: (active: boolean) => void;
    addProductActive: boolean;
    products: ProductType[];
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
    const {activeSteps, setActiveSteps, updateProducts, updateVariants, updateCombinations, updatePrice, updateDiscount,data} = useGlobalContext();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const variants = data[0].variants;
    const products = data[0].products;
    const [localVariant, setLocalVariant] = useState<VariantPropType[]>(variants);
    const [error, setError] = useState<errorType>({
        name:false,
        category:false,
        brand:false,
        image:false
    });

    const lastProductVariants = products[products.length - 1].variants;
    const variantValues = lastProductVariants.map(item => item.values);

    const permutations = generatePermutations(variantValues);
    const [combo, setCombo] = useState<CombinationPropType[]>(() =>
        permutations.map((perm:any, index:number) => ({
            name: perm.join('/'),
            sku: `SKU-${index + 1}`,
            quantity: 0,
            inStock: true
        }))
    );

    const [priceInfo, setPriceInfo] = useState<priceInfoType>({
        priceInr: 0,
        discount: 0,
        discountType: "pct"
    });


    const onHandleStep = () => {
        const nextStepIndex = currentStepIndex + 1;
        const newErrors: errorType = { name: false, category: false, brand: false, image: false };
        if (nextStepIndex === 1) {
            if (productName === "") {
                newErrors.name = true;
            }
            if (productCategory.length === 0) {
                newErrors.category = true;
            }
            if (productBrand.length === 0) {
                newErrors.brand = true;
            }
            if (image === "") {
                newErrors.image = true;
            }
    
            // If any error exists, update the `error` state and return to prevent moving to the next step
            if (Object.values(newErrors).some((error) => error)) {
                setError(newErrors);
                return;
            }
        }
    

        if(nextStepIndex===2 && localVariant.some(v=>v.name.length===0 || v.values.length===0)) return;

        if(nextStepIndex===3 && (combo.some(c=>c.inStock===true && c.quantity<1)) || (combo.some(c=>c.sku===""))) return;

        

        
        if (nextStepIndex < breadCrumSteps.length) {
            setCurrentStepIndex(nextStepIndex);
            setActiveSteps((prevActiveSteps) => [
                ...prevActiveSteps,
                breadCrumSteps[nextStepIndex].stepName,
            ]);
        }
    };
    const onHandleBackStep = ()=>{
        const nextStepIndex = currentStepIndex - 1;
        if (nextStepIndex >= 0) {
            setCurrentStepIndex(nextStepIndex);
            setActiveSteps((prevActiveSteps)=>{
                const newActiveSteps = [...prevActiveSteps];
                newActiveSteps.pop();
                return newActiveSteps;
            });
        }
    }

    const onFinalSubmit = () => {
        if(priceInfo.discount.toString().length===0 || priceInfo.priceInr.toString()===" " || priceInfo.priceInr<1) return;
        updatePrice(products.length - 1, priceInfo.priceInr);
        const discountData = {
            method: priceInfo.discountType,
            value: priceInfo.discount,
        };
        updateDiscount(products.length - 1, discountData);
        setActiveSteps([breadCrumSteps[0].stepName]); // Reset activeSteps here
        onCancel();
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
        console.log("local-variants", localVariant);

        updateVariants(products.length-1, localVariant);
    };

    const handleUpdateCombination = () => {
        // Transform the combo array into an object
        const combinationsObject = combo.reduce((acc:any, item, index) => {
            // Generating unique key like "a", "b", etc.
            const key = String.fromCharCode(97 + index); // 97 is the ASCII code for 'a'
            acc[key] = {
                name: item.name,
                sku: item.sku,
                quantity: item.quantity,
                inStock: item.inStock
            };
            return acc;
        }, {});
    
        // Now call updateCombinations with the transformed object
        updateCombinations(products.length - 1, combinationsObject);
    };
    

    useEffect(()=>{
        if(activeSteps.length===2) handleUpdateProduct();
    },[activeSteps]);

    useEffect(()=>{
        if (activeSteps.length===3 && localVariant.some(v=>v.name.length!==0 && v.values.length!==0)) handleUpdateVariant();
    },[activeSteps]);

    useEffect(()=>{
        if(activeSteps.length===4) handleUpdateCombination();
    },[activeSteps]);

    useEffect(()=>{
        console.log(priceInfo);
    },[priceInfo]);

    useEffect(() => {
        const variantValues = localVariant.map(item => item.values);
        const permutations = generatePermutations(variantValues);
        
        // Update `combo` with new permutations
        const updatedCombo = permutations.map((perm:any, index:number) => ({
            name: perm.join('/'),
            sku: `SKU-${index + 1}`,
            quantity: 0,
            inStock: true
        }));
        setCombo(updatedCombo);

        // Ensure `data` is updated with the new combinations
        updateCombinations(products.length - 1, updatedCombo);
    }, [localVariant]);

    const [productName, setProductName] = useState<string>("");
    const [productCategory, setProductCategory] = useState("");
    const [productBrand, setProductBrand] = useState<string>("");
    const [image, setImage] = useState<string>("");

    return (
        <div className="w-full flex flex-col items-start h-screen">
            <div className="px-5 pt-5 bg-white w-full flex flex-row items-start justify-between">
                <p className="text-xl font-semibold">Add Product</p>
                <div className="flex flex-row gap-2">
                    {activeSteps.length===1 && (<div onClick={onCancel}>
                        <DefaultButton label="Cancel" varient="secondary" size={''} />
                    </div>)}
                    {activeSteps.length>1 && (<div onClick={onHandleBackStep}>
                        <DefaultButton label="Back" varient="secondary" size={''} />
                    </div>)}
                    {activeSteps.length<4&&(<div onClick={onHandleStep}>
                        <DefaultButton label="Next" varient="primary" size={''} />
                    </div>)}
                    {activeSteps.length===4&&(<div onClick={onFinalSubmit}>
                        <DefaultButton label="Confirm" varient="primary" size={''} />
                    </div>)}
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
                    error = {error}
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
                (<PriceStep
                    priceInfo={priceInfo}
                    setPriceInfo={setPriceInfo}
                />)
            }
        </div>
    )
}

export default AddProduct