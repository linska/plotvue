import type { App, Plugin } from 'vue'
import PlotPie from "./components/pie/PlotPie.vue";

export type { Item, Path, PlotPieProps } from "./components/pie/PlotPieLogic"

const Plotvue: Plugin = {
  install(app: App) {
    app.component('PlotPie', PlotPie)
  },
}
export default Plotvue
