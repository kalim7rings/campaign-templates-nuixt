const cookieparser = process.server ? require('cookieparser') : undefined;

export const state = () => {
    return {
        storeRefCode : '',
        storeSourceCode : '',
        storeCampaignMode : '',
        storeDOB : '',
        storeFileNo : '',
        storeAfterLoginUrl : '',
        storeSummaryFlag : '',
        auth: null,
        user: null,
    }
}

export const mutations = {
    SET_REF_CODE(state, payload){
        state.storeRefCode = payload;
    },
    SET_SOURCE_CODE(state, payload){
        state.storeSourceCode = payload;
    },
    SET_CAMPAIGN_MODE(state, payload){
        state.storeCampaignMode = payload;
    },
    SET_DOB(state, payload){
        state.storeDOB = payload;
    },
    SET_FILE_NO(state, payload){
        state.storeFileNo = payload;
    },
    SET_AFTER_LOGIN_PAGE_URL(state, payload){
        state.storeAfterLoginUrl = payload;
    },
    SET_SUMMARY_FLAG(state, payload){
        state.storeSummaryFlag = payload;
    },
    SET_USER_AUTHENTICATION(state, payload){
        state.storeIsUserAuthenticated = payload;
    },
    SET_AUTH(state, auth){
        state.auth = auth;
    },
    SET_AUTH_USER (state, user) {

        console.log('$$$$ user $$$$');
        console.log(user);

        state.user = user || null
    },
};

export const actions = {
    async nuxtServerInit ({ commit, state }, { req }) {

        console.log('### kalim ###');
        //debugger;

        let auth = null;
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie);
            try {
                auth = JSON.parse(parsed.auth)

                //var { data } = await axios.post(endpoint + '/auth/verify', { token });

               /* console.log('### call user..... ###');
                const user = await this.$axios.$post(`/user`);

                if (user) {
                    commit('SET_AUTH_USER', user);
                }*/

            } catch (err) {
                // No valid cookie found
            }
        }
        commit('SET_AUTH', auth);

        console.log('### auth ###');
        console.log(auth);
        console.log(auth !== null && auth !== false);

        // if (this.state.auth.accessToken !== null && this.state.auth.accessToken !== false)

       /* if (auth !== null && auth !== false)
        {
            console.log('state.auth.accessToken');
            //console.log(state.auth.accessToken);
            console.log(this.state.auth.accessToken);

           // this.$axios.setHeader('Authorization', 'Bearer ' + this.state.auth.accessToken);

          //, { headers: { 'Authorization': `Bearer ${this.state.auth.accessToken}`, 'accept' : 'application/json'} }

            const user = await this.$axios.$post(`/user`);
           // const user = await this.$axios.$post(`https://portalapiuat.hdfc.com/v1/user`);

            //const user = user;
            console.log('user response');
            console.log(user);

            commit('SET_AUTH_USER', user);
        }*/
    },

    async logout({ commit }) {
        await this.$axios.$post('user/logout');
        commit('SET_AUTH_USER', null)
    }
};

export const getters = {
    isAuthenticated (state) {
        return !!state.user
    },
    loggedUser (state) {
        return state.user
    }
}
