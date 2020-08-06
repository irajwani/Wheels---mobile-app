export const INITIAL_STATE = {
    newUser: {},
    registerStatus: false,
    isLoading: false,
    
    message: null,
    errorMessage: null,

    addStatus: 'idle',
    updateStatus: 'idle',

    uid: '',

    profile: {
        email: "",
        uid: "",
        username: "",
        profile: {
            //To Separate Private-ish from public
            displayName: "",
            photoUrl: "",
            
        },
        wishlist: [],
        session: {
            status: "online",
            lastSeen: false,            
        },        
        token: "",
        createdAt: false,
        
    },
    
     
}
