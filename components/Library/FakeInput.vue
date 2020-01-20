<template>
    <div>
        <payPassword
                :length="4"
                ref="payPassword"
                v-model="otpValue"
                @focus="callFocus()"
                @blur="toggleButton()"
                @keyup="toggleButton()"
        />
        <button class="btn-clear" v-show="toggleClearButton" @click="$refs.payPassword.clear();hideClearButton();" title="Clear">X</button>

        <!--<button class="button" @click="$refs.payPassword.focus()">focus</button>-->

                <!--<vue-fake-input
                    :length="4"
                    :fontSize="40"
                    inputColor="#31bce6"
                    fontColor="#ffc107"
                    :allowPaste="true"
                    v-model="fullValue"
            /> -->   <!--@blur="sendInputValue()"-->

    </div>
</template>

<script>
    //import VueFakeInput from 'vue-fake-input';
    import payPassword from 'vue-pay-password';
    import "vue-pay-password/dist/vue-pay-password.css";

    export default {
        name: "PayPassword",
        components: {
         //   VueFakeInput
            payPassword,
        },
        data(){
            return {
                otpValue: '',
                clearButton : false,
            }
        },
        methods:{
            sendInputValue(){
                console.log(this.otpValue);
                //this.$parent.otp.push(this.otpValue);
                this.$emit('sendOtpEvent', this.otpValue);
            },
            hideClearButton(){
                this.clearButton = false;
            },
            callFocus(){
                console.log('callFocus');
            },
            toggleButton(){
                console.log('callBlur');
                //this.otpValue.toString().length;
                console.log('length...');
                console.log(this.otpValue.toString().length);

                if(this.otpValue.toString().length == 4){
                    this.clearButton = true;

                    console.log('...otpValue length...');
                    console.log(this.otpValue);

                    this.sendInputValue();
                    return;
                }

                this.clearButton = false;
            }
        },
        created(){

        },
        computed : {
            toggleClearButton(){
                return this.clearButton;
            }
        },
    }
</script>
<style>
    .payPassword div.sixDigitPassword i {
        float: left;
        display: block;
        width: 56px;
        border-left: 1px solid #ccc;
        padding: 10px 4px !important;
        margin-top: -12px !important;
        height: 51px !important;
    }

    .payPassword div.sixDigitPassword span {
        height: 53px !important;
        width: 57px !important;
    }

    .payPassword div.sixDigitPassword b {
        margin-top: 13px !important;
    }

    .payPassword div.sixDigitPassword {
        cursor: text;
        background: #fff;
        outline: none;
        position: relative;
        padding: 12px 0;
        height: 27px;
        border: 1px solid #ccc;
        border-radius: 2px;
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
    }

    .payPassword, .payPassword * {
        vertical-align: none !important;
    }

    .btn-clear{
        display: inline-block;
        background: #f94141;
        border: 0;
        color: #fff;
        width: 25px;
        vertical-align: top;
        border-radius: 50%;
        height: 26px;
        margin-top: 10px;
    }
</style>