export default interface NavigatorProps {
  parentId: string;
  className?: string;
  headerClassName?: string;
  afterDragging?: () => void;
}
