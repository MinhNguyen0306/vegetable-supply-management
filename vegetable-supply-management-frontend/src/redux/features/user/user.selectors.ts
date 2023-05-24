import { Provider } from "src/types/provider";
import { User } from "src/types/user";

interface UserSlice {
    loading: boolean,
    error: any
    user: User | null,
    isAuthenticated: boolean,
    listProviders: Provider[]
}

const initialState: UserSlice = {
    loading: false,
    error: "",
    user: {
        id: "",
        userName: "",
        email: "",
        phone: "",
        address: "",
        provider: {
            id: "",
            providerName: "",
            annualOutput: "",
            productionArea: "",
            yearActive: ""
        },
        mart: {
            id: "",
            martName: "",
            faxCode: 0
        },
        roles: [
            {
                id: 0,
                name: ""
            }
        ]
    },
    listProviders: [],
    isAuthenticated: false
}

export default initialState;