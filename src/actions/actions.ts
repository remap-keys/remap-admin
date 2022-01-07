import {
  IOrganizationsPhase,
  IReviewPhase,
  ReviewPhase,
  RootState,
} from '../store/state';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  IKeyboardDefinition,
  IKeyboardDefinitionDetail,
  IKeyboardDefinitionStats,
  IKeyboardDefinitionStatus,
  IOrganization,
  IOrganizationMember,
  IOrganizationWithMembers,
} from '../services/storage/Storage';

const NotifyType = ['success', 'warning', 'error', 'info'] as const;
export type NotificationType = typeof NotifyType[number];
export type NotificationItem = {
  key: string;
  type: NotificationType;
  message: string;
};
export const NOTIFICATION_ACTIONS = '@Notification';
export const NOTIFICATION_ADD_ERROR = `${NOTIFICATION_ACTIONS}/AddError`;
export const NOTIFICATION_ADD_WARN = `${NOTIFICATION_ACTIONS}/AddWarn`;
export const NOTIFICATION_ADD_INFO = `${NOTIFICATION_ACTIONS}/AddInfo`;
export const NOTIFICATION_ADD_SUCCESS = `${NOTIFICATION_ACTIONS}/AddSuccess`;
export const NOTIFICATION_REMOVE = `${NOTIFICATION_ACTIONS}/Remove`;
export const NotificationActions = {
  addError: (message: string, cause?: any) => {
    return {
      type: NOTIFICATION_ADD_ERROR,
      value: {
        message,
        cause,
      },
    };
  },
  addWarn: (message: string, cause?: any) => {
    return {
      type: NOTIFICATION_ADD_WARN,
      value: {
        message,
        cause,
      },
    };
  },
  addInfo: (message: string) => {
    return {
      type: NOTIFICATION_ADD_INFO,
      value: message,
    };
  },
  addSuccess: (message: string) => {
    return {
      type: NOTIFICATION_ADD_SUCCESS,
      value: message,
    };
  },
  removeNotification: (key: string) => {
    return {
      type: NOTIFICATION_REMOVE,
      value: key,
    };
  },
};

export const REVIEW_APP_ACTIONS = '@ReviewApp';
export const REVIEW_APP_UPDATE_REVIEW_PHASE = `${REVIEW_APP_ACTIONS}/UpdateReviewPhase`;
export const ReviewAppActions = {
  updateReviewPhase: (reviewPhase: IReviewPhase) => {
    return {
      type: REVIEW_APP_UPDATE_REVIEW_PHASE,
      value: reviewPhase,
    };
  },
};

export const REVIEW_DEFINITION_LIST_ACTIONS = '@ReviewDefinitionList';
export const REVIEW_DEFINITION_LIST_UPDATE_KEYBOARD_DEFINITION_LIST = `${REVIEW_DEFINITION_LIST_ACTIONS}/UpdateKeyboardDefinitionList`;
export const REVIEW_DEFINITION_LIST_UPDATE_KEYBOARD_DEFINITION_STATUS = `${REVIEW_DEFINITION_LIST_ACTIONS}/UpdateKeyboardDefinitionStatus`;
export const REVIEW_DEFINITION_LIST_UPDATE_NAME_FILTER = `${REVIEW_DEFINITION_LIST_ACTIONS}/NameFilter`;
export const REVIEW_DEFINITION_LIST_UPDATE_KEYBOARD_DEFINITION_STATS = `${REVIEW_DEFINITION_LIST_ACTIONS}/KeyboardDefinitionStats`;
export const ReviewDefinitionListActions = {
  updateKeyboardDefinitionList: (
    keyboardDefinitionList: IKeyboardDefinition[]
  ) => {
    return {
      type: REVIEW_DEFINITION_LIST_UPDATE_KEYBOARD_DEFINITION_LIST,
      value: keyboardDefinitionList,
    };
  },
  updateKeyboardDefinitionStatus: (status: IKeyboardDefinitionStatus) => {
    return {
      type: REVIEW_DEFINITION_LIST_UPDATE_KEYBOARD_DEFINITION_STATUS,
      value: status,
    };
  },
  updateNameFilter: (nameFilter: string) => {
    return {
      type: REVIEW_DEFINITION_LIST_UPDATE_NAME_FILTER,
      value: nameFilter,
    };
  },
  updateKeyboardDefinitionStats: (stats: IKeyboardDefinitionStats) => {
    return {
      type: REVIEW_DEFINITION_LIST_UPDATE_KEYBOARD_DEFINITION_STATS,
      value: stats,
    };
  },
};

