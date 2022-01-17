/* eslint-disable no-undef */
import React from 'react';
import './DefinitionDetail.scss';
import {
  DefinitionDetailActionsType,
  DefinitionDetailStateType,
} from './DefinitionDetail.container';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from '@mui/material';
import {
  FirmwareCodePlace,
  IKeyboardDefinitionDetail,
  IKeyboardDefinitionStatus,
  KeyboardDefinitionStatus,
} from '../../../services/storage/Storage';
import { MoreVert } from '@mui/icons-material';
import { hexadecimal } from '../../../utils/StringUtils';
import { RejectMessages } from './RejectMessages';

type ConfirmDialogMode = 'update-review-status';

type DefinitionDetailState = {
  openConfirmDialog: boolean;
  confirmDialogMode: ConfirmDialogMode | null;
  menuAnchorEl: any;
  rejectMessage: number;
};
type OwnProps = {};
type DefinitionDetailProps = OwnProps &
  Partial<DefinitionDetailActionsType> &
  Partial<DefinitionDetailStateType>;

const statusSteps: IKeyboardDefinitionStatus[] = [
  KeyboardDefinitionStatus.draft,
  KeyboardDefinitionStatus.in_review,
  KeyboardDefinitionStatus.approved,
];

export default class DefinitionDetail extends React.Component<
  DefinitionDetailProps,
  DefinitionDetailState
