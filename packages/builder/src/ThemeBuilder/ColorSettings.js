import autobind from "autobind-decorator";
import PropTypes from "prop-types";
import React from "react";

import { Button, Classes, Icon, Tag } from "@blueprintjs/core";

import ColorBlock from "./ColorBlock";

@autobind
class ColorSettings extends React.Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    onUpdate: PropTypes.func,
  };

  handleDelete(index) {
    const { colors, onUpdate } = this.props;
    if (onUpdate) {
      onUpdate([...colors.slice(0, index), ...colors.slice(index + 1)]);
    }
  }

  handleChange(index, color) {
    const { colors, onUpdate } = this.props;
    if (onUpdate) {
      onUpdate([...colors.slice(0, index), color, ...colors.slice(index + 1)]);
    }
  }

  handleAddClick() {
    const { colors, onUpdate } = this.props;
    if (onUpdate) {
      onUpdate([...colors, "#000000"]);
    }
  }

  render() {
    const { colors } = this.props;

    return (
      <div className="color-settings settings-field">
        <div className="header">
          <h6 className={Classes.HEADING}>
            Colors:
            <Tag>{colors.length}</Tag>
          </h6>
          <div className="meta">
            <Button rightIcon="caret-down" small>
              Bulk Actions
            </Button>
          </div>
        </div>
        <div className="collection">
          {colors.map((color, index) => (
            <ColorBlock
              color={color}
              index={index}
              key={index}
              onDelete={this.handleDelete}
              onChange={this.handleChange}
            />
          ))}
          <div className="color-block">
            <div className="swatch" onClick={this.handleAddClick}>
              <Icon icon="plus" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ColorSettings;
