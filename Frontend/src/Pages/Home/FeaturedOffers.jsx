import React from 'react';

const FeaturedOffers = ({ offers, onOfferClick }) => {
  return (
    <section className="featured-offers section">
      <div className="container">
        <h2 className="section-title">Featured Offers</h2>
        <div className="row">
          {offers.map((offer) => (
            <div className="col col-3" key={offer.id}>
              <div className="card" onClick={() => onOfferClick(offer)}>
                <img src={offer.image} alt={offer.title} className="card-img" />
                <div className="card-body">
                  <h3 className="card-title">{offer.title}</h3>
                  <p className="card-text">{offer.description}</p>
                  <button className="btn btn-primary">View Offer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOffers;
