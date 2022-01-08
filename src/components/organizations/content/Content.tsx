import React from 'react';
import { ContentActionsType, ContentStateType } from './Content.container';
import './Content.scss';
import { CircularProgress } from '@material-ui/core';
import Footer from '../../common/footer/Footer.container';
import { IOrganizationsPhase } from '../../../store/state';
import OrganizationsList from '../organizationslist/OrganizationsList.container';
import OrganizationDetail from '../organizationdetail/OrganizationDetail.container';
import OrganizationCreate from '../organizationcreate/OrganizationCreate.container';

type ContentState = {};
type OwnProps = {};
type ContentProps = OwnProps &
  Partial<ContentActionsType> &
  Partial<ContentStateType>;

export default class Content extends React.Component<
  ContentProps,
  ContentState
> {
  constructor(props: ContentProps | Readonly<ContentProps>) {
    super(props);
  }

  render() {
    return (
      <div className="organizations-content">
        <Contents phase={this.props.phase!} />
        <Footer />
      </div>
    );
  }
}

type ContentsProps = {
  phase: IOrganizationsPhase;
};
function Contents(props: ContentsProps) {
  switch (props.phase) {
    case 'init':
    case 'processing':
      return <PhaseProcessing />;
    case 'list':
      return <OrganizationsList />;
    case 'detail':
      return <OrganizationDetail />;
    case 'create':
      return <OrganizationCreate />;
    default:
      throw new Error(`Unknown state.app.phase value: ${props.phase}`);
  }
}

function PhaseProcessing() {
  return (
    <div className="organizations-phase-processing-wrapper">
      <div>
        <CircularProgress size={24} />
      </div>
      <div>Processing...</div>
    </div>
  );
}
