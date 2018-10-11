angular.module('contact', []);
angular.module('contact')
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		on: on,
		onStoreSelected: function(callback) {
			on('bookshop.Stores.Stores.selected', callback);
		}
	};
}])
.controller('ContactController', function ($scope, $http, $messageHub, $sce) {

	var storesApi = '../../../../../../js/bookshop/api/Stores/Stores.js';

	function loadLocation(storeId) {
		$http.get(storesApi + '/' + storeId)
		.success(function(data) {
			$scope.contact = data;
			$scope.location = $sce.trustAsResourceUrl('https://maps.google.com/maps?q=' + data.Street + '%20' + data.City + '=&z=13&ie=UTF8&iwloc=&output=embed');
		});
	}

	$messageHub.onStoreSelected(function(e) {
		loadLocation(e.data.id);
	});
});