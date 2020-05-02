module.exports = {
    BACKEND_SERVER: {
        URL: 'http://localhost:9000', // Should have http://
    },
    USER_INFORMATION: {
        USER_ID: localStorage.getItem('226UserId'),
        USERNAME: localStorage.getItem('226User'),
        USER_TYPE: localStorage.getItem('226UserType'),
    }
}