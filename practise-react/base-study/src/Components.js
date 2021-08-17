import { compareVdom } from './react-dom';

export const updateQueue = {
  isUpdating: false,
  queue: new Set(),
  batchUpdater() {
    console.log('batchUpdater 开始 ------------');

    console.log(this.queue, 'this.queue');
    this.isUpdating = false;
    this.queue.forEach((updater) => {
      updater.update();
    });
    this.queue.clear();
    console.log('batchUpdater 结束 ------------');
  },
};
class Updater {
  constructor(instance) {
    this.instance = instance;
    this.states = [];
  }
  update() {
    console.log('函数执行 ===> update()');
    Object.assign(this.instance.state, ...this.states);
    console.log(this.instance.state, 'this.instance.state');
    this.instance.forceUpdate();
  }
  addState(newState) {
    this.states.push(newState);
  }
}

export class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }

  setState(newState) {
    console.log(newState, '函数执行 ======> setState');
    this.updater.addState(newState);
    console.log(this.state, 'state');
    if (updateQueue.isUpdating) {
      updateQueue.queue.add(this.updater);
    } else {
      // this.updateComponent();
    }
  }

  forceUpdate() {
    console.log('forceUpdate 函数执行 -------------');
    this.updateComponent();
  }

  updateComponent() {
    const newRenderVdom = this.render();
    console.log(newRenderVdom, 'newRenderDom');
    const oldRenderVdom = this.oldRenderVdom;
    const dom = oldRenderVdom.dom;
    // debugger
    compareVdom(dom.parentNode, oldRenderVdom, newRenderVdom);
  }
}