export const REVIEW_DEFINITION_DETAIL_ACTIONS = '@ReviewDefinitionDetail';
export const REVIEW_DEFINITION_DETAIL_UPDATE_KEYBOARD_DEFINITION_DETAIL = `${REVIEW_DEFINITION_DETAIL_ACTIONS}/UpdateKeyboardDefinitionDetail`;
export const REVIEW_DEFINITION_DETAIL_UPDATE_KEYBOARD_DEFINITION_STATUS = `${REVIEW_DEFINITION_DETAIL_ACTIONS}/UpdateKeyboardDefinitionStatus`;
export const REVIEW_DEFINITION_DETAIL_UPDATE_REJECT_REASON = `${REVIEW_DEFINITION_DETAIL_ACTIONS}/UpdateRejectReason`;
export const REVIEW_DEFINITION_DETAIL_UPDATE_ORGANIZATION = `${REVIEW_DEFINITION_DETAIL_ACTIONS}/UpdateOrganization`;
export const ReviewDefinitionDetailActions = {
  updateKeyboardDefinitionDetail: (
    keyboardDefinitionDetail: IKeyboardDefinitionDetail
  ) => {
    return {
      type: REVIEW_DEFINITION_DETAIL_UPDATE_KEYBOARD_DEFINITION_DETAIL,
      value: keyboardDefinitionDetail,
    };
  },
  updateKeyboardDefinitionStatus: (status: IKeyboardDefinitionStatus) => {
    return {
      type: REVIEW_DEFINITION_DETAIL_UPDATE_KEYBOARD_DEFINITION_STATUS,
      value: status,
    };
  },
  updateRejectReason: (reason: string) => {
    return {
      type: REVIEW_DEFINITION_DETAIL_UPDATE_REJECT_REASON,
      value: reason,
    };
  },
  updateOrganization: (organization: IOrganization) => {
    return {
      type: REVIEW_DEFINITION_DETAIL_UPDATE_ORGANIZATION,
      value: organization,
    };
  },
};

export const ORGANIZATIONS_APP_ACTIONS = '@Organizations!App';
export const ORGANIZATIONS_APP_UPDATE_PHASE = `${ORGANIZATIONS_APP_ACTIONS}/UpdatePhase`;
export const OrganizationsAppActions = {
  updatePhase: (phase: IOrganizationsPhase) => {
    return {
      type: ORGANIZATIONS_APP_UPDATE_PHASE,
      value: phase,
    };
  },
};

export const ORGANIZATIONS_LIST_ACTIONS = '@OrganizationsList';
export const ORGANIZATIONS_LIST_UPDATE_ORGANIZATIONS = `${ORGANIZATIONS_LIST_ACTIONS}/UpdateOrganizations`;
export const OrganizationsListActions = {
  updateOrganizations: (organizations: IOrganizationWithMembers[]) => {
    return {
      type: ORGANIZATIONS_LIST_UPDATE_ORGANIZATIONS,
      value: organizations,
    };
  },
};

export const ORGANIZATION_DETAIL_ACTIONS = '@OrganizationDetail';
export const ORGANIZATION_DETAIL_UPDATE_ORGANIZATION = `${ORGANIZATION_DETAIL_ACTIONS}/UpdateOrganization`;
export const ORGANIZATION_DETAIL_UPDATE_ORGANIZATION_MEMBERS = `${ORGANIZATION_DETAIL_ACTIONS}/UpdateOrganizationMembers`;
export const OrganizationDetailActions = {
  updateOrganization: (organization: IOrganization) => {
    return {
      type: ORGANIZATION_DETAIL_UPDATE_ORGANIZATION,
      value: organization,
    };
  },
  updateOrganizationMembers: (organizationMembers: IOrganizationMember[]) => {
    return {
      type: ORGANIZATION_DETAIL_UPDATE_ORGANIZATION_MEMBERS,
      value: organizationMembers,
    };
  },
};

type ActionTypes = ReturnType<
  | typeof ReviewAppActions[keyof typeof ReviewAppActions]
  | typeof ReviewDefinitionListActions[keyof typeof ReviewDefinitionListActions]
  | typeof ReviewDefinitionDetailActions[keyof typeof ReviewDefinitionDetailActions]
  | typeof NotificationActions[keyof typeof NotificationActions]
  | typeof OrganizationsListActions[keyof typeof OrganizationsListActions]
  | typeof OrganizationDetailActions[keyof typeof OrganizationDetailActions]
>;
type ThunkPromiseAction<T> = ThunkAction<
  Promise<T>,
  RootState,
  undefined,
  ActionTypes
>;

