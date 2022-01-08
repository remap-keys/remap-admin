import { NotificationItem } from '../actions/actions';
import { FirebaseProvider } from '../services/provider/Firebase';
import { IAuth } from '../services/auth/Auth';
import {
  IKeyboardDefinition,
  IKeyboardDefinitionDetail,
  IKeyboardDefinitionStats,
  IKeyboardDefinitionStatus,
  IOrganization,
  IOrganizationMember,
  IOrganizationWithMembers,
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

export const ALL_ORGANIZATIONS_PHASE = [
  'init',
  'list',
  'processing',
  'detail',
  'create',
] as const;
type organizationsPhaseTuple = typeof ALL_ORGANIZATIONS_PHASE;
export type IOrganizationsPhase = organizationsPhaseTuple[number];

export type RootState = {
  entities: {
    keyboardDefinitionList: IKeyboardDefinition[];
    keyboardDefinitionDetail: IKeyboardDefinitionDetail | null;
    organization: IOrganization | null;
    organizations: IOrganizationWithMembers[];
    organizationMembers: IOrganizationMember[];
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
  organizations: {
    app: {
      organizationsPhase: IOrganizationsPhase;
    };
    organizationcreate: {
      name: string;
      description: string;
      websiteUrl: string;
      iconImageUrl: string;
      contactEmailAddress: string;
      contactPersonName: string;
      contactTel: string;
      contactAddress: string;
      memberEmailAddress: string;
    };
  };
};

const firebaseProvider = new FirebaseProvider();

export const INIT_STATE: RootState = {
  entities: {
    keyboardDefinitionList: [],
    keyboardDefinitionDetail: null,
    organization: null,
    organizations: [],
    organizationMembers: [],
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
  organizations: {
    app: {
      organizationsPhase: 'init',
    },
    organizationcreate: {
      name: '',
      description: '',
      websiteUrl: '',
      iconImageUrl: '',
      contactAddress: '',
      contactEmailAddress: '',
      contactPersonName: '',
      contactTel: '',
      memberEmailAddress: '',
    },
  },
};
