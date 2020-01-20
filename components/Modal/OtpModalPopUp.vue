<template>
    <b-modal id="campaign-otp-modal" ref="campaign-modal"
             size="lg"
             no-close-on-esc
             no-close-on-backdrop
             hide-header
             hide-footer
             no-fade
             centered
             title="">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="OTP_inner_main_card">

                        <account-list v-if="sendOtpToggle"/>
                        <verify-otp :propsOtpId="otpId" v-else-if="verifyOtpToggle"/>

                        otpId kalim :  {{ otpId }}

                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</template>
<script>

    import AccountList from '~/components/Modal/AccountList';
    import VerifyOtp from '~/components/Modal/VerifyOtp';
    import { BModal, VBModal } from 'bootstrap-vue';

    export default {
        components: {
            'account-list': AccountList,
            'verify-otp': VerifyOtp,
            'b-modal': BModal,
        },
        directives: {
            'b-modal': VBModal
        },
        data(){
            return {
                showSendOtp : true,
                showVerifyOtp : false,
                otpId : '',
            }
        },
        methods: {
            showModal() {
                this.$refs['my-modal'].show()
            },
            /*hideModal() {
                this.$refs['campaign-modal'].hide();
                //this.$refs['my-modal'].hide()
                // this.$bvModal.hide('campaign-otp-modal');
            },*/
            toggleModal() {
                // We pass the ID of the button that we want to return focus to
                // when the modal has hidden
                this.$refs['my-modal'].toggle('#toggle-btn')
            }
        },
        created() {
            this.$root.$on('closeCampaignOtpModal', (data) => {
                this.$refs['campaign-modal'].hide();
            });
            this.$root.$on('showHideSendOtpAndVerifyOtpSection', (data) => {
                this.showSendOtp = data.showSendOtp;
                this.showVerifyOtp = data.showVerifyOtp;
            });
            this.$root.$on('setOtpId', (data) => {
                console.log('created data.otpId');
                console.log(data.otpId);

                //self.otpId = data.otpId;
                this.otpId = data.otpId;

                console.log('created this.otpId');
                console.log(this.otpId);
            });
        },
        computed: {
            sendOtpToggle(){
                return this.showSendOtp;
            },
            verifyOtpToggle(){
                return this.showVerifyOtp;
            },
        },
        mounted(){
            localStorage.removeItem('accountListData');
        }
    }
</script>