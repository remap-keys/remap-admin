import { ReviewActionsType, ReviewStateType } from './Review.container';
import { ProviderContext, withSnackbar } from 'notistack';
import { NotificationItem } from '../../actions/actions';
import { Button, CssBaseline } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import Header from '../common/header/Header.container';
import Content from './content/Content.container';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type ParamsType = {
  definitionId: string;
};
type OwnProps = {};
type ReviewProps = OwnProps &
  Partial<ReviewStateType> &
  Partial<ReviewActionsType> &
  ProviderContext &
  RouteComponentProps<ParamsType>;
type OwnState = {
  signedIn: boolean;
};

class Review extends React.Component<ReviewProps, OwnState> {
  private displayedNotificationIds: string[] = [];

  constructor(props: ReviewProps) {
    super(props);
    this.state = {
      signedIn: true,
    };
  }

  private storeDisplayedNotification = (key: string) => {
    this.displayedNotificationIds = [...this.displayedNotificationIds, key];
  };

  private removeDisplayedNotification = (key: string) => {
    this.displayedNotificationIds = [
      ...this.displayedNotificationIds.filter((k) => key !== k),
    ];
  };

  private updateNotifications() {
    this.props.notifications!.forEach((item: NotificationItem) => {
      if (this.displayedNotificationIds.includes(item.key)) return;

      this.props.enqueueSnackbar(item.message, {
        key: item.key,
        variant: item.type,
        autoHideDuration: 5000,
        onExited: (event, key: React.ReactText) => {
          this.props.removeNotification!(key as string);
          this.removeDisplayedNotification(key as string);
        },
        action: (key: number) => (
          <Button
            onClick={() => {
              this.props.closeSnackbar(key);
            }}
          >
            <CloseIcon />
          </Button>
        ),
      });
      this.storeDisplayedNotification(item.key);
    });
  }

  componentDidMount() {
    this.props.auth!.subscribeAuthStatus((user) => {
      if (user) {
        this.props.storage!.fetchAdminUsers().then((users) => {
          if (users.includes(user.email!)) {
            this.setState({
              signedIn: true,
            });
            this.updateNotifications();
            const definitionId = this.props.match.params.definitionId;
            if (definitionId) {
              this.props.updateKeyboardDefinitionDetail!(definitionId);
            } else {
              this.props.updateKeyboardDefinitionList!();
            }
          } else {
            this.setState({ signedIn: false });
          }
        });
      } else {
        this.props.auth!.signInWithGitHub().then(() => {
          // N/A
        });
      }
    });
  }

  componentDidUpdate() {
    this.updateNotifications();
  }

  render() {
    if (this.state.signedIn) {
      return (
        <React.Fragment>
          <CssBaseline />
          <Header />
          <main>
            <Content />
          </main>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <CssBaseline />
          <div className="message-box-wrapper">
            <div className="message-box">
              <p>You are not allow to access to Remap Admin.</p>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default withRouter(withSnackbar(Review));
