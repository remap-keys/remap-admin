import { NotificationItem } from '../actions/actions';
import { FirebaseProvider } from '../services/provider/Firebase';
import { IAuth } from '../services/auth/Auth';
import { IStorage } from '../services/storage/Storage';

export type IReviewPhase = 'init' | 'list' | 'processing';
// eslint-disable-next-line no-unused-vars
export const ReviewPhase: { [p in IReviewPhase]: IReviewPhase } = {
  init: 'init',
  list: 'list',
  processing: 'processing',
};

export type RootState = {
  app: {
    notifications: NotificationItem[];
  };
  auth: {
    instance: IAuth;
  };
  storage: {
    instance: IStorage;
  };
  review: {
    app: {
      reviewPhase: IReviewPhase;
    };
  };
};

const firebaseProvider = new FirebaseProvider();

export const INIT_STATE: RootState = {
  app: {
    notifications: [],
  },
  auth: {
    instance: firebaseProvider,
  },
  storage: {
    instance: firebaseProvider,
  },
  review: {
    app: {
      reviewPhase: ReviewPhase.init,
    },
  },
};
