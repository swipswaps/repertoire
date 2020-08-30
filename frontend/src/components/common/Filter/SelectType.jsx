import { Button, MenuItem } from '@blueprintjs/core';
import React, { useCallback, useContext } from 'react';

import { FilterContext } from 'contexts';
import { Select } from '@blueprintjs/select';

export const SelectType = ({ selections }) => {
  const { selection, setSelection } = useContext(FilterContext);

  const renderItem = useCallback(
    (item) => {
      return (
        <MenuItem
          active={selection === item}
          key={item}
          onClick={() => setSelection(item)}
          text={item}
        />
      );
    },
    [selection, setSelection]
  );

  return (
    <Select
      className="SelectType"
      filterable={false}
      items={selections}
      itemRenderer={renderItem}
      popoverProps={{ minimal: true, transitionDuration: 50 }}
    >
      <Button text={selection} rightIcon="caret-down" />
    </Select>
  );
};
