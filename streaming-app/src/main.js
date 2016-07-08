import Vue from 'vue';
import App from './App'
import Home from './components/Home'
import Video from './components/Video'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

// Main Route
Vue.http.options.root="http://localhost:3000/api";
Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000/api';
// Vue.http.headers.common['Access-Control-Request-Method'] = 'GET, POST, PUT, DELETE';

export var router = new VueRouter;
export default Vue;

router.map({
   '/': {
      name: 'home',
      component: Home
   },
   '/video': {
      name: 'video',
      component: Video
   },
   '/video/stream': {
      name: 'stream',
      component: Video
   }
});

router.start(App, '#app');

