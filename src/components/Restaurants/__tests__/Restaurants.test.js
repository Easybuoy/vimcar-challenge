import React from 'react';
import { render } from '@testing-library/react';

import Restaurants from '../Restaurants';

describe('Restaurants', () => {
  it('should render and match styles', () => {
    const mockBusinesses = [
      {
        alias: 'stadtklause-berlin',
        categories: [
          {
            alias: 'german',
            title: 'German',
          },
        ],
        coordinates: { latitude: 52.504779, longitude: 13.380618 },
        display_phone: '+49 30 51056381',
        distance: 2205.244050414826,
        id: '8uBE9ZgfZOM2z_Rllw478Q',
        image_url:
          'https://s3-media3.fl.yelpcdn.com/bphoto/UtjeEmgk-RtAoTc7pJluDQ/o.jpg',
        is_closed: false,
        location: {
          address1: 'Bernburger Str. 35',
          address2: '',
          address3: null,
          city: 'Berlin',
          zip_code: '10963',
        },
        name: 'Stadtklause',
        phone: '+493051056381',
        price: '€',
        rating: 4.5,
        review_count: 171,
        transactions: [],
        url: 'https://www.yelp.com/biz/stadtklause-berlin?adjust_creative=ors6zRuF6OV8AsDVv84wmA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ors6zRuF6OV8AsDVv84wmA',
      },
    ];

    const { container } = render(
      <Restaurants businesses={mockBusinesses} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toMatchSnapshot();
  });
});
