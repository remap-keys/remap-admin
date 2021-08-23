import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';
import { IAuth } from '../auth/Auth';
import {
  IFetchKeyboardDefinitionDetailResult,
  IFetchKeyboardDefinitionListResult,
  IFetchKeyboardDefinitionStatsResult,
  IKeyboardDefinitionStatus,
  IResult,
  IStorage,
} from '../storage/Storage';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const FUNCTIONS_REGION = 'asia-northeast1';

export class FirebaseProvider implements IAuth, IStorage {
  private db: firebase.firestore.Firestore;
  private auth: firebase.auth.Auth;
  private functions: firebase.functions.Functions;
  private unsubscribeAuthStateChanged?: firebase.Unsubscribe;

  constructor() {
    firebase.initializeApp(config);
    const app = firebase.app();
    this.db = app.firestore();
    this.auth = app.auth();
    this.functions = app.functions(FUNCTIONS_REGION);
  }

  async fetchAdminUsers(): Promise<string[]> {
    const documentSnapshot = await this.db
      .collection('configurations')
      .doc('administrators')
      .get();
    if (documentSnapshot.exists) {
      return documentSnapshot.data()!.users;
    } else {
      return [];
    }
  }

  async fetchKeyboardDefinitionList(
    status: IKeyboardDefinitionStatus
  ): Promise<IFetchKeyboardDefinitionListResult> {
    try {
      const command = this.functions.httpsCallable(
        'fetchKeyboardDefinitionListByStatus'
      );
      const httpsCallableResult = await command({
        status,
      });
      const result = httpsCallableResult.data;
      if (result.success) {
        return {
          success: true,
          keyboardDefinitionList: result.keyboardDefinitionList.map(
            (definition: any) => {
              return {
                id: definition.id,
                authorUid: definition.authorUid,
                name: definition.name,
                vendorId: definition.vendorId,
                productId: definition.productId,
                productName: definition.productName,
                status: definition.status,
                json: definition.json,
                rejectReason: definition.rejectReason,
                githubDisplayName: definition.githubDisplayName,
                githubUrl: definition.githubUrl,
                createdAt: new Date(definition.createdAt),
                updatedAt: new Date(definition.updatedAt),
              };
            }
          ),
        };
      } else {
        return {
          success: false,
          error: `Fetching a keyboard definition list failed: ${result.errorCode}:${result.errorMessage}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Fetching a keyboard definition list failed.',
        cause: error,
      };
    }
  }

  async fetchKeyboardDefinitionDetail(
    id: string
  ): Promise<IFetchKeyboardDefinitionDetailResult> {
    try {
      const command = this.functions.httpsCallable(
        'fetchKeyboardDefinitionDetailById'
      );
      const httpsCallableResult = await command({
        id,
      });
      const result = httpsCallableResult.data;
      if (result.success) {
        return {
          success: true,
          keyboardDefinitionDetail: {
            id: result.keyboardDefinitionDetail.id,
            authorUid: result.keyboardDefinitionDetail.authorUid,
            name: result.keyboardDefinitionDetail.name,
            vendorId: result.keyboardDefinitionDetail.vendorId,
            productId: result.keyboardDefinitionDetail.productId,
            productName: result.keyboardDefinitionDetail.productName,
            status: result.keyboardDefinitionDetail.status,
            json: result.keyboardDefinitionDetail.json,
            rejectReason: result.keyboardDefinitionDetail.rejectReason,
            createdAt: new Date(result.keyboardDefinitionDetail.createdAt),
            updatedAt: new Date(result.keyboardDefinitionDetail.updatedAt),
            githubUid: result.keyboardDefinitionDetail.githubUid,
            githubDisplayName:
              result.keyboardDefinitionDetail.githubDisplayName,
            githubEmail: result.keyboardDefinitionDetail.githubEmail,
            githubUrl: result.keyboardDefinitionDetail.githubUrl,
            firmwareCodePlace:
              result.keyboardDefinitionDetail.firmwareCodePlace,
            qmkRepositoryFirstPullRequestUrl:
              result.keyboardDefinitionDetail.qmkRepositoryFirstPullRequestUrl,
            forkedRepositoryUrl:
              result.keyboardDefinitionDetail.forkedRepositoryUrl,
            forkedRepositoryEvidence:
              result.keyboardDefinitionDetail.forkedRepositoryEvidence,
            otherPlaceHowToGet:
              result.keyboardDefinitionDetail.otherPlaceHowToGet,
            otherPlaceSourceCodeEvidence:
              result.keyboardDefinitionDetail.otherPlaceSourceCodeEvidence,
            otherPlacePublisherEvidence:
              result.keyboardDefinitionDetail.otherPlacePublisherEvidence,
          },
        };
      } else {
        return {
          success: false,
          error: `Fetching a keyboard definition detail failed: ${result.errorCode}:${result.errorMessage}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Fetching a keyboard definition detail failed.',
        cause: error,
      };
    }
  }

  async updateKeyboardDefinitionStatus(
    id: string,
    status: IKeyboardDefinitionStatus,
    rejectReason: string
  ): Promise<IResult> {
    try {
      const command = this.functions.httpsCallable(
        'updateKeyboardDefinitionStatus'
      );
      const httpsCallableResult = await command({
        id,
        status,
        rejectReason,
      });
      const result = httpsCallableResult.data;
      if (result.success) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
          error: `Updating a keyboard definition status failed: ${result.errorCode}:${result.errorMessage}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Updating a keyboard definition status failed.',
        cause: error,
      };
    }
  }

  async fetchKeyboardDefinitionStats(): Promise<IFetchKeyboardDefinitionStatsResult> {
    try {
      const command = this.functions.httpsCallable(
        'fetchKeyboardDefinitionStats'
      );
      const httpsCallableResult = await command();
      const result = httpsCallableResult.data;
      if (result.success) {
        return {
          success: true,
          stats: {
            totalCount: result.totalCount!,
            draftCount: result.draftCount!,
            inReviewCount: result.inReviewCount!,
            rejectedCount: result.rejectedCount!,
            approvedCount: result.approvedCount!,
          },
        };
      } else {
        return {
          success: false,
          error: `Fetching a keyboard definition stats failed: ${result.errorCode}:${result.errorMessage}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Fetching a keyboard definition stats failed.',
        cause: error,
      };
    }
  }

  signInWithGitHub(): Promise<void> {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.auth.signInWithRedirect(provider);
  }

  // eslint-disable-next-line no-unused-vars
  subscribeAuthStatus(callback: (user: firebase.User | null) => void): void {
    this.unsubscribeAuthStateChanged && this.unsubscribeAuthStateChanged();
    this.unsubscribeAuthStateChanged = this.auth.onAuthStateChanged(
      (user: firebase.User | null) => {
        callback(user);
      }
    );
  }

  getCurrentAuthenticatedUser(): firebase.User {
    return this.auth.currentUser!;
  }
}
