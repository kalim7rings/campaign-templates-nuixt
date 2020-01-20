<template>
    <div class="OTP_div">
        <div class="row">
            <div class="col-md-12 mt-5 otp_title">
                Enter OTP <span class="title_otp_text"> (One Time Password) </span>
            </div>
            <div class="col-md-12 otp_sub_title text-center mt-3">
                Enter the 4 digit OTP sent on your gmail ID at <strong> rahulXXXX@gmail.com </strong>
            </div>
            <!--<div class="OTP_input_div mt-5">
                <input type="password" class="OTP-form-control otp_input">
                <input type="password" class="OTP-form-control otp_input">
                <input type="password" class="OTP-form-control otp_input">
                <input type="password" class="OTP-form-control otp_input">
            </div>-->
            <div class="OTP_input_div mt-4">
                <otp-input @sendOtpEvent="receiveOtpFromChild"/>
            </div>
        </div>
        <div class="row mt-5 text-center">
            <div class="col-md-12">
                <span class="cancel"> Resend OTP </span>
            </div>
            <div class="col-lg-12 mt-4">
                <button class="main_btn_common" type="submit" @click="verifyOtp()"> SUBMIT </button>
            </div>
            <div class="col-md-12 mt-3 mb-5">
                <span @click="backToAccountList()" class="otp_resend"> Back </span>
            </div>
        </div>
    </div>
</template>
<script>

     import OtpInput from '~/components/Library/FakeInput';
     import { EventBus } from "~/plugins/lib/event-bus";

     const Cookie = process.client ? require('js-cookie') : undefined;

     export default {
        components:{
            OtpInput,
        },
        props:['propsOtpId'],
        data(){
            return {
               otp : '',
               otpId : this.propsOtpId,
            }
        },
        methods : {
          backToAccountList(){
              this.$root.$emit('showHideSendOtpAndVerifyOtpSection', {
                  showSendOtp : true,
                  showVerifyOtp : false,
                  message : '',
              });
          },
          async verifyOtp(){

              if(this.isOtpIsValid()){

                  let payloads = {
                      otp_id         : this.otpId,
                      otp_code       : this.otp,
                      request_module : 'Login',
                      grant_type     : 'password',
                      client_id      : process.env.CLIENT_ID,
                      client_secret  : process.env.CLIENT_SECRET,
                      scope          : '',
                  };

                  console.log('payloads');
                  console.log(payloads);

                  const headers = {
                      "X-Login-Mode": "WEB",
                  };

                  try {

                      //http://insta-loan-micro-services/v1/oauth/12344/otp/login"
                      // let response = await this.$axios.$post(`/oauth/${this.otpId}/otp/send`, payloads);

                  /*, {
                          headers: headers
                      }*/

                      let response = await this.$axios.$post(`/oauth/${this.otpId}/otp/login`, payloads);

                      console.log("verifyOtp @@response : ");
                      console.log(response.access_token);

                      const auth = {
                          accessToken: response.access_token,
                      };

                      console.log('--auth--');
                      console.log(auth);

                      this.$store.commit('SET_AUTH', auth); // mutating to store for client rendering
                      Cookie.set('auth', auth); // saving token in cookie for server rendering
                      this.$toast.success('Login successfully.');

                      debugger;

                      if (auth !== null && auth !== false)
                      {
                          console.log('state.auth.accessToken');
                          //console.log(state.auth.accessToken);
                          console.log(this.$store.state.auth.accessToken);

                           this.$axios.setHeader('Authorization', 'Bearer ' + this.$store.state.auth.accessToken);
                           //this.$axios.setHeader('Authorization', 'Bearer ' + response.access_token);

//                          {
//                              headers: { 'Authorization': `Bearer ${this.state.auth.accessToken}`, 'accept' : 'application/json'}
//                          }

                          const user = await this.$axios.$post(`/user`);

                          console.log('user response');
                          console.log(user);
                          this.$store.commit('SET_AUTH_USER', user);

                          this.$router.push('/conversion/enquiry');
                      }

                      return;
                  } catch (e) {
                      console.log(e.status);
                      console.log(e.data.message);
                      //this.message = e.data.message;

                      if(e.status === 401){
                          this.message = 'Invalid OTP.';
                          this.$toast.error(this.message);
                          return;
                      }

                      this.$toast.error(e.data.message);
                  }

              }
          },
          receiveOtpFromChild(value){
              this.otp = value;
          },
          isOtpIsValid(){
              if(!this.otp){
                  this.$toast.error('Enter Otp');
                  return false;
              }

              if(this.otp.toString().length != 4){
                  this.$toast.error('Enter valid otp.');
                  return false;
              }

              return true;
          }
        },
        computed : {
        },
        created(){
            console.log('VerifyOtp created');
        },
        mounted() {
           /* var self = this;
            this.$root.$on('setOtpId', (data) => {
                console.log('mounted data.otpId');
                console.log(data.otpId);
                self.otpId = data.otpId;
            });*/
            /*EventBus.$on("setOtpId", otpId => {
                console.log(`Oh, that's great. It's gotten ${otpId} clicks! :)`);
                self.otpId = otpId;
            });*/
            /*EventBus.$on("setOtpId", function(otpId) {
                debugger;
                console.log(`Oh, that's great. It's gotten ${otpId} clicks! :)`);
                self.otpId = otpId;
            });*/
        }
    }
</script>