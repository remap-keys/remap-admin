import { RootState } from '../../store/state';
import { connect } from 'react-redux';
import Organizations from './Organizations';
import {
  NotificationActions,
  OrganizationsActionsThunk,
} from '../../actions/actions';

const mapStateToProps = (state: RootState) => {
  return {
    notifications: state.app.notifications,
    auth: state.auth.instance,
    storage: state.storage.instance,
  };
};
export type OrganizationsStateType = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (_dispatch: any) => {
  return {
    removeNotification: (key: string) => {
      _dispatch(NotificationActions.removeNotification(key));
    },
    updateOrganizations: () => {
      _dispatch(OrganizationsActionsThunk.updateOrganizations());
    },
  };
};
export type OrganizationsActionsType = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Organizations);
