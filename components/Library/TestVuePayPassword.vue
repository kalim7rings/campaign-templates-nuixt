<template>
    <div class="defaultExample">
    <!--<div :class="$style.defaultExample">-->
        <h1 class="title"> payPassword</h1>

        <div class="column">
            <div class="column">
                <h2>length: 8</h2>
                <payPassword :length="8" />
                <h2>length: 6</h2>
                <payPassword :length="6" />
                <h2>length: 4</h2>
                <payPassword :length="4" />
                <h2>disable</h2>
                <payPassword :disable="true" />
                <h2>value</h2>
                <payPassword :value="'12345'" />

                <h2>simple</h2>
                <div>
                    <payPassword
                            ref="payPassword"
                            v-model="input1" />。
                </div>

            </div>

            {{ input1 }}

            <div class="column">
                <input v-model="input1"
                        type="text" />
            </div>

            <div class="column">
                <button
                        class="button"
                        @click="$refs.payPassword.clear()">clear</button>
                <button
                        class="button"
                        @click="$refs.payPassword.focus()">focus</button>
            </div>
        </div>
    </div>
</template>

<script>
   // import payPassword from '../src/PayPassword'
   import payPassword from 'vue-pay-password';

    export default {
        name: 'DefaultExample',
        components: {
            payPassword
        },
        data () {
            return {
                input1: ''
            }
        },
        methods: {}
    }
</script>


<style  module>
    .defaultExample {
        max-width: 720px;
        margin: 10px auto;

        input {
            font-size: 24px;
        }
    }
</style>

<style scoped>
    .column {
        margin: 10px 0;
    }
</style>
