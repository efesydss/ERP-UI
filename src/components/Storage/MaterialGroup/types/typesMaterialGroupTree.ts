export interface MaterialGroupTree {
  id: number;
  name: string;
  code: string;
  children?: MaterialGroupTree[];
}
