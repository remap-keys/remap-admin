export interface IResult {
  readonly success: boolean;
  readonly error?: string;
  readonly cause?: any;
}

export type IKeyboardDefinitionStatus =
  | 'draft'
  | 'in_review'
  | 'rejected'
  | 'approved';
export const KeyboardDefinitionStatus: {
  [p: string]: IKeyboardDefinitionStatus;
} = {
  draft: 'draft',
  in_review: 'in_review',
  rejected: 'rejected',
  approved: 'approved',
};

export type IFirmwareCodePlace = 'qmk' | 'forked' | 'other';
export const FirmwareCodePlace: { [p: string]: IFirmwareCodePlace } = {
  qmk: 'qmk',
  forked: 'forked',
  other: 'other',
};

export interface IKeyboardDefinition {
  readonly id: string;
  readonly authorUid: string;
  readonly name: string;
  readonly vendorId: number;
  readonly productId: number;
  readonly productName: string;
  readonly status: IKeyboardDefinitionStatus;
  readonly json: string;
  readonly rejectReason: string | undefined;
  readonly githubUrl: string;
  readonly githubDisplayName: string;
  readonly firmwareCodePlace: IFirmwareCodePlace;
  readonly qmkRepositoryFirstPullRequestUrl: string;
  readonly forkedRepositoryUrl: string;
  readonly forkedRepositoryEvidence: string;
  readonly otherPlaceHowToGet: string;
  readonly otherPlaceSourceCodeEvidence: string;
  readonly otherPlacePublisherEvidence: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface IKeyboardDefinitionDetail extends IKeyboardDefinition {
  readonly githubUid: string;
  readonly githubDisplayName: string;
  readonly githubEmail: string;
}

export interface IFetchKeyboardDefinitionListResult extends IResult {
  keyboardDefinitionList?: IKeyboardDefinition[];
}

export interface IFetchKeyboardDefinitionDetailResult extends IResult {
  keyboardDefinitionDetail?: IKeyboardDefinitionDetail;
}

export type IKeyboardDefinitionStats = {
  totalCount: number;
  draftCount: number;
  inReviewCount: number;
  rejectedCount: number;
  approvedCount: number;
};

export interface IFetchKeyboardDefinitionStatsResult extends IResult {
  stats?: IKeyboardDefinitionStats;
}

/* eslint-disable no-unused-vars */
export interface IStorage {
  fetchAdminUsers(): Promise<string[]>;
  fetchKeyboardDefinitionList(
    status: IKeyboardDefinitionStatus
  ): Promise<IFetchKeyboardDefinitionListResult>;
  fetchKeyboardDefinitionDetail(
    id: string
  ): Promise<IFetchKeyboardDefinitionDetailResult>;
  updateKeyboardDefinitionStatus(
    id: string,
    status: IKeyboardDefinitionStatus,
    rejectReason: string
  ): Promise<IResult>;
  fetchKeyboardDefinitionStats(): Promise<IFetchKeyboardDefinitionStatsResult>;
}
/* eslint-enable no-unused-vars */