export const ReviewActionsThunk = {
  // eslint-disable-next-line no-undef
  updateKeyboardDefinitionList: (): ThunkPromiseAction<void> => async (
    dispatch: ThunkDispatch<RootState, undefined, ActionTypes>,
    // eslint-disable-next-line no-unused-vars
    getState: () => RootState
  ) => {
    const { storage, review } = getState();
    const definitionListResult = await storage.instance.fetchKeyboardDefinitionList(
      review.definitionlist.keyboardDefinitionStatus
    );
    if (!definitionListResult.success) {
      console.error(definitionListResult.cause!);
      dispatch(
        NotificationActions.addError(
          definitionListResult.error!,
          definitionListResult.cause
        )
      );
      return;
    }
    dispatch(
      ReviewDefinitionListActions.updateKeyboardDefinitionList(
        definitionListResult.keyboardDefinitionList!
      )
    );
    dispatch(ReviewAppActions.updateReviewPhase(ReviewPhase.list));
  },

  updateKeyboardDefinitionDetail: (
    definitionId: string
  ): ThunkPromiseAction<void> => async (
    dispatch: ThunkDispatch<RootState, undefined, ActionTypes>,
    getState: () => RootState
  ) => {
    const { storage } = getState();
    const definitionDetailResult = await storage.instance.fetchKeyboardDefinitionDetail(
      definitionId
    );
    if (!definitionDetailResult.success) {
      console.error(definitionDetailResult.cause!);
      dispatch(
        NotificationActions.addError(
          definitionDetailResult.error!,
          definitionDetailResult.cause
        )
      );
      return;
    }
    if (
      definitionDetailResult.keyboardDefinitionDetail!.authorType ===
      'organization'
    ) {
      const organizationResult = await storage.instance.fetchOrganization(
        definitionDetailResult.keyboardDefinitionDetail!.organizationId!
      );
      if (!organizationResult.success) {
        console.error(organizationResult.cause!);
        dispatch(
          NotificationActions.addError(
            organizationResult.error!,
            organizationResult.cause
          )
        );
        return;
      }
      dispatch(
        ReviewDefinitionDetailActions.updateOrganization(
          organizationResult.organizationWithMembers!.organization
        )
      );
    }
    dispatch(
      ReviewDefinitionDetailActions.updateKeyboardDefinitionDetail(
        definitionDetailResult.keyboardDefinitionDetail!
      )
    );
    dispatch(
      ReviewDefinitionDetailActions.updateKeyboardDefinitionStatus(
        definitionDetailResult.keyboardDefinitionDetail!.status
      )
    );
    dispatch(
      ReviewDefinitionDetailActions.updateRejectReason(
        definitionDetailResult.keyboardDefinitionDetail!.rejectReason || ''
      )
    );
    dispatch(ReviewAppActions.updateReviewPhase(ReviewPhase.detail));
  },

  reviewKeyboardDefinition: (): ThunkPromiseAction<void> => async (
    dispatch: ThunkDispatch<RootState, undefined, ActionTypes>,
    getState: () => RootState
  ) => {
    const { storage, entities, review } = getState();
    const definitionId = entities.keyboardDefinitionDetail!.id;
    const status = review.definitiondetail.keyboardDefinitionStatus;
    const rejectReason = review.definitiondetail.rejectReason;
    const result = await storage.instance.updateKeyboardDefinitionStatus(
      definitionId,
      status,
      rejectReason
    );
    if (!result.success) {
      console.error(result.cause!);
      dispatch(NotificationActions.addError(result.error!, result.cause));
      return;
    }
    dispatch(
      await ReviewActionsThunk.updateKeyboardDefinitionDetail(definitionId)
    );
    dispatch(ReviewAppActions.updateReviewPhase(ReviewPhase.detail));
  },

  updateKeyboardDefinitionStats: (): ThunkPromiseAction<void> => async (
    dispatch: ThunkDispatch<RootState, undefined, ActionTypes>,
    getState: () => RootState
  ) => {
    const { storage } = getState();
    const result = await storage.instance.fetchKeyboardDefinitionStats();
    if (!result.success) {
      console.error(result.cause!);
      dispatch(NotificationActions.addError(result.error!, result.cause));
      return;
    }
    dispatch(
      ReviewDefinitionListActions.updateKeyboardDefinitionStats(result.stats!)
    );
  },
};

export const OrganizationsActionsThunk = {
  updateOrganizations: (): ThunkPromiseAction<void> => async (
    dispatch: ThunkDispatch<RootState, undefined, ActionTypes>,
    // eslint-disable-next-line no-unused-vars
    getState: () => RootState
  ) => {
    dispatch(OrganizationsAppActions.updatePhase('processing'));
    const { storage } = getState();
    const result = await storage.instance!.fetchOrganizations();
    if (!result.success) {
      console.error(result.cause!);
      dispatch(NotificationActions.addError(result.error!, result.cause));
      return;
    }
    dispatch(
      OrganizationsListActions.updateOrganizations(result.organizations!)
    );
    dispatch(OrganizationsAppActions.updatePhase('list'));
  },

  updateOrganization: (
    organizationId: string
  ): ThunkPromiseAction<void> => async (
    dispatch: ThunkDispatch<RootState, undefined, ActionTypes>,
    getState: () => RootState
  ) => {
    dispatch(OrganizationsAppActions.updatePhase('processing'));
    const { storage } = getState();
    const organizationResult = await storage.instance.fetchOrganization(
      organizationId
    );
    if (!organizationResult.success) {
      console.error(organizationResult.cause!);
      dispatch(
        NotificationActions.addError(
          organizationResult.error!,
          organizationResult.cause
        )
      );
      return;
    }
    dispatch(
      OrganizationDetailActions.updateOrganization(
        organizationResult.organizationWithMembers!.organization
      )
    );
    dispatch(
      OrganizationDetailActions.updateOrganizationMembers(
        organizationResult.organizationWithMembers!.organizationMembers
      )
    );
    dispatch(OrganizationsAppActions.updatePhase('detail'));
  },
};
