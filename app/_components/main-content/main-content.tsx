/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useMemo, useState } from 'react';
import DefaultButton from '../buttons/button';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { sampleData } from '@/constants/sample-data';
import AddProduct from './add-product';
import { useGlobalContext } from '@/app/Context/store';

export interface ProductType {
  name: string;
  category: string;
  brand: string;
  image: string;
  variants: {
    name: string;
    values: string[];
  }[];
  combinations: {
    a: {
      name: string;
      sku: string;
      quantity: number;
      inStock: boolean;
    };
    b: {
      name: string;
      sku: string;
      quantity: null;
      inStock: boolean;
    };
  };
  priceInr: number;
  discount: {
    method: string;
    value: number;
  };
}

export interface CategoryType {
  id: string;
  name: string;
}

export interface ProductSectionProps {
  products: ProductType[];
  categoryName: string;
}


const ProductSection = ({ products, categoryName }: ProductSectionProps) => {
  return (
    <div className="flex flex-col items-start bg-[#D9D9D966] h-[80%] w-[250px] mx-6 my-5 rounded-xl pl-3 pt-3">
      <p className="mb-2 font-semibold text-sm">{categoryName}</p>
      {products.map((item: ProductType, index: number) => (
        <div key={item.name || index} className="flex flex-row items-start gap-3 bg-white shadow-gray-200 shadow-lg w-[95%] py-2 px-2 rounded-lg mb-3">
          <Image
            src={item.image}
            alt='product-image'
            height={20}
            width={60}
            style={{ objectFit: 'cover', height: 60 }}
            className="rounded-lg"
          />
          <div className="flex flex-col items-start gap-[3px]">
            <div>
              <p className=" font-semibold text-xs">{item.name}</p>
              <p className="text-xs">₹{item.priceInr}</p>
            </div>
            <div className="bg-sky-100 text-center px-2 py-[1px] rounded-md">
              <p className="text-sky-600 text-xs">{item.brand}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const MainContent = () => {
  const { data, updateCategories } = useGlobalContext();
  const initialProducts = data[0].products;
  const initialCategories = data[0].categories;

  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [categories, setCategories] = useState<CategoryType[]>(initialCategories);
  const [newCategory, setNewCategory] = useState<string>("");
  const [addProductActive, setAddProductActive] = useState(false);

  // Group products by category
  const categoryProductsMap: { [key: string]: ProductType[] } = categories.reduce((acc, category: CategoryType) => {
    acc[category.id] = products.filter(product => product.category === category.id);
    return acc;
  }, {} as { [key: string]: ProductType[] });

  const createCategory = () => {
    if (!newCategory.trim()) return; // Prevent adding empty categories

    // Generate a unique ID for the category
    const newId = `cat_${Date.now()}`; // Using timestamp to ensure uniqueness
    const updatedCategories = [
      ...categories,
      {
        id: newId,
        name: newCategory
      }
    ];
    setCategories(updatedCategories);
    updateCategories(updatedCategories);
    setNewCategory("");
  };

  const onAddProduct = () => {
    setAddProductActive(!addProductActive);
  };

  useEffect(() => {
    setProducts(data[0].products);
    setCategories(data[0].categories);
  }, [data]);


  if (addProductActive) {
    return (
      <AddProduct
        setAddProductActive={setAddProductActive}
        addProductActive={addProductActive}
        products={products}
      />
    );
  }
  return (
    <div className="w-full bg-white flex flex-col items-start h-screen">
      <div className="px-5 pt-3 bg-white w-full flex flex-row items-start justify-between">
        <p className="text-xl font-semibold">Products</p>
        <div className="flex flex-row gap-4">
          <AlertDialog>
            <AlertDialogTrigger>
              <DefaultButton label="Add Category" varient="secondary" size="large" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add Category</AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="mt-5">
                    <Label htmlFor="text" className="text-black font-extralight">Category name *</Label>
                    <Input
                      onChange={(e) => setNewCategory(e.target.value)}
                      value={newCategory} // Controlled input
                      className="text-black"
                    />
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-sky-600 bg-slate-200 hover:bg-slate-300">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-sky-600 hover:bg-sky-700"
                  onClick={createCategory}
                >
                  Save
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div onClick={onAddProduct}>
            <DefaultButton label="Add Product" varient="primary" size={"large"} />
          </div>
        </div>
      </div>
      <section className="grid grid-cols-3 items-start gap-2 h-full">
        {categories.map(({ id, name }) => (
          <ProductSection
            key={id}
            products={categoryProductsMap[id] || []}
            categoryName={name}
          />
        ))}
      </section>
    </div>
  );
};

export default MainContent;
