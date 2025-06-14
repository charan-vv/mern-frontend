import { configureStore } from "@reduxjs/toolkit";
import unauthorized401Middleware from "./middleware";


// login 
import login_slice from "./feature/auth";

// Budget
import budget_list_slice from "./feature/Budget";

// Catrgories 
import categories_list_slice from "./feature/Categories";

// Transaction
import transaction_list_slice from "./feature/Transactions";


export default configureStore ({
    reducer:{
        login_store:login_slice,
        budget_list:budget_list_slice,
        categories_list:categories_list_slice,
        transaction_list:transaction_list_slice
    },

    middleware:(getDefaultMiddleware)=>[
    ...getDefaultMiddleware(),
    unauthorized401Middleware,
]
})

