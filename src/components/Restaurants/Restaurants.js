import React from 'react';
import propTypes from 'prop-types';

const Restaurants = ({ businesses }) => {
  return (
    <>
      {businesses.map((business) => {
        return (
          <div className="card" key={business.id}>
            <img src={business.image_url} alt={business.name} />
            <div className="container">
              <h4>
                <a href={business.url}>{business.name}</a>
              </h4>
              {business.location && business.location.display_address && (
                <p>
                  {business.location.display_address[0]}
                  <br />
                  {business.location.display_address[1]}
                </p>
              )}
              <p>{business.display_phone}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

Restaurants.propTypes = {
    businesses: propTypes.array.isRequired,
}

Restaurants.displayName = 'components/Restaurants/Restaurants';

export default Restaurants;
