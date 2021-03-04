import { ReviewPhase, RootState } from '../../store/state';
import { connect } from 'react-redux';
import Review from './Review';
import {
  NotificationActions,
  ReviewAppActions,
  ReviewActionsThunk,
} from '../../actions/actions';

const mapStateToProps = (state: RootState) => {
  return {
    notifications: state.app.notifications,
    auth: state.auth.instance,
    storage: state.storage.instance,
  };
};
export type ReviewStateType = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (_dispatch: any) => {
  return {
    removeNotification: (key: string) => {
      _dispatch(NotificationActions.removeNotification(key));
    },
    updateKeyboardDefinitionList: () => {
      _dispatch(ReviewAppActions.updateReviewPhase(ReviewPhase.processing));
      _dispatch(ReviewActionsThunk.updateKeyboardDefinitionStats());
      _dispatch(ReviewActionsThunk.updateKeyboardDefinitionList());
    },
    updateKeyboardDefinitionDetail: (definitionId: string) => {
      _dispatch(ReviewAppActions.updateReviewPhase(ReviewPhase.processing));
      _dispatch(
        ReviewActionsThunk.updateKeyboardDefinitionDetail(definitionId)
      );
    },
  };
};
export type ReviewActionsType = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Review);
