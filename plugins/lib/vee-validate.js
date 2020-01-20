import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import Vue from 'vue';
import { required, alpha } from "vee-validate/dist/rules";

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

extend("required", {
    ...required,
    message: "This field is required"
});

extend("alpha", {
    ...alpha,
    message: "This field must only contain alphabetic characters."
});

/*import {
    extend,
    ValidationObserver,
    ValidationProvider,
    setInteractionMode
} from 'vee-validate';

//import * as defaultVeeRules from 'vee-validate/dist/rules';
import Vue from 'vue';

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);*/

/*function registerRules() {
    _.forEach(defaultVeeRules, (rule, name) => {
        extend(name, rule)
    })
}*/

/*function registerVeeValidation() {
    setInteractionMode('eager')
    registerRules()
}
//export { registerVeeValidation }*/

/*ValidationRulesExtend('mobile_no', {
    validate: value => value.match(/^\d{10}$/g) !== null,
    message: 'Invalid mobile number.'
});*/
/*

ValidationRulesExtend("required", {
    computesRequired: true,
    validate: v => {
        return {
            valid: v.trim().length > 0,
            required: true
        };
    },
    message: field => `${field} is required.`
});

export default ValidationRulesExtend;*/