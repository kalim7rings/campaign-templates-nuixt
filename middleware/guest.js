export default function ({ store, redirect }) {
    // If the user is authenticated redirect to home page
    if (store.state.auth) {
        return redirect('/conversion/enquiry');
        //return redirect('https://portaluat.hdfc.com');
    }

/*
    if (!store.state.authUser) {
        error({
            message: 'You are not connected',
            statusCode: 403
        })
    }*/
}