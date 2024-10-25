export const sampleData = [{
    categories: [
        {
            id: "abc",
            name: "Shoes"
        },
        {
            id: "xyz",
            name: "T-shirt"
        }
    ],
    variants: [
        {
            name: "Size",
            values: ['M', 'L']
        },
        {
            name: "Color",
            values: ['Black', 'Red']
        }
    ],
    products: [
        {
            name: "",
            category: "", // This should correspond to the id of a category, e.g., "abc" for "Shoes"
            brand: "",
            image: "",
            variants: [
                {
                    name: "Size",
                    values: ['M', 'L']
                },
                {
                    name: "Color",
                    values: ['Black', 'Red']
                }
            ],
            combinations: {
                "a": {
                    name: "M/Black",
                    sku: "ABC12",
                    quantity: 4,
                    inStock: false
                },
                "b": {
                    name: "L/Red",
                    sku: "ABC12",
                    quantity: null,
                    inStock: true
                }
            },
            priceInr: 500,
            discount: {
                method: "pct", // pct | flat
                value: 12
            }
        },
        {
            name: "Nike Air Jordan",
            category: "abc", // This should correspond to the id of a category, e.g., "abc" for "Shoes"
            brand: "Nike",
            image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/98aead6e-88f7-4d0f-9f55-9fb0708ce078/AIR+VAPORMAX+2023+FK+SE.png",
            variants: [
                {
                    name: "Size",
                    values: ['M', 'L']
                },
                {
                    name: "Color",
                    values: ['Black', 'Red']
                }
            ],
            combinations: {
                "a": {
                    name: "M/Black",
                    sku: "ABC12",
                    quantity: 4,
                    inStock: false
                },
                "b": {
                    name: "L/Red",
                    sku: "ABC12",
                    quantity: null,
                    inStock: true
                }
            },
            priceInr: 12000,
            discount: {
                method: "pct", // pct | flat
                value: 12
            }
        },
        {
            name: "Nike Dunk Low",
            category: "abc", // This should correspond to the id of a category, e.g., "abc" for "Shoes"
            brand: "Nike",
            image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/98aead6e-88f7-4d0f-9f55-9fb0708ce078/AIR+VAPORMAX+2023+FK+SE.png",
            variants: [
                {
                    name: "Size",
                    values: ['M', 'L']
                },
                {
                    name: "Color",
                    values: ['Black', 'Red']
                }
            ],
            combinations: {
                "a": {
                    name: "M/Black",
                    sku: "ABC12",
                    quantity: 4,
                    inStock: false
                },
                "b": {
                    name: "L/Red",
                    sku: "ABC12",
                    quantity: null,
                    inStock: true
                }
            },
            priceInr: 8000,
            discount: {
                method: "pct", // pct | flat
                value: 12
            }
        }
    ]
}];
