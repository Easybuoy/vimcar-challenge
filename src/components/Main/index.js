import React from 'react';

import Restaurants from '../Restaurants';
import RestaurantsFilter from '../Restaurants/RestaurantsFilter';
import fetchRestaurants from '../../api/fetchRestaurants';
import COORDS from '../../constants/coordinates';
import './Main.css';

class Main extends React.Component {
	state = {
		businesses: [],
		selectedRestaurant: null,
		loading: false,
		markers: [],
		error: false,
	}

	mapsApiLoaded = null;
	mapInstance = null;

	async componentDidMount() {
		this.setState({ loading: true });
		try {
			const res = await fetchRestaurants();
			this.setState({ businesses: res.businesses || [], loading: false })
		} catch (error) {
			this.setState({ error: true, loading: false, });
		}

		this.mapsApiLoaded = window.setTimeout(this.checkMapsApi.bind(this), 200);
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

	setMarkers() {
		let markers = [];
		this.state.businesses.forEach(business => {
			let latLng = new window.google.maps.LatLng(business.coordinates.latitude,
				business.coordinates.longitude);
			let marker = new window.google.maps.Marker({
				position: latLng,
				map: this.mapInstance,
				title: business.name,
				animation: window.google.maps.Animation.sz,
			});
			markers.push(marker);
		});
		this.setState({ markers, loading: false });
	};

	async handleSelectChange(selectedOption) {
		this.setState({ selectedRestaurant: selectedOption, loading: true });
		this.clearMarkers();
		try {
			const res = await fetchRestaurants(selectedOption?.value || 'restaurants')
			this.setState({ businesses: res.businesses || [], error: false });
			this.setMarkers();
			this.setState({ loading: false });
		} catch (error) {
			this.setState({ loading: false, error: true });
		}
	}

	render() {
		return (
			<main>
				<div id='places-map' className='places-map'></div>

				<RestaurantsFilter
					value={this.state.selectedRestaurant}
					isLoading={this.state.loading}
					handleFilterChange={(selectedOption) => this.handleSelectChange(selectedOption)}
				/>

				{this.state.error && <p>Error loading restaurants, please try again!</p>}

				<Restaurants businesses={this.state.businesses} />
			</main>
		);
	}
}

export default Main;
