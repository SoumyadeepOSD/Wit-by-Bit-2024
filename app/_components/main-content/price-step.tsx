import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ImageUp } from 'lucide-react';


const PriceStep = () => {
  return (
    <Card className="ml-5 mt-5 w-[37%]">
            <CardHeader>
                <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
               
                <p>price step</p>
            </CardContent>
            <CardFooter>
                <div className="flex flex-row items-center gap-2 px-4 py-3 hover:cursor-pointer hover:bg-sky-50">
                    <ImageUp color="#0284c7" />
                    <p className="text-sky-600 text-sm font-semibold">Upload Image</p>
                </div>
            </CardFooter>
        </Card>
  )
}

export default PriceStep