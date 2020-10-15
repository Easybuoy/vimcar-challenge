import React from 'react';

import './Main.css';

const COORDS = {
	'Europe/Berlin': {lat: 52.518611, lng: 13.408333}
}

class Main extends React.Component {
	state = {
		businesses: []
	}

	mapsApiLoaded = null;
	mapInstance = null;

	componentDidMount() {
		this.fetchRestaurants()
			.then(res => this.setState({ businesses: res.businesses || [] }))
			.catch(err => console.log(err));

		this.mapsApiLoaded = window.setTimeout(this.checkMapsApi.bind(this), 200);
	}

	fetchRestaurants = async () => {
		const query = {
			limit: 50,
			location: "Berlin, Germany",
			term: "restaurants"
		}
		const urlParams = new URLSearchParams(query);
		const response = await fetch(`/-/search?${urlParams}`);
		const body = await response.json();

		if (response.status !== 200) {
			throw Error(body.message);
		}
		return body;
	}

	checkMapsApi() {
		if (window.google && window.google.maps) {
			window.clearTimeout(this.mapsApiLoaded);
			this.initMap();
		}
	}

	initMap() {
		const mapEl = document.getElementById('places-map');
		if (mapEl && !this.mapInstance) {
			this.mapInstance = new window.google.maps.Map(mapEl, {
				center: COORDS['Europe/Berlin'],
				zoom: 8
			  });
		}
	}

	render() {
		return (
			<main>
				<div id='places-map' className='places-map'></div>
				{this.state.businesses.map(business => {
					return (
						<div className="card" key={business.id}>
							<img src={business.image_url} alt={business.name} />
							<div className="container">
								<h4><a href={business.url}>{business.name}</a></h4>
								{
									business.location &&
									business.location.display_address &&
									(
										<p>
											{business.location.display_address[0]}
											<br />
											{business.location.display_address[1]}
										</p>
									)
								}
								<p>{business.display_phone}</p>
							</div>
						</div>
					)
				})}
			</main>
		);
	}
}

export default Main;
