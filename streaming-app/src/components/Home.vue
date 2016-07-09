<template>

    <ul>
        <li v-for="item in list">
            <a v-link="{ name: 'video' , params:{name: item.video}}">{{item.video}}</a>
        </li>
    </ul>

</template>

<script type="text/babel">
    import store from '../store'

    export default {

        data() {
            return {
                list: {}
            }
        },

        ready() {
           store.getVideoList().then(response => {
              this.list = response.data.list;
               console.log(response.data.list);
           });
        }
    }

</script>