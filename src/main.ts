import type { App, Plugin } from 'vue'
import PlotPie from "./components/PlotPie.vue";

const Plotvue: Plugin = {
  install(app: App) {
    app.component('PlotPie', PlotPie)
  },
}

export default Plotvue
export { PlotPie }
