import './OrganizationsList.scss';
import React from 'react';
import {
  OrganizationsListActionsType,
  OrganizationsListStateType,
} from './OrganizationsList.container';
import { Button, Card, CardContent } from '@mui/material';
import moment from 'moment-timezone';
import { IOrganization } from '../../../services/storage/Storage';

type OrganizationsListState = {};
type OwnProps = {};
type OrganizationsListProps = OwnProps &
  Partial<OrganizationsListActionsType> &
  Partial<OrganizationsListStateType>;

export default class OrganizationsList extends React.Component<
  OrganizationsListProps,
  OrganizationsListState
> {
  constructor(
    props: OrganizationsListProps | Readonly<OrganizationsListProps>
  ) {
    super(props);
  }

  handleCreateOrganizationButtonClick = () => {
    this.props.createOrganization!();
  };

  render() {
    return (
      <div className="organizations-list-wrapper">
        <div className="organizations-list-container">
          <div className="organizations-list-buttons">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleCreateOrganizationButtonClick}
            >
              + Organization
            </Button>
          </div>
          <div className="organizations-list">
            {this.props.organizations!.length > 0 ? (
              this.props.organizations!.map(
                (organizationWithMembers, index) => (
                  <div key={index} className="organizations">
                    <OrganizationRow
                      organization={organizationWithMembers.organization}
                      updateOrganization={this.props.updateOrganization!}
                    />
                  </div>
                )
              )
            ) : (
              <div className="organizations">
                <div className="no-registered-organization">
                  There is no organization.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

type OrganizationProps = {
  organization: IOrganization;
  // eslint-disable-next-line no-unused-vars
  updateOrganization: (organizationId: string) => void;
};

class OrganizationRow extends React.Component<OrganizationProps, any> {
  render() {
    return (
      <Card>
        <CardContent>
          <div className="organizations-container">
            <div className="organizations-container-left">
              <div className="organizations-header">
                <h2 className="organizations-name">
                  {this.props.organization.name}
                </h2>
              </div>
              <div className="organizations-meta">
                <div className="organizations-meta-info">
                  <span className="organizations-meta-info-label">
                    Description:
                  </span>
                  {this.props.organization.description}
                </div>
              </div>
              <div className="organizations-meta">
                <div className="organizations-meta-info">
                  <span className="organizations-meta-info-label">
                    Created at:
                  </span>
                  {moment(this.props.organization.createdAt).format(
                    'YYYY-MM-DD HH:mm:ss'
                  )}
                </div>
                <div className="organizations-meta-info">
                  <span className="organizations-meta-info-label">
                    Updated at:{' '}
                  </span>
                  {moment(this.props.organization.updatedAt).format(
                    'YYYY-MM-DD HH:mm:ss'
                  )}
                </div>
              </div>
            </div>
            <div className="organizations-container-right">
              <Button
                color="primary"
                onClick={() => {
                  this.props.updateOrganization(this.props.organization.id);
                }}
              >
                Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}
