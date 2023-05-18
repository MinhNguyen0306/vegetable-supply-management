
interface ModalSlice {
    loadingModalOpen: boolean,
    errorModalOpen: boolean,
    successModalOpen: boolean,
    confirmModalOpen: boolean,
}

const initialState: ModalSlice = {
    loadingModalOpen: false,
    errorModalOpen: false,
    successModalOpen: false,
    confirmModalOpen: false,
}

export default initialState;