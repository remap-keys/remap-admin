import './DefinitionList.scss';
import React from 'react';
import {
  KeyboardListActionsType,
  KeyboardListStateType,
} from './DefinitionList.container';
import {
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import {
  IKeyboardDefinition,
  IKeyboardDefinitionStatus,
  KeyboardDefinitionStatus,
} from '../../../services/storage/Storage';
import { hexadecimal } from '../../../utils/StringUtils';
import moment from 'moment-timezone';

type KeyboardListState = {};
type OwnProps = {};
type KeyboardListProps = OwnProps &
  Partial<KeyboardListActionsType> &
  Partial<KeyboardListStateType>;

export default class DefinitionList extends React.Component<
  KeyboardListProps,
  KeyboardListState
> {
  constructor(props: KeyboardListProps | Readonly<KeyboardListProps>) {
    super(props);
  }

  handleChangeStatus = (event: any) => {
    const status: IKeyboardDefinitionStatus = event.target.value;
    this.props.updateKeyboardDefinitionStatus!(status);
  };

  render() {
    return (
      <div className="definition-list-wrapper">
        <div className="definition-list-container">
          <div className="definition-list-buttons">
            <FormControl>
              <InputLabel id="definition-list-status-select-label">
                Status
              </InputLabel>
              <Select
                labelId="definition-list-status-select-label"
                id="definition-list-status-select"
                value={this.props.status}
                onChange={this.handleChangeStatus}
              >
                <MenuItem value="draft">draft</MenuItem>
                <MenuItem value="in_review">in_review</MenuItem>
                <MenuItem value="rejected">rejected</MenuItem>
                <MenuItem value="approved">approved</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="definition-list">
            {this.props.keyboardDefinitionList!.map((doc, index) => (
              <div key={index} className="definition">
                <KeyboardRow doc={doc} />
              </div>
            ))}
            {this.props.keyboardDefinitionList!.length == 0 && (
              <div className="definition">
                <div className="no-registered-keyboard">
                  {`
                  There is no such keyboard definition.
                  `}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

type KeyboardProps = {
  doc: IKeyboardDefinition;
};

class KeyboardRow extends React.Component<KeyboardProps, any> {
  render() {
    const renderStatusBadge = (status: IKeyboardDefinitionStatus) => {
      switch (status) {
        case KeyboardDefinitionStatus.draft:
          return <Chip label={this.props.doc.status} size="small" />;
        case KeyboardDefinitionStatus.in_review:
          return (
            <Chip
              label={this.props.doc.status}
              size="small"
              className="status-badge-in-review"
            />
          );
        case KeyboardDefinitionStatus.rejected:
          return (
            <Chip
              label={this.props.doc.status}
              size="small"
              color="secondary"
            />
          );
        case KeyboardDefinitionStatus.approved:
          return (
            <Chip label={this.props.doc.status} size="small" color="primary" />
          );
        default:
          throw new Error(`Unknown Status: ${status}`);
      }
    };
    return (
      <Card>
        <CardContent>
          <div className="definition-container">
            <div className="definition-container-left">
              <div className="definition-header">
                <h2 className="definition-name">{this.props.doc.name}</h2>
                {renderStatusBadge(this.props.doc.status)}
              </div>
              <div className="definition-meta">
                <div className="definition-meta-info">
                  <span className="definition-meta-info-label">Vendor ID:</span>
                  {hexadecimal(this.props.doc.vendorId, 4)}
                </div>
                <div className="definition-meta-info">
                  <span className="definition-meta-info-label">
                    Product ID:
                  </span>
                  {hexadecimal(this.props.doc.productId, 4)}
                </div>
                <div className="definition-meta-info">
                  <span className="definition-meta-info-label">
                    Product Name:
                  </span>
                  {this.props.doc.productName}
                </div>
              </div>
              <div className="definition-meta">
                <div className="definition-meta-info">
                  <span className="definition-meta-info-label">
                    Created at:
                  </span>
                  {moment(this.props.doc.createdAt).format(
                    'YYYY-MM-DD HH:mm:ss'
                  )}
                </div>
                <div className="definition-meta-info">
                  <span className="definition-meta-info-label">
                    Updated at:{' '}
                  </span>
                  {moment(this.props.doc.updatedAt).format(
                    'YYYY-MM-DD HH:mm:ss'
                  )}
                </div>
              </div>
            </div>
            <div className="definition-container-right">
              <Button
                color="primary"
                onClick={() => {
                  location.href = `/review/${this.props.doc.id}`;
                }}
              >
                Detail
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}
