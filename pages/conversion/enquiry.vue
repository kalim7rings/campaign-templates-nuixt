<template>
    <div class="container-fluid main_bg">
        <div class="main_card_inner">




                  <div>
        hiiiii

         Enquiry page....

           {{ $store.state.auth }}

           <h5>Hello, {{ loggedUser ? loggedUser.full_name : 'friend' }}!</h5>


           is authenticated : {{ isAuthenticated }}  <br><br>

           {{ loggedUser }}
    </div>
        </div>
    </div>
</template>
<script>

    import { mapGetters, mapState } from 'vuex';

    export default {
        middleware: 'auth',
        data(){
            return {

            }
        },
        methods : {
            async callUser(){
                console.log('state.auth.accessToken');
                //console.log(state.auth.accessToken);
                console.log(this.$store.state.auth.accessToken);
                //console.log($store.state.auth);

                //self.$auth.setToken('local', 'Bearer ' + resp.data.access_token)
                //self.$auth.setRefreshToken('local', resp.data.refresh_token)
                //       this.$axios.setHeader('Authorization', 'Bearer ' + this.$store.state.auth.accessToken);
                //self.$auth.ctx.app.$axios.setHeader('Authorization', 'Bearer ' + resp.data.access_token)
                //self.$axios.get('/users/me').then((resp) => { self.$auth.setUser(resp.data);
                //self.$router.push('/') })

                /*   , {
                   headers: { 'Authorization': `Bearer ${this.$store.state.auth.accessToken}`, 'accept' : 'application/json'}
               }*/

                /* const user = await this.$axios.$post(`/user`);

                 console.log('user response');
                 console.log(user);
 */
                //commit('SET_AUTH_USER', user);
            },
            async getConversionDetails(){

                debugger;

                let payloads = {
                    'file_no'     : this.storeFileNo,
                    'conv_seq_no' : this.storeSourceCode,
                };

                console.log(payloads);

                const details = await this.$axios.$post(`/campaign-templates/conversion/details`, payloads);

                console.log('details response');
                console.log(details);


                /*http://insta-loan-micro-services/v1/campaign-templates/conversion/details

                    'file_no'     => this.storeFileNo,
                    'conv_seq_no' => this.storeSourceCode,*/

            }
        },
        mounted(){
            this.callUser();
            this.getConversionDetails();
        },
        computed:{
            ...mapGetters([
                'isAuthenticated',
                'loggedUser'
            ]),
            ...mapState(['storeFileNo', 'storeSourceCode']),
        }
    }
</script>