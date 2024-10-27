import { useGlobalContext } from '@/app/Context/store';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ImageUp } from 'lucide-react';
import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import { DescriptionProps } from '@/types/descriptionType';



const DescriptionStep = ({ productName, setProductName, productCategory, setProductCategory, productBrand, setProductBrand, image, setImage, error }: DescriptionProps) => {
    const { data } = useGlobalContext();
    const categories = data[0].categories;

    return (
        <Card className="ml-5 mt-5 w-[37%] shadow-lg shadow-gray-100 border-gray-100 border-[2px]">
            <CardHeader>
                <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
                <Label htmlFor="text" >Product name *</Label>
                <Input
                    className={`${error.name && "border-red-500 focus-visible:border-2 focus-visible:ring-0"} `}
                    onChange={(e) => { setProductName(e.target.value) }}
                    value={productName}
                />
                <div className="mt-2">
                    <Label htmlFor="text" className="mt-3">Category *</Label>
                    <Select 
                        onValueChange={(e) => setProductCategory(e)}
                        value={productCategory}
                    >
                        <SelectTrigger className={`w-full ${error.category && "border-red-500 focus-visible:border-2 focus-visible:ring-0" } `}>
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-2">
                    <Label htmlFor="text">Brand *</Label>
                    <Input
                        className={`${error.brand && "border-red-500 focus-visible:border-2 focus-visible:ring-0"} `}
                        onChange={(e) => { setProductBrand(e.target.value) }}
                        value={productBrand}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
                <AlertDialog>
                    <AlertDialogTrigger>
                        <div className={`border-[1px] ${error.image ? "border-red-500" : "border-sky-600"}  rounded-lg flex flex-row items-center gap-2 px-4 py-3 hover:cursor-pointer hover:bg-sky-50`}>
                            <ImageUp color="#0284c7" />
                            <p className="text-sky-600 text-sm font-semibold">Upload Image</p>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Put your product image?</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Label>Paste image link here *</Label>
                                <Input 
                                    onChange={(e) => setImage(e.target.value)} 
                                    value={image}
                                />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                {(error.name || error.category || error.brand || error.image) && (<p className="text-red-500 mt-2">All Field(s) must be filled</p>)}
            </CardFooter>
        </Card>
    );
};

export default DescriptionStep;
