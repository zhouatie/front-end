import { compareVdom } from './react-dom';

export const updateQueue = {
  isUpdating: false,
  queue: new Set(),
  batchUpdater() {
    // console.log('batchUpdater 开始 ------------');

    // console.log(this.queue, 'this.queue');
    this.isUpdating = false;
    this.queue.forEach((updater) => {
      updater.update();
    });
    this.queue.clear();
    // console.log('batchUpdater 结束 ------------');
  },
};
class Updater {
  constructor(instance) {
    this.instance = instance;
    this.states = [];
  }
  update() {
    // console.log('函数执行 ===> update()');
    Object.assign(this.instance.state, ...this.states);
    this.instance.forceUpdate();
  }
  addState(newState) {
    this.states.push(newState);
  }
  EmitUpdate(nextProps) {
    this.instance.props = nextProps;
    this.instance.forceUpdate();
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
    // console.log(newState, updateQueue.isUpdating, '函数执行 ======> setState');
    this.updater.addState(newState);
    // console.log(this.state, 'state');
    if (updateQueue.isUpdating) {
      updateQueue.queue.add(this.updater);
    } else {
      this.updateState();
    }
  }

  updateState() {
    this.updater.update();
  }

  forceUpdate() {
    let bool = true;
    if (this.shouldComponentUpdate) {
      bool = this.shouldComponentUpdate(this.props, this.state);
    }
    bool && this.updateComponent();
    // console.log('forceUpdate 函数执行 -------------');
  }

  updateComponent() {
    if (this.componentWillUpdate) this.componentWillUpdate();
    const newRenderVdom = this.render();
    newRenderVdom.instance = this;
    // debugger;
    const oldRenderVdom = this.oldRenderVdom;
    // const dom = oldRenderVdom.dom;
    const dom = this.dom;
    // TODO:
    compareVdom(dom.parentNode, oldRenderVdom, newRenderVdom);
    this.oldRenderVdom = newRenderVdom;

    if (this.componentDidUpdate) this.componentDidUpdate();
  }
}
