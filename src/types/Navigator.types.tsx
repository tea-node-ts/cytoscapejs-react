export interface INavigator {
    parentId: string
    className?: string
    headerClassName?: string
    afterDragging?: () => void
}
