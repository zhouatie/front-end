export default {
  props: {
    tag: {
      type: String,
      default: 'a',
    },
    to: String,
  },
  methods: {
    handler() {
      this.$router.push(this.to);
    },
  },
  render() {
    const tag = this.tag;
    console.log(this.$slots.default, 'this.$slots.default')
    return <tag onClick={this.handler}>{this.$slots.default}</tag>;
  },
};
