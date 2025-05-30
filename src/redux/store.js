import { configureStore } from "@reduxjs/toolkit";
import unauthorized401Middleware from "./middleware";


// login 
import login_slice from "./feature/auth"


export default configureStore ({
    reducer:{
        login_store:login_slice,
    },

    middleware:(getDefaultMiddleware)=>[
    ...getDefaultMiddleware(),
    unauthorized401Middleware,
]
})

