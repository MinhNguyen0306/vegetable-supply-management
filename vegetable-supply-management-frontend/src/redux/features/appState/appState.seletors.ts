interface AppStateSlice {
    overlayOpen: boolean,
    openOrderSidebar: boolean
    globalLoading: boolean 
    themeMode: 'light' | 'dark'
}

const initialState: AppStateSlice = {
    overlayOpen: false,
    openOrderSidebar: false,
    globalLoading: false,
    themeMode: 'light'
}

export default initialState;