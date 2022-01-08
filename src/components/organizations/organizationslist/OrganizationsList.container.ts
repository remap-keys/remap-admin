import { connect } from 'react-redux';
import { RootState } from '../../../store/state';
import OrganizationsList from './OrganizationsList';
import {
  OrganizationCreateActions,
  OrganizationsActionsThunk,
  OrganizationsAppActions,
} from '../../../actions/actions';

const mapStateToProps = (state: RootState) => {
  return {
    organizations: [...state.entities.organizations].sort(
      (a, b) => b.organization.updatedAt - a.organization.updatedAt
    ),
  };
};
export type OrganizationsListStateType = ReturnType<typeof mapStateToProps>;

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (_dispatch: any) => {
  return {
    updateOrganization: (organizationId: string) => {
      _dispatch(OrganizationsActionsThunk.updateOrganization(organizationId));
    },
    createOrganization: () => {
      _dispatch(OrganizationCreateActions.initialize());
      _dispatch(OrganizationsAppActions.updatePhase('create'));
    },
  };
};
export type OrganizationsListActionsType = ReturnType<
  typeof mapDispatchToProps
>;

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsList);
