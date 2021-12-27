import immer from 'immer';
import { INIT_STATE, RootState } from './state';
import {
  NOTIFICATION_ACTIONS,
  NOTIFICATION_ADD_ERROR,
  NOTIFICATION_ADD_INFO,
  NOTIFICATION_ADD_SUCCESS,
  NOTIFICATION_ADD_WARN,
  NOTIFICATION_REMOVE,
  REVIEW_APP_ACTIONS,
  REVIEW_DEFINITION_DETAIL_UPDATE_KEYBOARD_DEFINITION_DETAIL,
  REVIEW_DEFINITION_LIST_UPDATE_KEYBOARD_DEFINITION_LIST,
  REVIEW_DEFINITION_LIST_UPDATE_KEYBOARD_DEFINITION_STATUS,
  REVIEW_APP_UPDATE_REVIEW_PHASE,
  REVIEW_DEFINITION_LIST_ACTIONS,
  REVIEW_DEFINITION_DETAIL_ACTIONS,
  REVIEW_DEFINITION_DETAIL_UPDATE_KEYBOARD_DEFINITION_STATUS,
  REVIEW_DEFINITION_DETAIL_UPDATE_REJECT_REASON,
  REVIEW_DEFINITION_LIST_UPDATE_NAME_FILTER,
  REVIEW_DEFINITION_LIST_UPDATE_KEYBOARD_DEFINITION_STATS,
  REVIEW_DEFINITION_DETAIL_UPDATE_ORGANIZATION,
} from '../actions/actions';
import { WritableDraft } from 'immer/dist/types/types-external';

export type Action = { type: string; value: any };

const reducers = (state: RootState = INIT_STATE, action: Action) =>
  immer(state, (draft) => {
    if (action.type.startsWith(NOTIFICATION_ACTIONS)) {
      notificationReducer(action, draft);
    } else if (action.type.startsWith(REVIEW_APP_ACTIONS)) {
      reviewAppReducer(action, draft);
    } else if (action.type.startsWith(REVIEW_DEFINITION_LIST_ACTIONS)) {
      reviewDefinitionListReducer(action, draft);
    } else if (action.type.startsWith(REVIEW_DEFINITION_DETAIL_ACTIONS)) {
      reviewDefinitionDetailReducer(action, draft);
    }
  });

const reviewAppReducer = (action: Action, draft: WritableDraft<RootState>) => {
  switch (action.type) {
    case REVIEW_APP_UPDATE_REVIEW_PHASE:
      draft.review.app.reviewPhase = action.value;
      break;
  }
};

const reviewDefinitionListReducer = (
  action: Action,
  draft: WritableDraft<RootState>
) => {
  switch (action.type) {
    case REVIEW_DEFINITION_LIST_UPDATE_KEYBOARD_DEFINITION_LIST:
      draft.entities.keyboardDefinitionList = action.value;
      break;
    case REVIEW_DEFINITION_LIST_UPDATE_KEYBOARD_DEFINITION_STATUS:
      draft.review.definitionlist.keyboardDefinitionStatus = action.value;
      break;
    case REVIEW_DEFINITION_LIST_UPDATE_NAME_FILTER:
      draft.review.definitionlist.nameFilter = action.value;
      break;
    case REVIEW_DEFINITION_LIST_UPDATE_KEYBOARD_DEFINITION_STATS:
      draft.review.definitionlist.keyboardDefinitionStats = action.value;
      break;
  }
};

const reviewDefinitionDetailReducer = (
  action: Action,
  draft: WritableDraft<RootState>
) => {
  switch (action.type) {
    case REVIEW_DEFINITION_DETAIL_UPDATE_KEYBOARD_DEFINITION_DETAIL:
      draft.entities.keyboardDefinitionDetail = action.value;
      break;
    case REVIEW_DEFINITION_DETAIL_UPDATE_KEYBOARD_DEFINITION_STATUS:
      draft.review.definitiondetail.keyboardDefinitionStatus = action.value;
      break;
    case REVIEW_DEFINITION_DETAIL_UPDATE_REJECT_REASON:
      draft.review.definitiondetail.rejectReason = action.value;
      break;
    case REVIEW_DEFINITION_DETAIL_UPDATE_ORGANIZATION:
      draft.entities.organization = action.value;
      break;
  }
};

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
