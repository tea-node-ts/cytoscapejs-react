import React, { useState, useRef, useEffect } from 'react'
import classnames from 'classnames'
import { INavigator } from '../types/Navigator.types'
import 'cytoscape-navigator/cytoscape.js-navigator.css'
import '../scss/navigator.scss'

const Navigator: React.FC<INavigator> = props => {
    const [dragging, setDragging] = useState(false)
    const [mouseDownX, setMouseDownX] = useState(0)
    const [mouseDownY, setMouseDownY] = useState(0)
    const [initialLeft, setInitialLeft] = useState(0)
    const [initialTop, setInitialTop] = useState(0)

    const containerRef: React.RefObject<HTMLDivElement> = useRef(null)
    const headerRef: React.RefObject<HTMLDivElement> = useRef(null)

    const handleMouseMove = e => {
        if (!dragging) {
            return
        }

        const deltaX = e.pageX - mouseDownX
        const deltaY = e.pageY - mouseDownY

        let left = initialLeft + deltaX
        let top = initialTop + deltaY

        const parentWidth = containerRef.current.offsetParent.clientWidth
        const parentHeight = containerRef.current.offsetParent.clientHeight
        const { offsetWidth, offsetHeight } = containerRef.current

        if (left + offsetWidth > parentWidth) {
            left = parentWidth - offsetWidth
        }

        const modalBodyPadding = getComputedStyle(containerRef.current).padding || ''
        const [paddingTop, , paddingBottom] = modalBodyPadding.split(' ')
        let actualPaddingBottom = paddingBottom
        if (!actualPaddingBottom) {
            actualPaddingBottom = paddingTop || '0px'
        }

        const height = offsetHeight - parseFloat(actualPaddingBottom)
        if (top + height > parentHeight) {
            top = parentHeight - height
        }

        if (left < 0) {
            left = 0
        }
        if (top < 0) {
            top = 0
        }

        containerRef.current.style.left = `${left}px`
        containerRef.current.style.top = `${top}px`
    }

    const handleMouseUp = () => {
        const currentDragging = dragging
        setDragging(false)
        window.removeEventListener('mouseup', handleMouseUp, false)
        window.removeEventListener('mousemove', handleMouseMove, false)
        if (currentDragging && props.afterDragging) {
            props.afterDragging()
        }
    }

    const handleMouseDown = e => {
        setDragging(true)
        setMouseDownX(e.pageX)
        setMouseDownY(e.pageY)
        setInitialLeft(containerRef.current.offsetLeft)
        setInitialTop(containerRef.current.offsetTop)

        window.addEventListener('mouseup', handleMouseUp, false)
        window.addEventListener('mousemove', handleMouseMove, false)
    }

    useEffect(() => {
        headerRef.current.addEventListener('mousedown', handleMouseDown)
        return () => {
            headerRef.current.removeEventListener('mousedown', handleMouseDown)
        }
    }, [props.parentId])

    const handleDoubleClick = e => {
        e.stopPropagation()
    }

    return (
        <div
            ref={containerRef}
            className={classnames('navigator-cytoscape-cr', props.className || '')}
            onDoubleClick={handleDoubleClick}
        >
            <div ref={headerRef} className={classnames('header-navigator-cytoscape-cr', props.headerClassName || '')}>
                导航器
            </div>
            <div id={`navigator-${props.parentId}`} className="cytoscape-navigator" role="presentation" />
        </div>
    )
}

export default Navigator
