import { ReviewActionsType, ReviewStateType } from './Review.container';
import { ProviderContext, withSnackbar } from 'notistack';
import { NotificationItem } from '../../actions/actions';
import { Button, CssBaseline } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import Header from '../common/header/Header.container';
import Content from './content/Content.container';
import { useParams } from 'react-router-dom';

type ParamsType = {
  definitionId: string;
};
type OwnProps = {};
type ReviewProps = OwnProps &
  Partial<ReviewStateType> &
  Partial<ReviewActionsType> &
  ProviderContext;

function Review(props: ReviewProps) {
  const [displayedNotificationIds, setDisplayedNotificationIds] = useState<
    string[]
  >([]);
  const [signedIn, setSignedIn] = useState<boolean>(true);

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

  const params = useParams<ParamsType>();

  useEffect(() => {
    props.auth!.subscribeAuthStatus((user) => {
      if (user) {
        props.storage!.fetchAdminUsers().then((users) => {
          if (users.includes(user.email!)) {
            setSignedIn(true);
            updateNotifications();
            const definitionId = params.definitionId;
            if (definitionId) {
              props.updateKeyboardDefinitionDetail!(definitionId);
            } else {
              props.updateKeyboardDefinitionList!();
            }
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

export default withSnackbar(Review);
