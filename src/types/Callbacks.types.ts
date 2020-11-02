export interface Callbacks {
  onInit?: (cy: cytoscape.Core, id: string) => void;
  onDestroy?: (cy: cytoscape.Core | undefined) => void;
  onRender?: (options: any) => void;
  onDblClick?: (event: any, eventFrom: string) => void;
  onClick?: (event: any, eventFrom: string) => void;
  onCxtTap?: (event: any, eventFrom: string) => void;
}
