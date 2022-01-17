import React from 'react';
import './OrganizationCreate.scss';
import {
  OrganizationCreateActionsType,
  OrganizationCreateStateType,
} from './OrganizationCreate.container';
import { Card, CardContent, TextField } from '@mui/material';
import { Button } from '@mui/material';

type OrganizationCreateState = {};
type OwnProps = {};
type OrganizationCreateProps = OwnProps &
  Partial<OrganizationCreateActionsType> &
  Partial<OrganizationCreateStateType>;

export default class OrganizationCreate extends React.Component<
  OrganizationCreateProps,
  OrganizationCreateState
> {
  constructor(
    props: OrganizationCreateProps | Readonly<OrganizationCreateProps>
  ) {
    super(props);
  }

  handleBackButtonClick = () => {
    this.props.updateOrganizations!();
  };

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateName!(event.target.value);
  };

  handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateDescription!(event.target.value);
  };

  handleWebsiteUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateWebsiteUrl!(event.target.value);
  };

  handleIconImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateIconImageUrl!(event.target.value);
  };

  handleContactPersonNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.updateContactPersonName!(event.target.value);
  };

  handleContactEmailAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.updateContactEmailAddress!(event.target.value);
  };

  handleContactAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateContactAddress!(event.target.value);
  };

  handleContactTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateContactTel!(event.target.value);
  };

  handleMemberEmailAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.updateMemberEmailAddress!(event.target.value);
  };

  handleCreateOrganizationButtonClick = () => {
    this.props.createOrganization!();
  };

  private isFilledInAllFields(): boolean {
    return (
      !!this.props.name &&
      !!this.props.description &&
      !!this.props.websiteUrl &&
      !!this.props.iconImageUrl &&
      !!this.props.contactPersonName &&
      !!this.props.contactEmailAddress &&
      !!this.props.contactAddress &&
      !!this.props.contactTel &&
      !!this.props.memberEmailAddress
    );
  }

  render() {
    return (
      <div className="organization-create-wrapper">
        <div className="organization-create-container">
          <div className="organization-create-card">
            <Card>
              <CardContent>
                <div className="organization-create-header">
                  <Button
                    style={{ marginRight: '16px' }}
                    onClick={this.handleBackButtonClick}
                  >
                    &lt; Organization List
                  </Button>
                </div>
                <div className="organization-create-form">
                  <div className="organization-create-form-row">
                    <TextField
                      id="organization-create-name"
                      label="Name"
                      variant="outlined"
                      value={this.props.name}
                      onChange={this.handleNameChange}
                    />
                  </div>
                  <div className="organization-create-form-row">
                    <TextField
                      id="organization-create-description"
                      label="Description"
                      variant="outlined"
                      multiline
                      rows={4}
                      value={this.props.description}
                      onChange={this.handleDescriptionChange}
                    />
                  </div>
                  <div className="organization-create-form-row">
                    <TextField
                      id="organization-create-icon-image-url"
                      label="Icon Image URL"
                      variant="outlined"
                      value={this.props.iconImageUrl}
                      onChange={this.handleIconImageUrlChange}
                    />
                  </div>
                  <div className="organization-create-form-row">
                    <TextField
                      id="organization-create-website-url"
                      label="Website URL"
                      variant="outlined"
                      value={this.props.websiteUrl}
                      onChange={this.handleWebsiteUrlChange}
                    />
                  </div>
                  <div className="organization-create-form-row">
                    <TextField
                      id="organization-create-contact-person-name"
                      label="Contact Person Name"
                      variant="outlined"
                      value={this.props.contactPersonName}
                      onChange={this.handleContactPersonNameChange}
                    />
                  </div>
                  <div className="organization-create-form-row">
                    <TextField
                      id="organization-create-contact-email-address"
                      label="Contact Email Address"
                      variant="outlined"
                      value={this.props.contactEmailAddress}
                      onChange={this.handleContactEmailAddressChange}
                    />
                  </div>
                  <div className="organization-create-form-row">
                    <TextField
                      id="organization-create-contact-tel"
                      label="Contact Telephone Number"
                      variant="outlined"
                      value={this.props.contactTel}
                      onChange={this.handleContactTelChange}
                    />
                  </div>
                  <div className="organization-create-form-row">
                    <TextField
                      id="organization-create-contact-address"
                      label="Contact Address"
                      variant="outlined"
                      value={this.props.contactAddress}
                      onChange={this.handleContactAddressChange}
                    />
                  </div>
                  <div className="organization-create-form-row">
                    <TextField
                      id="organization-create-member-email-address"
                      label="Member Email Address"
                      variant="outlined"
                      value={this.props.memberEmailAddress}
                      onChange={this.handleMemberEmailAddressChange}
                    />
                  </div>
                  <div className="organization-create-form-buttons">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!this.isFilledInAllFields()}
                      onClick={this.handleCreateOrganizationButtonClick}
                    >
                      Create Organization
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
