<template>
    <div>
            <Header></Header>
            <nuxt/>
            <Footer></Footer>
    </div>
</template>
<script>
    import Header from './../components/Partials/Header.vue';
    import Footer from './../components/Partials/Footer.vue';

    export default {
        components : {
            Header,
            Footer
        }
    }
</script>