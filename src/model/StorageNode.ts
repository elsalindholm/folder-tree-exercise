export interface StorageNode {
  id: string;
  type: string;
  label: string;
  parentId: string;
  childrenIds?: string[];
  content?: string;
}
