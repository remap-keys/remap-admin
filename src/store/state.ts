import { NotificationItem } from '../actions/actions';
import { FirebaseProvider } from '../services/provider/Firebase';
import { IAuth } from '../services/auth/Auth';
import {
  IKeyboardDefinition,
  IKeyboardDefinitionDetail,
  IKeyboardDefinitionStats,
  IKeyboardDefinitionStatus,
  IOrganization,
  IStorage,
  KeyboardDefinitionStatus,
} from '../services/storage/Storage';
import buildInfo from '../assets/files/build-info.json';

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
    organization: IOrganization | null;
  };
  app: {
    buildNumber: number;
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
      nameFilter: string;
      keyboardDefinitionStats: IKeyboardDefinitionStats;
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
    organization: null,
  },
  app: {
    buildNumber: buildInfo.buildNumber,
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
      keyboardDefinitionStatus: KeyboardDefinitionStatus.in_review,
      nameFilter: '',
      keyboardDefinitionStats: {
        totalCount: 0,
        draftCount: 0,
        inReviewCount: 0,
        rejectedCount: 0,
        approvedCount: 0,
      },
    },
    definitiondetail: {
      keyboardDefinitionStatus: KeyboardDefinitionStatus.draft,
      rejectReason: '',
    },
  },
};
