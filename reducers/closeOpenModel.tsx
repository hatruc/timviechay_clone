// store/reducer.ts
import { AppState, AppAction, ActionType } from '../actions/types'

const initialState: AppState = {
	isModalOpen: false,
}

const closeOpenReducer = (state: AppState = initialState, action: AppAction): AppState => {
	switch (action.type) {
		case ActionType.OPEN_MODAL:
			return { ...state, isModalOpen: true }
		case ActionType.CLOSE_MODAL:
			return { ...state, isModalOpen: false }
		default:
			return state
	}
}

export default closeOpenReducer
