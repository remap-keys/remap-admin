import immer from 'immer';
import { INIT_STATE, RootState } from './state';
import {
  NOTIFICATION_ACTIONS,
  NOTIFICATION_ADD_ERROR,
  NOTIFICATION_ADD_INFO,
  NOTIFICATION_ADD_SUCCESS,
  NOTIFICATION_ADD_WARN,
  NOTIFICATION_REMOVE,
} from '../actions/actions';
import { WritableDraft } from 'immer/dist/types/types-external';

export type Action = { type: string; value: any };

const reducers = (state: RootState = INIT_STATE, action: Action) =>
  immer(state, (draft) => {
    if (action.type.startsWith(NOTIFICATION_ACTIONS)) {
      notificationReducer(action, draft);
    }
  });

const notificationReducer = (
  action: Action,
  draft: WritableDraft<RootState>
) => {
  // TODO: type-safe
  switch (action.type) {
    case NOTIFICATION_ADD_ERROR: {
      draft.app.notifications = [
        ...draft.app.notifications,
        {
          key: Date.now().toString(),
          type: 'error',
          message: action.value.message,
        },
      ];
      break;
    }
    case NOTIFICATION_ADD_WARN: {
      draft.app.notifications = [
        ...draft.app.notifications,
        {
          key: Date.now().toString(),
          type: 'warning',
          message: action.value.message,
        },
      ];
      break;
    }
    case NOTIFICATION_ADD_INFO: {
      draft.app.notifications = [
        ...draft.app.notifications,
        {
          key: Date.now().toString(),
          type: 'info',
          message: action.value,
        },
      ];
      break;
    }
    case NOTIFICATION_ADD_SUCCESS: {
      draft.app.notifications = [
        ...draft.app.notifications,
        {
          key: Date.now().toString(),
          type: 'success',
          message: action.value,
        },
      ];
      break;
    }
    case NOTIFICATION_REMOVE: {
      const key = action.value;
      draft.app.notifications = draft.app.notifications.filter(
        (item) => item.key != key
      );
      break;
    }
  }
};

export default reducers;
