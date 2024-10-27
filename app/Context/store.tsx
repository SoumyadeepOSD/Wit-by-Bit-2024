"use client";

import {createContext, useContext, Dispatch, SetStateAction, useState} from "react";
import { sampleData } from "@/constants/sample-data";
import { breadCrumSteps } from "@/constants/breadcrum-steps";
import { sidebarItems } from "@/constants/menu-items";

interface sidebarmenuType{
    id: number;
    label: string;
}

interface GlobalContextType{
    data: typeof sampleData;
    setData: Dispatch<SetStateAction<typeof sampleData>>;
    activeSteps: string[];
    menu: sidebarmenuType;
    setActiveMenu: Dispatch<SetStateAction<sidebarmenuType>>
    setActiveSteps: Dispatch<SetStateAction<string[]>>;
    updateCategories: (newCategories: typeof sampleData[0]["categories"])=>void;
    updateProducts: (newProducts: typeof sampleData[0]["products"][0])=>void;
    updateVariants: (productIndex:number, newVariants: typeof sampleData[0]["products"][0]["variants"])=>void;
    updateCombinations: (productIndex: number, newCombinations: typeof sampleData[0]["products"][0]["combinations"])=>void;
    updatePrice: (productIndex: number, newPrice: typeof sampleData[0]["products"][0]["priceInr"])=>void;
    updateDiscount: (productIndex: number, newDiscount: typeof sampleData[0]["products"][0]["discount"])=>void;
}


const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface childrenType{
    children: React.ReactNode;
}

export const GlobalContextProvider = ({children}:childrenType) => {

    const [data, setData] = useState(sampleData);
    const [activeSteps, setActiveSteps] = useState<string[]>([breadCrumSteps[0].stepName]); // Initialize step state here
    const [menu, setActiveMenu] = useState<sidebarmenuType>({
        id:3,
        label: sidebarItems[2].label
    });

    const updateCategories = (newCategories: typeof sampleData[0]["categories"]) => {
        const updatedData = [...data];
        updatedData[0].categories = newCategories;
        setData(updatedData);
    };

    const updateProducts = (newProduct: typeof sampleData[0]["products"][0]) => {
        setData((prevData) => {
            const updatedData = [...prevData];
            // Check if the product already exists
            if (!updatedData[0].products.some(product => product.name === newProduct.name)) {
                updatedData[0].products = [...updatedData[0].products, newProduct];
            }
            return updatedData;
        });
    };
    
    
    

    const updateVariants = (
        productIndex: number,
        newVariants: typeof sampleData[0]["products"][0]["variants"]
    ) => {
        const updatedData = [...data];
        updatedData[0].products[productIndex].variants = [
            ...updatedData[0].products[productIndex].variants, // keep existing variants
            ...newVariants // add new variants
        ];
        setData(updatedData);
    };
    
    
    const updateCombinations = (
        productIndex: number,
        newCombinations: typeof sampleData[0]["products"][0]["combinations"]
    )=>{
        const updatedData = [...data];
        updatedData[0].products[productIndex].combinations = newCombinations;
        setData(updatedData);
    };

    const updatePrice = (
        productIndex: number,
        newPrice: typeof sampleData[0]["products"][0]["priceInr"]
    )=>{
        const updatedData = [...data];
        updatedData[0].products[productIndex].priceInr = newPrice;
        setData(updatedData);
    }

    const updateDiscount = (
        productIndex: number,
        newDiscount: typeof sampleData[0]["products"][0]["discount"]
    ) => {
        const updatedData = [...data];
        updatedData[0].products[productIndex].discount = newDiscount;
        setData(updatedData);
    };

    return(
        <GlobalContext.Provider
            value={{
                data,
                setData,
                activeSteps,
                menu,
                setActiveMenu,
                setActiveSteps,
                updateCategories,
                updateProducts,
                updateVariants,
                updateCombinations,
                updatePrice,
                updateDiscount
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);
    if(context===undefined){
        throw new Error("useGlobalContext must be used within a GlobalContextProvider");
    }
    return context;
};