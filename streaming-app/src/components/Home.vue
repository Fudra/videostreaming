<template>
    Home
</template>

<script type="text/babel">
    import store from '../store'

    export default {
        ready() {
           store.getVideoList().then(response => {
               console.log(response);
           });
        }
    }

</script>