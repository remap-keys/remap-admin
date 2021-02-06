import { connect } from 'react-redux';
import { ReviewPhase, RootState } from '../../../store/state';
import DefinitionDetail from './DefinitionDetail';
import { IKeyboardDefinitionStatus } from '../../../services/storage/Storage';
import {
  ReviewActionsThunk,
  ReviewAppActions,
  ReviewDefinitionDetailActions,
} from '../../../actions/actions';

const mapStateToProps = (state: RootState) => {
  return {
    keyboardDefinitionDetail: state.entities.keyboardDefinitionDetail,
    keyboardDefinitionStatus:
      state.review.definitiondetail.keyboardDefinitionStatus,
    rejectReason: state.review.definitiondetail.rejectReason,
  };
};
export type DefinitionDetailStateType = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (_dispatch: any) => {
  return {
    updateKeyboardDefinitionStatus: (status: IKeyboardDefinitionStatus) => {
      _dispatch(
        ReviewDefinitionDetailActions.updateKeyboardDefinitionStatus(status)
      );
    },
    updateRejectReason: (reason: string) => {
      _dispatch(ReviewDefinitionDetailActions.updateRejectReason(reason));
    },
    reviewKeyboardDefinition: () => {
      _dispatch(ReviewAppActions.updateReviewPhase(ReviewPhase.processing));
      _dispatch(ReviewActionsThunk.reviewKeyboardDefinition());
    },
  };
};
export type DefinitionDetailActionsType = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(DefinitionDetail);
