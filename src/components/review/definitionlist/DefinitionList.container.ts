import { connect } from 'react-redux';
import { ReviewPhase, RootState } from '../../../store/state';
import DefinitionList from './DefinitionList';
import { IKeyboardDefinitionStatus } from '../../../services/storage/Storage';
import {
  ReviewAppActions,
  ReviewActionsThunk,
  ReviewDefinitionListActions,
} from '../../../actions/actions';

const mapStateToProps = (state: RootState) => {
  return {
    keyboardDefinitionList: state.entities.keyboardDefinitionList,
    status: state.review.definitionlist.keyboardDefinitionStatus,
  };
};
export type KeyboardListStateType = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (_dispatch: any) => {
  return {
    updateKeyboardDefinitionStatus: (status: IKeyboardDefinitionStatus) => {
      _dispatch(
        ReviewDefinitionListActions.updateKeyboardDefinitionStatus(status)
      );
      _dispatch(ReviewAppActions.updateReviewPhase(ReviewPhase.processing));
      _dispatch(ReviewActionsThunk.updateKeyboardDefinitionList());
    },
  };
};
export type KeyboardListActionsType = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(DefinitionList);
