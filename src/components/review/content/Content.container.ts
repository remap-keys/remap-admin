import { connect } from 'react-redux';
import { RootState } from '../../../store/state';
import Content from './Content';

const mapStateToProps = (state: RootState) => {
  return {
    phase: state.review.app.reviewPhase,
  };
};
export type ContentStateType = ReturnType<typeof mapStateToProps>;

/* eslint-disable-next-line no-unused-vars */
const mapDispatchToProps = (_dispatch: any) => {
  return {};
};
export type ContentActionsType = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Content);
