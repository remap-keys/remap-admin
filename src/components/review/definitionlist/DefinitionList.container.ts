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
    nameFilter: state.review.definitionlist.nameFilter,
    stats: state.review.definitionlist.keyboardDefinitionStats,
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
    updateNameFilter: (nameFilter: string) => {
      _dispatch(ReviewDefinitionListActions.updateNameFilter(nameFilter));
    },
  };
};
export type KeyboardListActionsType = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(DefinitionList);
