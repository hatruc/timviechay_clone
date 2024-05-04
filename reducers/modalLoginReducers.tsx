// modalReducer.ts

import { ModalActions, SWITCH_MODAL_STATUS } from '@/actions/types'

interface ModalState {
	isModalVisible: boolean
}

const initialModalState: ModalState = {
	isModalVisible: false,
}

const ModalReducer = (state = initialModalState, action: ModalActions): ModalState => {
	switch (action.type) {
		case SWITCH_MODAL_STATUS:
			return {
				...state,
				isModalVisible: !state.isModalVisible,
			}
		default:
			return state
	}
}

export default ModalReducer
