<template>
    <div class="container">
        <div class="row">
            <form @submit.prevent="login()" class="w100" method="post" id="loginForm" name="loginForm">
                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                    <div class="form-group">
                        <label class="titlegrey">User ID</label>
                        <input type="text"
                               class="form-control"
                               name="user_id"
                               v-model="user_id"
                               placeholder="Enter user ID"
                               autocomplete="off"
                               value=""
                               style="text-transform: uppercase"
                        >
                    </div>
                </div>

                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                    <div class="form-group">
                        <label class="titlegrey">Password</label>
                        <input type="password"
                               class="form-control"
                               name="password"
                               v-model="password"
                               id="password"
                               placeholder="Enter password"
                               autocomplete="off">
                    </div>
                </div>

                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 text-center mt_15">
                    <button class="btn_common btn_big btn-login pointer" type="submit" >Login</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>

    const Cookie = process.client ? require('js-cookie') : undefined;

    export default {
        data(){
          return {
              user_id : '',
              password : '',
          }
        },
        methods:{
            async login(){

                if(this.user_id != '' && this.password !=''){

                    let payloads = {
                        username      : this.user_id,
                        password      : this.password,
                        grant_type     : 'password',
                        client_id      : process.env.CLIENT_ID,
                        client_secret  : process.env.CLIENT_SECRET,
                        scope          : '',
                    };

                    try{

                        let response = await this.$axios.$post(`/oauth/token`, payloads);
                        //let response = await this.$axios.$post(`https://portalapiuat.hdfc.com/v1/oauth/token`, payloads);

                        console.log("@@response : ");
                        console.log(response);
                        console.log(response.access_token);
                        console.log(response.token_type);
                        console.log(response.refresh_token);
                        console.log(response.expires_in);

                        const auth = {
                            accessToken: response.access_token,
                        };

                        console.log('--auth--');
                        console.log(auth);

                        this.$store.commit('SET_AUTH', auth); // mutating to store for client rendering
                        Cookie.set('auth', auth); // saving token in cookie for server rendering
                        this.$toast.success('Login successfully.');

                         this.$axios.setHeader('Authorization', 'Bearer ' + response.access_token);
//                         //this.$axios.setHeader('X-Login-Mode', 'WEB');
//
//                        //, { headers: { 'Authorization': `Bearer ${this.state.auth.accessToken}`, 'accept' : 'application/json'} } */
//
                        const user = await this.$axios.$post(`/user`);
//                       // const user = await this.$axios.$post(`https://portalapiuat.hdfc.com/v1/user`);
//
                        //const user = user;
                        console.log('user response');
                        console.log(user);
//
                        this.$store.commit('SET_AUTH_USER', user);


                        /*if(response.RETURN_CODE == '0'){

                            this.SET_DOB(response.DOB);
                            this.SET_FILE_NO(response.FILE_NO);
                            this.SET_AFTER_LOGIN_PAGE_URL(response.AFTER_LOGIN_PAGE);

                            let summaryFlag = response.SUMMARY_FLAG === 'Y' ? 'Y' : 'N';
                            this.SET_SUMMARY_FLAG(summaryFlag);
                            this.$nuxt.$loading.finish();
                            return;
                        }
                        this.$toast.error(response.RETURN_MESSAGE);*/

                        this.$router.push('/conversion/enquiry');

                        return;

                    }catch (err){

                        this.$nuxt.$loading.finish();

                        debugger;

                        console.log(err.status);


                       /* this.$toast.error(err.data.message, {
                            position: "top-center",
                            duration : 7000,
                        });*/
                        //this.$toast.show('Error', {icon: "fingerprint"});
                        //this.$toast.error('Something went wrong, Try again later.');
                    }
                    return;
                }

                this.$toast.error('Enter user id and password', {
                    position: "top-center",
                    duration : 7000,
                });
            },
        }
    }
</script>