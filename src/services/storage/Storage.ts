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
}
/* eslint-enable no-unused-vars */
