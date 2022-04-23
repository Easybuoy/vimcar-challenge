import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import RestaurantsFilter from '../RestaurantsFilter';

describe('RestaurantsFilter', () => {
  it('should render and match styles', () => {
    const { container } = render(
      <RestaurantsFilter isLoading={false} handleFilterChange={jest.fn()} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
