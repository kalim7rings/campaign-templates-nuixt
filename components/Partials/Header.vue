<template>
    <nav class="navbar navbar-light top-head-fix">
        <div class="container-fluid">
            <div class="be-navbar-header"><a class="top-logo-head" href="#"></a></div>
            <div class="be-right-navbar">
                <div class="dropdown" style="display: inline;">
                    <span class="name-first"> A </span>
                    <!-- <a class="btn btn-secondary dropdown-toggle toggle-new" href="#" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         Ashish Lad
                     </a>
                     <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                         <a class="dropdown-item" href="#">Action</a>
                     </div>-->

                    <b-dropdown id="dropdown-left" text="Ashish Lad" class="m-2 toggle-new">
                        <b-dropdown-item href="#">Logout</b-dropdown-item>
                    </b-dropdown>
                </div>
                <div class="round_icon col-md-1 pull-right" style="display: inline;">
                    <a href="http://www.hdfc.com/helpline" target="_blank">
                        <img :src="phoneIcon" width="35px;">
                    </a>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>

    import PhoneIcon from '~/assets/images/phone-icon.png';
    import { BDropdown, BDropdownItem } from 'bootstrap-vue';

    export default {
        components: {
            'b-dropdown': BDropdown,
            'b-dropdown-item': BDropdownItem,
        },
        data(){
            return {
                phoneIcon : PhoneIcon,
            }
        },
        mounted : function () {

        }
    }
</script>