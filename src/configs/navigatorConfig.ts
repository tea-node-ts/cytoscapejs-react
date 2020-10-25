const navigatorConfig = {
    viewLiveFramerate: 0, // false-在拖动结束时修改graph pan; 0-拖动过程中及时修改graph pan; 数字-每秒更新不超过指定次数
    thumbnailEventFramerate: 1, // max thumbnail's updates per second triggered by graph updates
    thumbnailLiveFramerate: false, // max thumbnail's updates per second. Set false to disable
    dblClickDelay: 200, // milliseconds
    removeCustomContainer: true, // destroy the container specified by user on plugin destroy
    rerenderDelay: 100 // ms to throttle rerender updates to the panzoom for performance
}

export default navigatorConfig
