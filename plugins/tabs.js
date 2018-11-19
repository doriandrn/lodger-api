export const tabs = {
  name: 'tabs',
  props: {
    defaultIndex: {
      default: 0,
      type: Number
    },
    onSelect: {
      type: Function
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedIndex: this.defaultIndex
    }
  },
  methods: {
    switchTab (e, index, isDisabled) {
      if (!isDisabled) {
        this.selectedIndex = index
        this.onSelect && this.onSelect(e, index)
        this.$emit('tabChanged', index)
      }
    }
  },
  render () {
    const tabs = this.$slots.default.filter(
      component => component.componentOptions
    )

    const tabList = []
    tabs.forEach((child, index) => {
      const { title, disabled, counter, icon } = child.componentOptions.propsData
      const isDisabled = disabled === true || disabled === ''
      tabList.push(
        <li
          role="tab"
          data-icon={icon}
          onClick={e => this.switchTab(e, index, isDisabled)}
          aria-selected={this.selectedIndex === index ? 'true' : 'false'}
          aria-disabled={isDisabled ? 'true' : 'false'}
        >
          {title}
        </li>
      )
    })

    return (
      <div role="tabs" class={`tabs ${this.vertical ? 'vertical' : ''}`}>
        <ul class="tab__switcher no-style" role="tablist">
          {this.$slots.left}{tabList}{this.$slots.right}
        </ul>
        {tabs[this.selectedIndex]}
      </div>
    )
  }
}

export const tab = {
  name: 'tab',
  props: ['title', 'disabled', 'counter', 'icon'],
  render () {
    return (
      <div class="tab" role="tabpanel">
        {this.$slots.default}
      </div>
    )
  }
}

export function install (Vue) {
  Vue.component(tabs.name, tabs)
  Vue.component(tab.name, tab)
}
