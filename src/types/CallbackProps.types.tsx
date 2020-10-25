export interface ICallbackProps {
    onDestroy?: (cy: any) => void
    onInit?: (cy: any) => void
    onRender?: (cy: any) => void
    onDblClick?: ({ event, eventFrom }) => void
    onClick?: ({ event, eventFrom }) => void
    onCxtTap?: ({ event, eventFrom }) => void
}