> {
  constructor(props: DefinitionDetailProps | Readonly<DefinitionDetailProps>) {
    super(props);
    this.state = {
      openConfirmDialog: false,
      confirmDialogMode: null,
      menuAnchorEl: null,
      rejectMessage: -1,
    };
  }

  handleBackButtonClick = () => {
    location.href = '/review';
  };

  handleUpdateReviewStatusClick = () => {
    this.setState({
      openConfirmDialog: true,
      confirmDialogMode: 'update-review-status',
    });
  };

  handleConfirmYesClick = () => {
    this.setState({
      openConfirmDialog: false,
    });
    if (this.state.confirmDialogMode === 'update-review-status') {
      this.props.reviewKeyboardDefinition!();
    }
  };

  handleConfirmNoClick = () => {
    this.setState({
      openConfirmDialog: false,
    });
  };

  handleMenuIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({
      menuAnchorEl: event.currentTarget,
    });
  };

  handleMenuClose = () => {
    this.setState({
      menuAnchorEl: null,
    });
  };

  handleDownloadJsonMenuClick = () => {
    this.setState({
      menuAnchorEl: null,
    });
    const jsonUrl = URL.createObjectURL(
      new Blob([this.props.keyboardDefinitionDetail!.json], {
        type: 'application/json',
      })
    );
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.download = `${this.props.keyboardDefinitionDetail!.name}.json`;
    a.href = jsonUrl;
    a.click();
    a.remove();
  };

  handleRejectMessagesChange = (event: SelectChangeEvent) => {
    const value = Number(event.target.value);
    this.setState({ rejectMessage: value });
    const rejectReason = value !== -1 ? RejectMessages[value].long : '';
    this.props.updateRejectReason!(rejectReason);
  };

  isStatus(status: IKeyboardDefinitionStatus): boolean {
    return this.props.keyboardDefinitionDetail!.status === status;
  }

  render() {
    let activeStep;
    switch (this.props.keyboardDefinitionDetail!.status) {
      case KeyboardDefinitionStatus.draft:
      case KeyboardDefinitionStatus.rejected:
        activeStep = 0;
        break;
      case KeyboardDefinitionStatus.in_review:
        activeStep = 1;
        break;
      case KeyboardDefinitionStatus.approved:
        activeStep = 2;
        break;
      default:
        throw new Error(
          `Unknown status: ${this.props.keyboardDefinitionDetail?.status}`
        );
    }
    const completed = activeStep === 2;
    const firmwareCodePlace =
      this.props.keyboardDefinitionDetail!.firmwareCodePlace ===
      FirmwareCodePlace.qmk
        ? 'GitHub: qmk/qmk_firmware'
        : this.props.keyboardDefinitionDetail!.firmwareCodePlace ===
          FirmwareCodePlace.forked
        ? 'GitHub: Forked repository'
        : this.props.keyboardDefinitionDetail!.firmwareCodePlace ===
          FirmwareCodePlace.other
        ? 'Other'
        : 'Unknown';
    return (
      <React.Fragment>
        <div className="definition-detail-wrapper">
          <div className="definition-detail-container">
            <div className="definition-detail-card">
              <Card>
                <CardContent>
                  <div className="edit-keyboard-header">
                    <Button
                      style={{ marginRight: '16px' }}
                      onClick={this.handleBackButtonClick}
                    >
                      &lt; Keyboard List
                    </Button>
                    <MenuUI
                      keyboardDefinitionDetail={
                        this.props.keyboardDefinitionDetail
                      }
                      handleMenuIconClick={this.handleMenuIconClick}
                      menuAnchorEl={this.state.menuAnchorEl}
                      handleMenuClose={this.handleMenuClose}
                      handleDownloadJsonMenuClick={
                        this.handleDownloadJsonMenuClick
                      }
                    />
                  </div>
                  <Stepper
                    activeStep={activeStep}
                    className="edit-keyboard-stepper"
                  >
                    {statusSteps.map((label) => {
                      const stepProps = {
                        completed,
                      };
                      const labelProps = {};
                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                  <div className="definition-detail-form-container">
                    <div className="definition-detail-form">
                      <div className="definition-detail-form-row">
                        <TextField
                          id="definition-detail-name"
                          label="Name"
                          variant="outlined"
                          value={this.props.keyboardDefinitionDetail!.name}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                      <div className="definition-detail-form-row">
                        <TextField
                          id="definition-detail-vendor_id"
                          label="Vendor ID"
                          variant="outlined"
                          value={hexadecimal(
                            this.props.keyboardDefinitionDetail!.vendorId,
                            4
                          )}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                      <div className="definition-detail-form-row">
                        <TextField
                          id="definition-detail-product_id"
                          label="Product ID"
                          variant="outlined"
                          value={hexadecimal(
                            this.props.keyboardDefinitionDetail!.productId,
                            4
                          )}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                      <div className="definition-detail-form-row">
                        <TextField
                          id="definition-detail-product-name"
                          label="Product Name"
                          helperText="This is a Product Name specified by `#define PRODUCT [Product Name]` in the config.h file."
                          variant="outlined"
                          value={
                            this.props.keyboardDefinitionDetail!.productName
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                      <div className="definition-detail-form-row">
                        <TextField
                          id="definition-detail-author-type"
                          label="Author Type"
                          variant="outlined"
                          value={
                            this.props.keyboardDefinitionDetail!.authorType ===
                            'individual'
                              ? 'Individual'
                              : 'Organization'
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                      {this.props.keyboardDefinitionDetail!.authorType ===
                      'organization' ? (
                        <div className="definition-detail-form-row">
                          <TextField
                            id="definition-detail-organization"
                            label="Organization"
                            variant="outlined"
                            value={this.props.organization!.name}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </div>
                      ) : null}
                      <div className="definition-detail-form-row">
                        <TextField
                          id="definition-detail-github-uid"
                          label="GitHub User ID"
                          variant="outlined"
                          value={this.props.keyboardDefinitionDetail!.githubUid}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                      <div className="definition-detail-form-row">
                        <TextField
                          id="definition-detail-github-display-name"
                          label="GitHub Display Name"
                          variant="outlined"
                          value={
                            this.props.keyboardDefinitionDetail!
                              .githubDisplayName
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                      <div className="definition-detail-form-row">
                        <TextField
                          id="definition-detail-github-display-email"
                          label="GitHub Email"
                          variant="outlined"
                          value={
                            this.props.keyboardDefinitionDetail!.githubEmail
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                      <div className="definition-detail-form-row">
                        <TextField
                          id="definition-detail-github-display-link"
                          label="GitHub Account Page"
                          variant="outlined"
                          value={this.props.keyboardDefinitionDetail!.githubUrl}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                      <div className="definition-detail-form-row">
                        <TextField
                          id="definition-detail-contact-information"
                          label="Contact Information"
                          variant="outlined"
                          multiline
                          value={
                            this.props.keyboardDefinitionDetail!
                              .contactInformation
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                    </div>
                    <div className="definition-detail-form">
                      <div className="definition-detail-form-row">
                        <TextField
                          id="definition-detail-firmware-code-place"
                          label="Where is the source code of this keyboard's firmware?"
                          variant="outlined"
                          value={firmwareCodePlace}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                      <EvidenceForQmkRepositoryRow
                        keyboardDefinitionDetail={
                          this.props.keyboardDefinitionDetail!
                        }
                      />
                      <EvidenceForForkedRepositoryRow
                        keyboardDefinitionDetail={
                          this.props.keyboardDefinitionDetail!
                        }
                      />
                      <EvidenceForOtherPlaceRow
                        keyboardDefinitionDetail={
                          this.props.keyboardDefinitionDetail!
                        }
                      />
                      <EvidenceForOrganization
                        keyboardDefinitionDetail={
                          this.props.keyboardDefinitionDetail!
                        }
                      />
                      <div className="definition-detail-form-row">
                        <FormControl>
                          <InputLabel id="definition-detail-status-select-label">
                            Status
                          </InputLabel>
                          <Select
                            labelId="definition-detail-status-select-label"
                            label="Status"
                            id="definition-detail-status-select"
                            value={this.props.keyboardDefinitionStatus}
                            onChange={(event) =>
                              this.props.updateKeyboardDefinitionStatus!(
                                event.target.value as IKeyboardDefinitionStatus
                              )
                            }
                          >
                            <MenuItem value="draft">draft</MenuItem>
                            <MenuItem value="in_review">in_review</MenuItem>
                            <MenuItem value="rejected">rejected</MenuItem>
                            <MenuItem value="approved">approved</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <RejectMessageRow
                        keyboardDefinitionStatus={
                          this.props.keyboardDefinitionStatus
                        }
                        rejectMessage={this.state.rejectMessage}
                        handleRejectMessagesChange={
                          this.handleRejectMessagesChange
                        }
                      />
                      <div className="definition-detail-form-row">
                        <TextField
                          id="definition-detail-reject-reason"
                          label="Reject Reason"
                          placeholder="Please fill in the reason when this review request is rejected."
                          multiline
                          maxRows={4}
                          value={this.props.rejectReason}
                          onChange={(e) =>
                            this.props.updateRejectReason!(e.target.value)
                          }
                          variant="outlined"
                        />
                      </div>
                      <div className="definition-detail-form-buttons">
                        <Button
                          variant="contained"
                          onClick={this.handleUpdateReviewStatusClick}
                        >
                          Update Review Status
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Dialog
          open={this.state.openConfirmDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Review Keyboard Definition
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              color={
                this.state.confirmDialogMode === 'update-review-status'
                  ? 'secondary'
                  : 'initial'
              }
            >
              {this.state.confirmDialogMode === 'update-review-status'
                ? 'Are you sure to update the review status?'
                : ''}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              autoFocus
              onClick={this.handleConfirmNoClick}
            >
              No
            </Button>
            <Button color="primary" onClick={this.handleConfirmYesClick}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

type RejectMessageRowProps = {
  keyboardDefinitionStatus?: IKeyboardDefinitionStatus;
  rejectMessage: number;
  handleRejectMessagesChange: (
    // eslint-disable-next-line no-unused-vars
    event: SelectChangeEvent
  ) => void;
};

function RejectMessageRow(props: RejectMessageRowProps) {
  if (props.keyboardDefinitionStatus === 'rejected') {
    return (
      <div className="definition-detail-form-row">
        <FormControl>
          <InputLabel id="definition-detail-reject-message-select-label">
            Reject Reason Template
          </InputLabel>
          <Select
            labelId="definition-detail-reject-message-select-label"
            label="Reject Reason Template"
            id="definition-detail-reject-message-select"
            value={String(props.rejectMessage)}
            onChange={props.handleRejectMessagesChange}
          >
            {RejectMessages.map((message, index) => {
              return (
                <MenuItem key={`reject-message-${index}`} value={index}>
                  {message.short}
                </MenuItem>
              );
            })}
            <MenuItem
              key={`reject-message-${RejectMessages.length}`}
              value={-1}
            >
              Other
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  } else {
    return null;
  }
}

type EvidenceForOtherPlaceRowProps = {
  keyboardDefinitionDetail: IKeyboardDefinitionDetail;
};

function EvidenceForOtherPlaceRow(props: EvidenceForOtherPlaceRowProps) {
  if (
    props.keyboardDefinitionDetail.firmwareCodePlace === FirmwareCodePlace.other
  ) {
    return (
      <React.Fragment>
        <div className="definition-detail-form-row">
          <TextField
            id="definition-detail-other-place-how-to-get"
            label="How to Get the Source Code"
            variant="outlined"
            multiline
            rows={4}
            value={props.keyboardDefinitionDetail.otherPlaceHowToGet || ''}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="definition-detail-form-row">
          <TextField
            id="definition-detail-other-place-source-code-evidence"
            label="Evidence Information for Source Code"
            variant="outlined"
            multiline
            rows={4}
            value={
              props.keyboardDefinitionDetail.otherPlaceSourceCodeEvidence || ''
            }
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="definition-detail-form-row">
          <TextField
            id="definition-detail-other-place-publisher-evidence"
            label="Evidence Information for Publisher"
            variant="outlined"
            multiline
            rows={4}
            value={
              props.keyboardDefinitionDetail.otherPlacePublisherEvidence || ''
            }
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
}

type EvidenceForForkedRepositoryRowProps = {
  keyboardDefinitionDetail: IKeyboardDefinitionDetail;
};

function EvidenceForForkedRepositoryRow(
  props: EvidenceForForkedRepositoryRowProps
) {
  if (
    props.keyboardDefinitionDetail.firmwareCodePlace ===
    FirmwareCodePlace.forked
  ) {
    return (
      <React.Fragment>
        <div className="definition-detail-form-row">
          <TextField
            id="definition-detail-forked-repository-url"
            label="Forked Repository URL"
            variant="outlined"
            value={props.keyboardDefinitionDetail.forkedRepositoryUrl || ''}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="definition-detail-form-row">
          <TextField
            id="definition-detail-forked-repository-evidence"
            label="Evidence Information"
            variant="outlined"
            multiline
            rows={4}
            value={
              props.keyboardDefinitionDetail.forkedRepositoryEvidence || ''
            }
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
}

type EvidenceForQmkRepositoryRowProps = {
  keyboardDefinitionDetail: IKeyboardDefinitionDetail;
};

function EvidenceForQmkRepositoryRow(props: EvidenceForQmkRepositoryRowProps) {
  if (
    props.keyboardDefinitionDetail.firmwareCodePlace === FirmwareCodePlace.qmk
  ) {
    return (
      <div className="definition-detail-form-row">
        <TextField
          id="definition-detail-qmk-repository-pull-request-url"
          label="1st Pull Request URL"
          variant="outlined"
          value={
            props.keyboardDefinitionDetail.qmkRepositoryFirstPullRequestUrl ||
            ''
          }
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
    );
  } else {
    return null;
  }
}

type MenuUIProps = {
  keyboardDefinitionDetail: IKeyboardDefinitionDetail | null | undefined;
  // eslint-disable-next-line no-unused-vars
  handleMenuIconClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  menuAnchorEl: any;
  handleMenuClose: () => void;
  handleDownloadJsonMenuClick: () => void;
};

function MenuUI(props: MenuUIProps) {
  const menuItems = [];
  if (props.keyboardDefinitionDetail) {
    menuItems.push(
      <MenuItem key="1" onClick={props.handleDownloadJsonMenuClick}>
        Download JSON
      </MenuItem>
    );
  }
  if (menuItems.length > 0) {
    return (
      <React.Fragment>
        <IconButton
          aria-owns={props.menuAnchorEl ? 'definition-detail-menu' : undefined}
          onClick={props.handleMenuIconClick}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="definition-detail-menu"
          anchorEl={props.menuAnchorEl}
          open={Boolean(props.menuAnchorEl)}
          onClose={props.handleMenuClose}
        >
          {menuItems}
        </Menu>
      </React.Fragment>
    );
  } else {
    return null;
  }
}

type EvidenceForOrganizationProps = {
  keyboardDefinitionDetail: IKeyboardDefinitionDetail;
};

function EvidenceForOrganization(props: EvidenceForOrganizationProps) {
  if (props.keyboardDefinitionDetail.authorType === 'organization') {
    return (
      <div className="definition-detail-form-row">
        <TextField
          id="definition-detail-organization-evidence"
          label="Evidence for Organization"
          variant="outlined"
          multiline
          rows={4}
          value={props.keyboardDefinitionDetail.organizationEvidence || ''}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
    );
  } else {
    return null;
  }
}
