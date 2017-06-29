/***
 * This file reads attributes on div that start init- and convert them to props in beforeMount()
 */
import kebabCase from 'kebab-case'

export default {
    prop: ['dynamicPropsFromAttr'],
    render: function (createElement) {
        return createElement(
            'app',
            {
              props: this.dynamicPropsFromAttr
            }
          )
      },
      beforeMount: function () {
        this.dynamicPropsFromAttr = {}
        for (var i = 0; i < this.$el.attributes.length; ++i) {
            var attr  = this.$el.attributes[i];
            var attrName = attr.name;
            if (attrName.indexOf('init-') >= 0)
            {
                attrName = kebabCase.reverse(attrName.replace('init-', ''));
                this.dynamicPropsFromAttr[attrName] = attr.value;
            }
        }
    }
}