export interface INavigatorConfig {
    /**
     * false-在拖动结束时修改graph pan; 0-拖动过程中及时修改graph pan; 数字-每秒更新不超过指定次数
     */
    viewLiveFramerate: number
    /**
     * 画布更新时，每秒缩略图更新的最大次数
     */
    thumbnailEventFramerate: number // max thumbnail's updates per second triggered by graph updates
    /**
     * 每秒缩率图更新的最大次数。设置为false禁用缩率图实时更新
     */
    thumbnailLiveFramerate: boolean // max thumbnail's updates per second. Set false to disable
    /**
     * milliseconds
     */
    dblClickDelay: number
    /**
     * destroy the container specified by user on plugin destroy
     */
    removeCustomContainer: boolean
    /**
     * ms to throttle rerender updates to the panzoom for performance
     */
    rerenderDelay: number
}
