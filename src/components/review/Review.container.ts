import { RootState } from '../../store/state';
import { connect } from 'react-redux';
import Review from './Review';
import { NotificationActions } from '../../actions/actions';

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
  };
};
export type ReviewActionsType = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Review);
