import load from 'little-loader'
import DynamicPropsFromAttr from '../mixin/dynamic-props-from-attr'

const ENV = process.env.NODE_ENV;

function initApp (app) {
     if (ENV !== 'production') {
             load("https://unpkg.com/vue@2.2.6/dist/vue.runtime.js", app)
         } else {
             load("https://unpkg.com/vue@2.2.6/dist/vue.runtime.min.js", app)
       }
}

function loadApp(selector, App) {
    initApp(function() {
        new Vue({
            mixins: [DynamicPropsFromAttr],
            el: selector,
            components: {
                App
            }
        })
        if (ENV === 'production') {
            // fail safe - don't throw errors in console instead report in some system for production
            // @todo: Discuss with Howard about reporting tool
            Vue.config.errorHandler = function (err, vm, info) {
            }
        }
    });
}

export default loadApp 