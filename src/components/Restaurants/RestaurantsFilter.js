import React from 'react';
import propTypes from 'prop-types';
import Select from 'react-select';

import FilterOptions from '../../constants/filterOptions';

const RestaurantsFilter = ({
  value,
  handleFilterChange,
  isLoading,
  options,
}) => {
  return (
    <div className="places-option-container">
      <Select
        className="places-option"
        value={value}
        onChange={handleFilterChange}
        options={options}
        isClearable
        isLoading={isLoading}
        placeholder="Choose restaurant"
      />
    </div>
  );
};

RestaurantsFilter.displayName = 'components/RestaurantsFilter';

RestaurantsFilter.defaultProps = {
  value: null,
  options: FilterOptions,
};

RestaurantsFilter.propTypes = {
  value: propTypes.shape({
    value: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
  }),
  options: propTypes.arrayOf(
    propTypes.shape({
      value: propTypes.string.isRequired,
      label: propTypes.string.isRequired,
    })
  ).isRequired,
  handleFilterChange: propTypes.func.isRequired,
  isLoading: propTypes.bool.isRequired,
};

export default RestaurantsFilter;
