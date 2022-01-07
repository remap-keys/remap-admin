import { connect } from 'react-redux';
import { RootState } from '../../../store/state';
import { OrganizationsActionsThunk } from '../../../actions/actions';
import OrganizationDetail from './OrganizationDetail';

const mapStateToProps = (state: RootState) => {
  return {
    organization: state.entities.organization,
    organizationMembers: state.entities.organizationMembers,
  };
};
export type OrganizationDetailStateType = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (_dispatch: any) => {
  return {
    updateOrganizations: () => {
      _dispatch(OrganizationsActionsThunk.updateOrganizations());
    },
  };
};
export type OrganizationDetailActionsType = ReturnType<
  typeof mapDispatchToProps
>;

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationDetail);
