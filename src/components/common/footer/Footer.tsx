import React from 'react';
import { FooterActionsType, FooterStateType } from './Footer.container';
import './Footer.scss';
import moment from 'moment-timezone';

type FooterState = {};

type OwnProps = {};
type FooterPropsType = OwnProps &
  Partial<FooterActionsType> &
  Partial<FooterStateType>;

export default class Footer extends React.Component<
  FooterPropsType,
  FooterState
> {
  constructor(props: FooterPropsType | Readonly<FooterPropsType>) {
    super(props);
  }
  render() {
    return (
      <footer className="footer">
        <div className="dev-team">
          ©2020-{moment().format('YYYY')}{' '}
          <a
            href="https://github.com/orgs/remap-keys/teams/remap-team/members"
            target={'_blank'}
            rel={'noreferrer'}
          >
            Remap team.
          </a>
        </div>
        <div className="footer-contents">
          <a
            href="https://remap-keys.app/docs/terms_of_use"
            target={'_blank'}
            rel={'noreferrer'}
          >
            Terms of Use
          </a>
          <a
            href="https://remap-keys.app/docs/review_policy"
            target={'_blank'}
            rel={'noreferrer'}
          >
            Review Policy
          </a>
        </div>
        <div className="build-number">Build: {this.props.buildNumber}</div>
      </footer>
    );
  }
}
