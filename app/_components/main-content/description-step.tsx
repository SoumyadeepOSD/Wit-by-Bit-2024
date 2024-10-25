import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { ImageUp } from 'lucide-react';
import { useGlobalContext } from '@/app/Context/store';
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

interface DescriptionProps{
    productName: string;
    setProductName: (name:string)=>void;
    productCategory: string;
    setProductCategory: (category:string)=>void;
    productBrand: string;
    setProductBrand: (brand:string)=>void;
    image: string;
    setImage: (image:string)=>void;
};


const DescriptionStep = ({setProductName, setProductCategory, setProductBrand, setImage}:DescriptionProps) => {
    const {data} = useGlobalContext();
    const categories = data[0].categories;
    return (
        <Card className="ml-5 mt-5 w-[37%]">
            <CardHeader>
                <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
                <Label htmlFor="email">Product name *</Label>
                <Input onChange={(e) => { setProductName(e.target.value) }} />
                <Label htmlFor="email">Category *</Label>
                <Select onValueChange={(e) => setProductCategory(e)}>
                    <SelectTrigger className="w-full">
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
                <Label htmlFor="email">Brand *</Label>
                <Input onChange={(e) => { setProductBrand(e.target.value) }} />
            </CardContent>
            <CardFooter>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <div className="border-[1px] border-sky-600 rounded-lg flex flex-row items-center gap-2 px-4 py-3 hover:cursor-pointer hover:bg-sky-50">
                            <ImageUp color="#0284c7" />
                            <p className="text-sky-600 text-sm font-semibold">Upload Image</p>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Put your product image?</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Label>Paste image link here *</Label>
                                <Input onChange={(e) => setImage(e.target.value)} />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
};

export default DescriptionStep;
