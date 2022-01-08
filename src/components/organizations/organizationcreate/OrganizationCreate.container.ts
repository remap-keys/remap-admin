import { connect } from 'react-redux';
import { RootState } from '../../../store/state';
import OrganizationCreate from './OrganizationCreate';
import {
  OrganizationCreateActions,
  OrganizationsActionsThunk,
} from '../../../actions/actions';

const mapStateToProps = (state: RootState) => {
  return {
    name: state.organizations.organizationcreate.name,
    description: state.organizations.organizationcreate.description,
    websiteUrl: state.organizations.organizationcreate.websiteUrl,
    iconImageUrl: state.organizations.organizationcreate.iconImageUrl,
    contactEmailAddress:
      state.organizations.organizationcreate.contactEmailAddress,
    contactAddress: state.organizations.organizationcreate.contactAddress,
    contactTel: state.organizations.organizationcreate.contactTel,
    contactPersonName: state.organizations.organizationcreate.contactPersonName,
    memberEmailAddress:
      state.organizations.organizationcreate.memberEmailAddress,
  };
};
export type OrganizationCreateStateType = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (_dispatch: any) => {
  return {
    updateOrganizations: () => {
      _dispatch(OrganizationsActionsThunk.updateOrganizations());
    },
    updateName: (name: string) => {
      _dispatch(OrganizationCreateActions.updateName(name));
    },
    updateDescription: (description: string) => {
      _dispatch(OrganizationCreateActions.updateDescription(description));
    },
    updateWebsiteUrl: (websiteUrl: string) => {
      _dispatch(OrganizationCreateActions.updateWebsiteUrl(websiteUrl));
    },
    updateIconImageUrl: (iconImageUrl: string) => {
      _dispatch(OrganizationCreateActions.updateIconImageUrl(iconImageUrl));
    },
    updateContactAddress: (contactAddress: string) => {
      _dispatch(OrganizationCreateActions.updateContactAddress(contactAddress));
    },
    updateContactTel: (contactTel: string) => {
      _dispatch(OrganizationCreateActions.updateContactTel(contactTel));
    },
    updateContactEmailAddress: (contactEmailAddress: string) => {
      _dispatch(
        OrganizationCreateActions.updateContactEmailAddress(contactEmailAddress)
      );
    },
    updateContactPersonName: (contactPersonName: string) => {
      _dispatch(
        OrganizationCreateActions.updateContactPersonName(contactPersonName)
      );
    },
    updateMemberEmailAddress: (memberEmailAddress: string) => {
      _dispatch(
        OrganizationCreateActions.updateMemberEmailAddress(memberEmailAddress)
      );
    },
    createOrganization: () => {
      _dispatch(OrganizationsActionsThunk.createOrganization());
    },
  };
};
export type OrganizationCreateActionsType = ReturnType<
  typeof mapDispatchToProps
>;

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationCreate);
