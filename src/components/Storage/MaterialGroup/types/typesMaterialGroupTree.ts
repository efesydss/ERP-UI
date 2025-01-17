export interface MaterialGroupTree{
materialGroups:{
             id: number;
             name: string;
             code: string;
             children: MaterialGroupTree[];
    }}
