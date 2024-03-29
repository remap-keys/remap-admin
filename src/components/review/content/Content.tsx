import React from 'react';
import { ContentActionsType, ContentStateType } from './Content.container';
import './Content.scss';
import { CircularProgress } from '@mui/material';
import Footer from '../../common/footer/Footer.container';
import { IReviewPhase, ReviewPhase } from '../../../store/state';
import DefinitionList from '../definitionlist/DefinitionList.container';
import DefinitionDetail from '../definitiondetail/DefinitionDetail.container';

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
      <div className="keyboards-content">
        <Contents phase={this.props.phase!} />
        <Footer />
      </div>
    );
  }
}

type ContentsProps = {
  phase: IReviewPhase;
};
function Contents(props: ContentsProps) {
  switch (props.phase) {
    case ReviewPhase.init:
    case ReviewPhase.processing:
      return <PhaseProcessing />;
    case ReviewPhase.list:
      return <DefinitionList />;
    case ReviewPhase.detail:
      return <DefinitionDetail />;
    default:
      throw new Error(`Unknown state.app.phase value: ${props.phase}`);
  }
}

function PhaseProcessing() {
  return (
    <div className="keyboards-phase-processing-wrapper">
      <div>
        <CircularProgress size={24} />
      </div>
      <div>Processing...</div>
    </div>
  );
}
