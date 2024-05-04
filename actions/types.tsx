// Toggle sidebar
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

export interface ToggleSidebarAction {
	type: typeof TOGGLE_SIDEBAR
}
export type SidebarActionTypes = ToggleSidebarAction
// Modal
export const TOGGLE_MODAL = 'TOGGLE_MODAL'

export interface ToggleModalAction {
	type: typeof TOGGLE_MODAL
}
export type ModalActionTypes = ToggleModalAction
//  Nodal
// store/types.ts
export interface AppState {
	isModalOpen: boolean
}

export enum ActionType {
	OPEN_MODAL = 'OPEN_MODAL',
	CLOSE_MODAL = 'CLOSE_MODAL',
}

export interface OpenModalAction {
	type: ActionType.OPEN_MODAL
}

export interface CloseModalAction {
	type: ActionType.CLOSE_MODAL
}

export type AppAction = OpenModalAction | CloseModalAction
// modalActionTypes.ts
export const SWITCH_MODAL_STATUS = 'SWITCH_MODAL_STATUS'

interface SwitchModalStatusAction {
	type: typeof SWITCH_MODAL_STATUS
}

export type ModalActions = SwitchModalStatusAction
