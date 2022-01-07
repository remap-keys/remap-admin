import React from 'react';
import { TopActionsType, TopStateType } from './Top.container';
import { ProviderContext, withSnackbar } from 'notistack';
import './Top.scss';
import { NotificationItem } from '../../actions/actions';
import { Button, CssBaseline } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Header from '../common/header/Header.container';
import Footer from '../common/footer/Footer.container';

type ParamsType = {};
type OwnProps = {};
type TopProps = OwnProps &
  Partial<TopStateType> &
  Partial<TopActionsType> &
  ProviderContext &
  RouteComponentProps<ParamsType>;
type OwnState = {
  signedIn: boolean;
};

class Top extends React.Component<TopProps, OwnState> {
  private displayedNotificationIds: string[] = [];

  constructor(props: TopProps) {
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

  updateNotifications() {
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
            <div className="top-wrapper">
              <div className="top-container">
                <div className="top-buttons">
                  <Button variant="contained" href="/review">
                    Review
                  </Button>
                  <Button variant="contained" href="/organizations">
                    Organizations
                  </Button>
                </div>
              </div>
            </div>
            <Footer />
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

export default withRouter(withSnackbar(Top));
