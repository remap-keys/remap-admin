import { connect } from 'react-redux';
import { RootState } from '../../../store/state';
import Header from './Header';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state: RootState) => {
  return {};
};
export type HeaderStateType = ReturnType<typeof mapStateToProps>;

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (_dispatch: any) => {
  return {};
};
export type HeaderActionsType = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
