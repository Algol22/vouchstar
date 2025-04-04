import { createApp } from 'vue';
import App from './App.vue';
import VouchstarWebsdk from 'vue-vstar-websdk'; // Try default import
import "vue-vstar-websdk/dist/style.css";

const app = createApp(App);

// Register the plugin (if it's actually a plugin)
if (VouchstarWebsdk?.install) {
  app.use(VouchstarWebsdk, {
    vouchstarToken: 'hy2n6ZxWrEARdgl9NioUdNpqEW84tTRdTPrRgcW3EvEVOtzEZ3tgaTSTYUTUFxy0'
  });
} else {
  console.error("VouchstarWebsdk is not a valid Vue plugin!");
}

app.mount('#app');
