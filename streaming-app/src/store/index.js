import Vue from '../main';

const store = {};

export  default store;

store.state = {
   steaming: null
};

store.getVideoList = () => {
   "use strict";

   return new Promise(
      (resolve, reject) => {
         Vue.http(
            {
               url: 'video',
               method: 'GET'
            }
         )
            .then(
               response => {
                 resolve(response);
               }
            )
      }
   )
};

store.stream = () => {
   "use strict";

   return new Promise(
      (resolve, reject) => {
         Vue.http(
            {
               url:'video/stream',
               method: 'GET'
            }
         )
            .then(
               response => {
                  resolve(response);
               }
            )
      }
   )
};