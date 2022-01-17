import React, { useEffect, useState } from 'react';
import {
  OrganizationsActionsType,
  OrganizationsStateType,
} from './Organizations.container';
import { ProviderContext, withSnackbar } from 'notistack';
import { NotificationItem } from '../../actions/actions';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../common/header/Header.container';
import Content from './content/Content.container';
import { Button, CssBaseline } from '@mui/material';

type OwnProps = {};
type OrganizationsProps = OwnProps &
  Partial<OrganizationsActionsType> &
  Partial<OrganizationsStateType> &
  ProviderContext;

function Organizations(props: OrganizationsProps) {
  const [signedIn, setSignedIn] = useState<boolean>(true);
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
            props.updateOrganizations!();
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

export default withSnackbar(Organizations);
