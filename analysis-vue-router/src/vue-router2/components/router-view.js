export default {
  functional: true,

  render(h, { parent, data }) {
    let depth = 0;
    const route = parent.$route;
    console.log(parent, 'parentparentparent');
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      parent = parent.$parent;
    }
    data.routerView = 1;
    const record = route.matched[depth];
    console.log(record, depth, route, 'depth');
    if (!record) {
      return h();
    }
    return h(record.component, data);
  },
};
