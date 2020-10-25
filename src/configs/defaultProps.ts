export const defaultProps = {
    className: '',
    global: '',
    elements: [],
    layout: {
        name: 'random'
    },
    layoutSelected: true,
    boxSelect: false,
    stylesheet: [
        {
            selector: '.hexagon',
            style: {
                shape: 'polygon',
                'shape-polygon-points':
                    '0 1, 0.8660254037844386 0.5, 0.8660254037844386 -0.5, 0 -1, -0.8660254037844386 -0.5, -0.8660254037844386 0.5'
            }
        }
    ],
    // 事件回调
    onDestroy: null,
    afterInit: null
}
