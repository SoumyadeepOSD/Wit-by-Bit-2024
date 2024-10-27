
export interface errorType{
    name: boolean;
    category: boolean;
    brand: boolean;
    image: boolean;
}


export interface DescriptionProps {
    productName: string;
    setProductName: (name: string) => void;
    productCategory: string;
    setProductCategory: (category: string) => void;
    productBrand: string;
    setProductBrand: (brand: string) => void;
    image: string;
    setImage: (image: string) => void;
    error: errorType;
}
