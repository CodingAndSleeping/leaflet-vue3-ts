import { createApp } from "vue";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import locale from "element-plus/lib/locale/lang/zh-cn";
import App from "./App.vue";

// 全局样式
import "./assets/style/index.scss";
// 注意!!!这句必须跟在const app= xxxx  之后

const app = createApp(App);

app.use(ElementPlus, { locale });

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
