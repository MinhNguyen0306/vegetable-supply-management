interface AppStateSlice {
    overlayOpen: boolean,
    successMessage: string,
    errorMessage: string
    openOrderSidebar: boolean
    openOrderConfirm: boolean
    modalLoading: boolean
    globalLoading: boolean 
    themeMode: 'light' | 'dark'
}

const initialState: AppStateSlice = {
    overlayOpen: false,
    successMessage: "",
    errorMessage: "",
    openOrderSidebar: false,
    openOrderConfirm: false,
    modalLoading: false,
    globalLoading: false,
    themeMode: 'light'
}

export default initialState;