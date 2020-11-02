import debounce from 'lodash/debounce';

let clickTimer: any;
let isDblClick = true;
let callbackProps: any = null;
let cyInstance: any = null;
let layoutRunning = false;

export const bindEvents = (cy: any, events = {}, callback = {}): void => {
  callbackProps = callback;
  cyInstance = cy;
  cy.on('click', handleClick)
    .on('render', handleRender)
    .on('layoutstart', handleLayoutStart)
    .on('layoutstop', handleLayoutStop)
    .on('cxttap', handleCxtTap);
  Object.keys(events).forEach((key) => {
    cy.on(key, (events as any)[key]);
  });
};

/**
 * 获取触发事件的对象类型（画布、节点、边）
 */
const getEventFrom = (eventTarget: any) => {
  let eventFrom = 'empty';

  if (eventTarget === cyInstance) {
    // 点击画布空白处
    eventFrom = 'empty';
  } else if (eventTarget.isNode()) {
    // 点击画布中的节点
    eventFrom = 'node';
  } else if (eventTarget.isEdge()) {
    // 点击画布中的边
    eventFrom = 'edge';
  }

  return eventFrom;
};

/**
 * 点击事件
 */
const handleClick = (event: any) => {
  const eventFrom = getEventFrom(event.target);

  if (callbackProps.onClick) {
    // 如果只监听了click事件，执行onClick回调
    callbackProps.onClick(event, eventFrom);
    return;
  }

  if (!callbackProps.onDblClick) {
    return;
  }

  // 如果监听了dblClick事件，需要模拟双击事件
  if (clickTimer) {
    clearTimeout(clickTimer);
    clickTimer = null;
  }

  if (isDblClick) {
    callbackProps.onDblClick(event, eventFrom);
    isDblClick = false;
    return;
  }

  isDblClick = true;

  clickTimer = setTimeout(() => {
    isDblClick = false;
    if (callbackProps.onClick) {
      callbackProps.onClick(event, eventFrom);
    }
  }, 300);
};

/**
 * 布局开始时回调
 */
const handleLayoutStart = () => {
  layoutRunning = true;
};

/**
 * 布局结束时的回调
 */
const handleLayoutStop = () => {
  layoutRunning = false;
  if (callbackProps.onLayoutStop) {
    callbackProps.onLayoutStop();
  }
};

/**
 * 画布渲染/重新渲染时回调
 */
const handleRender = debounce(() => {
  const { onRender } = callbackProps;
  if (!layoutRunning && onRender) {
    const {
      elements: { nodes = [], edges = [] },
      ...others
    } = cyInstance.json();
    onRender({ ...others, elements: { nodes, edges } });
  }
}, 300);

/**
 * 右键点击时的回调
 */
const handleCxtTap = (event: any) => {
  const { target } = event;
  const eventFrom = getEventFrom(target);

  if (callbackProps.onCxtTap) {
    callbackProps.onCxtTap(event, eventFrom);
  }
};
