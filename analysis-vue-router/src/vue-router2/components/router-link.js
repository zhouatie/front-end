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
      console.log('this is handler');
      this.$router.push(this.to);
    },
  },

  render(h) {
    const tag = this.tag;
    console.log(this.$slots.default, 'this.$slots');
    return <tag onClick={this.handler}>{this.$slots.default}</tag>;
  },
};
