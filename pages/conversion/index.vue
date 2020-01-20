<template>
    <div>
        <div class="container-fluid main_bg">
            <div class="main_card">
                <div class="row">
                    <div class="col-lg-6 text-center">
                        <div class="left_panel_Convert">
                            <h3 class="sub_title"> Convert your </h3>
                            <h1 class="main_title"> LOAN AT LOWER INTEREST </h1>
                            <p class="loan_info_text">
                                Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore.
                            </p>



                            <div class="validation-section">
                                <ValidationProvider rules="required|alpha" v-slot="{ errors }">
                                    <input type="text" v-model="value">
                                    <span>{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>



                            <div class="text-center">   <!--v-b-modal.campaign-otp-modal-->
                                <button type="button" class="main_btn_common" v-b-modal.campaign-otp-modal> VIEW OFFER </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6"> </div>
                </div>
            </div>
        </div>

        <campaign-otp-modal/>
    </div>
</template>

<script>

    import { mapState, mapMutations } from 'vuex';
    import CampaignOtpModal from '~/components/Modal/OtpModalPopUp';
    import { BModal, VBModal} from 'bootstrap-vue';
    //import { ValidationProvider } from "vee-validate";

    export default {
        middleware: 'guest',
        layout: 'index',
        components: {
            'b-modal': BModal,
            'campaign-otp-modal': CampaignOtpModal,
            //ValidationProvider
        },
        directives: {
            'b-modal': VBModal
        },
        data() {
            return {
                value: "",
            }
        },
        methods: {
            ...mapMutations(['SET_REF_CODE', 'SET_SOURCE_CODE', 'SET_CAMPAIGN_MODE', 'SET_DOB', 'SET_FILE_NO', 'SET_AFTER_LOGIN_PAGE_URL', 'SET_SUMMARY_FLAG']),
            async getDobAndAccountNo(){

                let payloads = {
                    source_code   :  this.storeSourceCode,
                    ref_code      :  this.storeRefCode,
                    campaign_mode :  this.storeCampaignMode,
                    template_id   :  '',
                };

                try{

                    let response = await this.$axios.$post(`/campaign/pre-approved-loan/landing-page`, payloads);

                    console.log("@@response : ");
                    console.log(response);

                    if(response.RETURN_CODE == '0'){

                        this.SET_DOB(response.DOB);
                        this.SET_FILE_NO(response.FILE_NO);
                        this.SET_AFTER_LOGIN_PAGE_URL(response.AFTER_LOGIN_PAGE);

                        let summaryFlag = response.SUMMARY_FLAG === 'Y' ? 'Y' : 'N';
                        this.SET_SUMMARY_FLAG(summaryFlag);
                        this.$nuxt.$loading.finish();
                        return;
                    }
                    this.$toast.error(response.RETURN_MESSAGE);

                }catch (e){

                    this.$nuxt.$loading.finish();
                    console.log(e.status);

                    this.$toast.error(e.data.message, {
                        position: "top-center",
                        duration : 7000,
                     });
                    //this.$toast.show('Error', {icon: "fingerprint"});
                    //this.$toast.error('Something went wrong, Try again later.');
                }
            },
            async getDobAndAccountNo2(){

                let payloads = {
                    insta_id   :  41,
                };

                try {
                    let response = await this.$axios.$post(`http://192.168.10.95/nitin/insta-loan-micro-services/public/v1/mini-form/documents`, payloads);

                    console.log("@@response : ");
                    console.log(response);

                }catch (e){
                    console.log(e);
                }
            },
            setRefcode(){
                this.SET_REF_CODE(this.$route.query.ref_code);
            },
            setSourceCode(){
                this.SET_SOURCE_CODE(this.$route.query.source_code);
            },
            setCampaignMode(){
                this.SET_CAMPAIGN_MODE(this.$route.query.campaignmode);
            },
            abortIfRefcodeAndSourceCodeNotExist(){

                if( this.$route.query.ref_code === undefined || this.$route.query.source_code === undefined){
                    alert('ref_code not set');
                    return;
                }

                this.$nextTick(() => {
                    this.$nuxt.$loading.start();
                });

                this.setRefcode();
                this.setSourceCode();
                this.setCampaignMode();
                this.getDobAndAccountNo();

                /* console.log('storeRefCode');
                 console.log(this.$store.state.storeRefCode);

               console.log(this.storeRefCode);
                 console.log('storeSourceCode');
                 console.log(this.storeSourceCode);
                 console.log(this.storeCampaignMode);
                 console.log(this.$route.query.source_code);*/
            },
        },
        mounted(){
            this.abortIfRefcodeAndSourceCodeNotExist();
        },
        computed:{
            ...mapState(['storeRefCode','storeSourceCode','storeCampaignMode', 'storeFileNo', 'storeDOB']),
        },
        created() {
            console.log('created called .... !');
            //this.abortIfRefcodeAndSourceCodeNotExist();

        },
    }

</script>