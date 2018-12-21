
(function () {
  'use strict';

angular.module('MainApp').controller('PredictController', PredictController);

  PredictController.$inject = ['PredictRentService', '$window'];
  function PredictController (PredictRentService, $window) {
     var map;
                var latitude = 12.9716; // YOUR LATITUDE VALUE
                var longitude = 77.5946; // YOUR LONGITUDE VALUE
                
                var myLatLng = {lat: latitude, lng: longitude};
                
                map = new google.maps.Map(document.getElementById('SelectMapLocation'), {
                  center: myLatLng,
                  zoom: 14,
                  disableDoubleClickZoom: true, // disable the default map zoom on double click
                });
                
                // Update lat/long value of div when anywhere in the map is clicked    
                google.maps.event.addListener(map,'click',function(event) {                
                    document.getElementById('latclicked').innerHTML = event.latLng.lat();
                    document.getElementById('longclicked').innerHTML =  event.latLng.lng();
                });
                
                // Update lat/long value of div when you move the mouse over the map
                google.maps.event.addListener(map,'mousemove',function(event) {
                    document.getElementById('latmoved').innerHTML = event.latLng.lat();
                    document.getElementById('longmoved').innerHTML = event.latLng.lng();
                });
                        
                var marker = new google.maps.Marker({
                  position: myLatLng,
                  map: map,
                  title: latitude + ', ' + longitude 
                });    
                
                // Update lat/long value of div when the marker is clicked
                marker.addListener('click', function(event) {              
                  document.getElementById('latclicked').innerHTML = event.latLng.lat();
                  document.getElementById('longclicked').innerHTML =  event.latLng.lng();
                });
                
                // Create new marker on double click event on the map
                google.maps.event.addListener(map,'dblclick',function(event) {
                    var marker = new google.maps.Marker({
                      position: event.latLng, 
                      map: map, 
                      title: event.latLng.lat()+', '+event.latLng.lng()
                    });          
                });

    const PredictCtrl = this;

    PredictCtrl.rentRange = null;

    PredictCtrl.loader = false;

    PredictCtrl.disableButton = false;

    PredictCtrl.detail = {
      longitude: null,
      latitude: null,
      gym: 0,
      lift: 0,
      swimming_pool: 0,
      property_size: null,
      bathroom: null,
      floor: null,
      total_floor: null,
      balconies: null,
    }

    // ***************************************************************************
    // FOR PARKING TYPE
    PredictCtrl.parkingCategory = null;

    PredictCtrl.parkingCategoryDetail = {
      parking_BOTH: 0,
      parking_FOUR_WHEELER: 0,
      parking_NONE: 0,
      parking_TWO_WHEELER: 0
    };

    PredictCtrl.parkingCategoryValue = {
      parking_BOTH: "Both",
      parking_FOUR_WHEELER: "Four Wheeler",
      parking_NONE: "None",
      parking_TWO_WHEELER: "Two Wheeler"
    };

    // method for stoding selected type as 1, and rest to 0
    PredictCtrl.setParkingTypeValue = function () {
      for (let key in PredictCtrl.parkingCategoryDetail) {
        PredictCtrl.parkingCategoryDetail[key] = +(PredictCtrl.parkingCategory === key);
      }
      Object.assign(PredictCtrl.detail, PredictCtrl.parkingCategoryDetail);
    }
    // ***************************************************************************

    // ***************************************************************************
    // FOR BUILDING CATEGORY TYPE
    PredictCtrl.buildingCategory = null;

    PredictCtrl.buildingCategoryDetail = {
      building_type_AP: 0,
      building_type_GC: 0,
      building_type_IF: 0,
      building_type_IH: 0
    };

    PredictCtrl.buildingCategoryValue = {
      building_type_AP: "Apartment",
      building_type_GC: "Independent House / Villa",
      building_type_IF: "Independent Floor / Builder's Floor",
      building_type_IH: "Gated Community Villa"
    };

    // method for stoding selected type as 1, and rest to 0
    PredictCtrl.setBuildingCategoryValue = function () {
      for (let key in PredictCtrl.buildingCategoryDetail) {
        PredictCtrl.buildingCategoryDetail[key] = +(PredictCtrl.buildingCategory === key);
      }
      Object.assign(PredictCtrl.detail, PredictCtrl.buildingCategoryDetail);
    }
    // ***************************************************************************


    // ***************************************************************************
    // FOR BUILDING TYPE
    PredictCtrl.buildingType = null;

    PredictCtrl.buildingTypeDetail = {
      type_BHK1: 0,
      type_BHK2: 0,
      type_BHK3: 0,
      type_BHK4: 0,
      type_BHK4PLUS: 0,
      type_RK1: 0
    };

    PredictCtrl.buildingTypeValue = {
      type_BHK1: "BHK 1",
      type_BHK2: "BHK 2",
      type_BHK3: "BHK 3",
      type_BHK4: "BHK 4",
      type_BHK4PLUS: "BHK 4 PLUS",
      type_RK1: "RK 1"
    };

    // method for stoding selected type as 1, and rest to 0
    PredictCtrl.setBuildingTypeValue = function () {
      for (let key in PredictCtrl.buildingTypeDetail) {
        PredictCtrl.buildingTypeDetail[key] = +(PredictCtrl.buildingType === key);
      }
      Object.assign(PredictCtrl.detail, PredictCtrl.buildingTypeDetail);
    }
    // ***************************************************************************


    // this method calls for api and fetch the predicted result from server
    PredictCtrl.getResult = function () {
      let checkEmpty = false;

      PredictCtrl.rentRange = null;
      PredictCtrl.loader = true;
      PredictCtrl.disableButton = true;

      PredictCtrl.response = PredictRentService.getResult(PredictCtrl.detail);
      PredictCtrl.response.then(function (response) {
        console.log(response.data);
        PredictCtrl.rentRange = response.data[0];
        $window.scrollTo(0, 0);
        PredictCtrl.loader = false;
        PredictCtrl.disableButton = false;
        if (PredictCtrl.rentRange > 11000 && PredictCtrl.rentRange < 13600) {
            document.getElementById("tb1").style.display = "block";
            document.getElementById("tb2").style.display = "none";
            document.getElementById("tb3").style.display = "none";
            document.getElementById("tb4").style.display = "none";
            document.getElementById("tb5").style.display = "none";
            document.getElementById("tb6").style.display = "none";
          }
          else if (PredictCtrl.rentRange >= 17000 && PredictCtrl.rentRange < 19100) {
            document.getElementById("tb2").style.display = "block";
            document.getElementById("tb1").style.display = "none";
            document.getElementById("tb3").style.display = "none";
            document.getElementById("tb4").style.display = "none";
            document.getElementById("tb5").style.display = "none";
            document.getElementById("tb6").style.display = "none";
          }
          else if (PredictCtrl.rentRange >= 13600 && PredictCtrl.rentRange < 17000) {
            document.getElementById("tb3").style.display = "block";
            document.getElementById("tb2").style.display = "none";
            document.getElementById("tb1").style.display = "none";
            document.getElementById("tb4").style.display = "none";
            document.getElementById("tb5").style.display = "none";
            document.getElementById("tb6").style.display = "none";
          }
          else if (PredictCtrl.rentRange <= 11000) {
            document.getElementById("tb4").style.display = "block";
            document.getElementById("tb2").style.display = "none";
            document.getElementById("tb3").style.display = "none";
            document.getElementById("tb1").style.display = "none";
            document.getElementById("tb5").style.display = "none";
            document.getElementById("tb6").style.display = "none";
          }
          else if (PredictCtrl.rentRange >= 19100 && PredictCtrl.rentRange < 28100) {
            document.getElementById("tb5").style.display = "block";
            document.getElementById("tb2").style.display = "none";
            document.getElementById("tb3").style.display = "none";
            document.getElementById("tb4").style.display = "none";
            document.getElementById("tb1").style.display = "none";
            document.getElementById("tb6").style.display = "none";
          }
          else if (PredictCtrl.rentRange >= 28100) {
            document.getElementById("tb6").style.display = "block";
            document.getElementById("tb2").style.display = "none";
            document.getElementById("tb3").style.display = "none";
            document.getElementById("tb4").style.display = "none";
            document.getElementById("tb5").style.display = "none";
            document.getElementById("tb1").style.display = "none";
          }
      }, function (response) {
        console.log(response.status);
        PredictCtrl.loader = false;
        PredictCtrl.disableButton = false;
      })
    }
  }
})()
