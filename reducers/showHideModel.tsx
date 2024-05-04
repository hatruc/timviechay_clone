import { TOGGLE_MODAL, ToggleModalAction } from '../actions/types'

interface ModalLoginState {
	isOpen: boolean
}

const initialState: ModalLoginState = {
	isOpen: false,
}

const ModalLoginReducer = (state = initialState, action: ToggleModalAction): ModalLoginState => {
	switch (action.type) {
		case TOGGLE_MODAL:
			return {
				...state,
				isOpen: !state.isOpen,
			}
		default:
			return state
	}
}

export default ModalLoginReducer
