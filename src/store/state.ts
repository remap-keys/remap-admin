import { NotificationItem } from '../actions/actions';
import { FirebaseProvider } from '../services/provider/Firebase';
import { IAuth } from '../services/auth/Auth';
import {
  IKeyboardDefinition,
  IKeyboardDefinitionDetail,
  IKeyboardDefinitionStatus,
  IStorage,
  KeyboardDefinitionStatus,
} from '../services/storage/Storage';

export type IReviewPhase = 'init' | 'list' | 'processing' | 'detail';
// eslint-disable-next-line no-unused-vars
export const ReviewPhase: { [p in IReviewPhase]: IReviewPhase } = {
  init: 'init',
  list: 'list',
  processing: 'processing',
  detail: 'detail',
};

export type RootState = {
  entities: {
    keyboardDefinitionList: IKeyboardDefinition[];
    keyboardDefinitionDetail: IKeyboardDefinitionDetail | null;
  };
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
    definitionlist: {
      keyboardDefinitionStatus: IKeyboardDefinitionStatus;
    };
    definitiondetail: {
      keyboardDefinitionStatus: IKeyboardDefinitionStatus;
      rejectReason: string;
    };
  };
};

const firebaseProvider = new FirebaseProvider();

export const INIT_STATE: RootState = {
  entities: {
    keyboardDefinitionList: [],
    keyboardDefinitionDetail: null,
  },
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
    definitionlist: {
      keyboardDefinitionStatus: KeyboardDefinitionStatus.approved,
    },
    definitiondetail: {
      keyboardDefinitionStatus: KeyboardDefinitionStatus.draft,
      rejectReason: '',
    },
  },
};
