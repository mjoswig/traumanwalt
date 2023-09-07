import Vue from 'vue'
import wysiwyg from 'vue-wysiwyg'
import 'vue-wysiwyg/dist/vueWysiwyg.css'

Vue.use(wysiwyg, {
  hideModules: {
    justifyLeft: true,
    justifyCenter: true,
    justifyRight: true,
    code: true,
    image: true,
    table: true
  }
})