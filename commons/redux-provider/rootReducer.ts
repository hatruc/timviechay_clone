import closeOpenReducer from '@/reducers/closeOpenModel';
import ModalReducer from '@/reducers/modalLoginReducers';
import sidebarReducer from '@/reducers/toggleSidebarReducers';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer: any = combineReducers({
	comment: '',
	sidebar: sidebarReducer,
	modalLogin: closeOpenReducer,
	modal: ModalReducer,
})

export { rootReducer }
