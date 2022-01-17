import React, { useEffect, useState } from 'react';
import { TopActionsType, TopStateType } from './Top.container';
import { ProviderContext, withSnackbar } from 'notistack';
import './Top.scss';
import { NotificationItem } from '../../actions/actions';
import { Button, CssBaseline } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../common/header/Header.container';
import Footer from '../common/footer/Footer.container';

type OwnProps = {};
type TopProps = OwnProps &
  Partial<TopStateType> &
  Partial<TopActionsType> &
  ProviderContext;

function Top(props: TopProps) {
  const [signedIn, setSignedIn] = useState<boolean>();
  const [displayedNotificationIds, setDisplayedNotificationIds] = useState<
    string[]
  >([]);

  const storeDisplayedNotification = (key: string) => {
    setDisplayedNotificationIds([...displayedNotificationIds, key]);
  };

  const removeDisplayedNotification = (key: string) => {
    setDisplayedNotificationIds([
      ...displayedNotificationIds.filter((k) => key !== k),
    ]);
  };

  const updateNotifications = () => {
    props.notifications!.forEach((item: NotificationItem) => {
      if (displayedNotificationIds.includes(item.key)) return;

      props.enqueueSnackbar(item.message, {
        key: item.key,
        variant: item.type,
        autoHideDuration: 5000,
        onExited: (event, key: React.ReactText) => {
          props.removeNotification!(key as string);
          removeDisplayedNotification(key as string);
        },
        // eslint-disable-next-line react/display-name
        action: (key: number) => (
          <Button
            onClick={() => {
              // eslint-disable-next-line react/prop-types
              props.closeSnackbar(key);
            }}
          >
            <CloseIcon />
          </Button>
        ),
      });
      storeDisplayedNotification(item.key);
    });
  };

  useEffect(() => {
    props.auth!.subscribeAuthStatus((user) => {
      if (user) {
        props.storage!.fetchAdminUsers().then((users) => {
          if (users.includes(user.email!)) {
            setSignedIn(true);
            updateNotifications();
          } else {
            setSignedIn(false);
          }
        });
      } else {
        props.auth!.signInWithGitHub().then(() => {
          // N/A
        });
      }
    });
  }, []);

  useEffect(() => {
    updateNotifications();
  }, [props.notifications]);

  if (signedIn) {
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

export default withSnackbar(Top);
