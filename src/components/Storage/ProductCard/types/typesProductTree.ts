export interface ProductTree {
productGroups:{
        id: number;
        name: string;
        code: string;
        children: ProductTree[];
}}