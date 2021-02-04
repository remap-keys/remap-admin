import React from 'react';
import './Header.scss';
import { HeaderActionsType, HeaderStateType } from './Header.container';
import { Logo } from '../../common/logo/Logo';

type HeaderState = {};
type OwnProps = {};
type HeaderProps = OwnProps &
  Partial<HeaderActionsType> &
  Partial<HeaderStateType>;

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps | Readonly<HeaderProps>) {
    super(props);
  }

  render() {
    return (
      <header className="review-header">
        <a href="/" className="review-header-logo">
          <Logo width={100} />
        </a>
      </header>
    );
  }
}

export default Header;
