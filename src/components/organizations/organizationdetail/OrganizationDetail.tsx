import React from 'react';
import './OrganizationDetail.scss';
import {
  OrganizationDetailActionsType,
  OrganizationDetailStateType,
} from './OrganizationDetail.container';
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { Button } from '@mui/material';

type OrganizationDetailState = {};
type OwnProps = {};
type OrganizationDetailProps = OwnProps &
  Partial<OrganizationDetailActionsType> &
  Partial<OrganizationDetailStateType>;

export default class OrganizationDetail extends React.Component<
  OrganizationDetailProps,
  OrganizationDetailState
> {
  constructor(
    props: OrganizationDetailProps | Readonly<OrganizationDetailProps>
  ) {
    super(props);
  }

  handleBackButtonClick = () => {
    location.href = '/organizations';
  };

  handleAddOrganizationMemberClick = () => {
    this.props.updateOrganizations!();
  };

  render() {
    return (
      <div className="organization-detail-wrapper">
        <div className="organization-detail-container">
          <div className="organization-detail-card">
            <Card>
              <CardContent>
                <div className="organization-detail-header">
                  <Button
                    style={{ marginRight: '16px' }}
                    onClick={this.handleBackButtonClick}
                  >
                    &lt; Organization List
                  </Button>
                </div>
                <div className="organization-detail-form">
                  <div className="organization-detail-form-row">
                    <TextField
                      id="organization-detail-name"
                      label="Name"
                      variant="outlined"
                      value={this.props.organization!.name}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="organization-detail-form-row">
                    <TextField
                      id="organization-detail-description"
                      label="Description"
                      variant="outlined"
                      multiline
                      rows={4}
                      value={this.props.organization!.description}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="organization-detail-form-row">
                    <TextField
                      id="organization-detail-icon-image-url"
                      label="Icon Image URL"
                      variant="outlined"
                      value={this.props.organization!.iconImageUrl}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="organization-detail-form-row">
                    <TextField
                      id="organization-detail-contact-email-address"
                      label="Contact Email Address"
                      variant="outlined"
                      value={this.props.organization!.contactEmailAddress}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="organization-detail-form-row">
                    <TextField
                      id="organization-detail-contact-person-name"
                      label="Contact Person Name"
                      variant="outlined"
                      value={this.props.organization!.contactPersonName}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="organization-detail-form-row">
                    <TextField
                      id="organization-detail-contact-tel"
                      label="Contact Telephone Number"
                      variant="outlined"
                      value={this.props.organization!.contactTel}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="organization-detail-form-row">
                    <TextField
                      id="organization-detail-contact-address"
                      label="Contact Address"
                      variant="outlined"
                      value={this.props.organization!.contactAddress}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="organization-detail-form-row">
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6">Members</Typography>
                        <List>
                          {this.props.organizationMembers!.map(
                            (member, index) => (
                              <ListItem key={index}>
                                <ListItemText
                                  primary={member.displayName}
                                  secondary={member.email}
                                />
                              </ListItem>
                            )
                          )}
                        </List>
                      </CardContent>
                    </Card>
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
