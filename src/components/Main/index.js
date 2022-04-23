import React from 'react';
import Select from 'react-select';

import './Main.css';

const COORDS = {
	'Europe/Berlin': {lat: 52.518611, lng: 13.408333}
}

const options = [
	{value: 'pizza', label: 'Pizza'},
	{value: 'burger', label: 'Burger'},
	{value: 'sushi', label: 'Sushi'}
]

class Main extends React.Component {
	state = {
		businesses: [],
		selectedRestaurant: null,
		loading: false,
		markers: [],
	}

	mapsApiLoaded = null;
	mapInstance = null;

	componentDidMount() {
		this.setState({ loading: true, });
		this.fetchRestaurants()
			.then(res => this.setState({ businesses: res.businesses || [], loading: false }))
			.catch(err => console.log(err));

		this.mapsApiLoaded = window.setTimeout(this.checkMapsApi.bind(this), 200);
	}

	fetchRestaurants = async (searchTerm = 'restaurants') => {
		const query = {
			limit: 50,
			location: "Berlin, Germany",
			term: searchTerm,
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
				zoom: 8,
			  });
		}
	}

	clearMarkers() {
		this.state.markers.forEach(marker => {
			marker.setMap(null);
		});
		this.setState({ markers: [] });
	}

	async handleSelectChange(selectedOption) {
		this.setState({ selectedRestaurant: selectedOption, loading: true });
		this.clearMarkers();
		try {
			const res = await this.fetchRestaurants(selectedOption?.value || 'restaurants')
			this.setState({ businesses: res.businesses || [] });

			let markers = [];
			res.businesses.forEach(business => {
				let latLng = new window.google.maps.LatLng(business.coordinates.latitude,
					business.coordinates.longitude);
					// let options = new window.google.maps.MarkerOptions();
				let marker = new window.google.maps.Marker({
				  position: latLng,
				  map: this.mapInstance,
				  title: business.name,
				  animation: window.google.maps.Animation.sz,
				});
				markers.push(marker);
			});
			this.setState({ markers, loading: false });
			
		} catch (error) {
			this.setState({ loading: false });
		}
	}

	render() {
		return (
			<main>
				<div id='places-map' className='places-map'></div>
				
				<div className="places-option-container">
					<Select
						className="places-option"
						value={this.state.selectedRestaurant}
						onChange={(selectedOption) => this.handleSelectChange(selectedOption)}
						options={options}
						isClearable
						isLoading={this.state.loading}
					/>
					{/* <select name="restaurants" onChange={(e) => this.setState({ restaurantFilter: e.target.value })} className="places-option">
						<option value="pizza">Pizza</option>
						<option value="burger">Burger</option>
						<option value="sushi">Sushi</option>
					</select> */}
				</div>

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
