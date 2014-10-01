
var Brick = function(config) {

  var session = new Brick.Session({
    landingPage: config.oauthLandingPage,
    consumerKey: config.oauthConsumerKey,
    secret: config.oauthSecret
  });

  //*******************************************************

  var provider = new Brick.Provider({ url: 'http://data.osmbuildings.org/0.2/rkc8ywdl/feature/{id}.json' });

  //*******************************************************

  var mapConfig = {
    mapId: config.mapId
  };

  //*******************************************************

  var state = new Brick.State();

  if (state.get('lat') !== undefined && state.get('lon') !== undefined) {
    mapConfig.lat = parseFloat(state.get('lat'));
    mapConfig.lon = parseFloat(state.get('lon'));
  }
  if (state.get('zoom') !== undefined) {
    mapConfig.zoom = state.get('zoom');
  }

  //*******************************************************

  var map = new Brick.Map(mapConfig);

  map.on('mapChanged', function(e) {
    for (var p in e) {
      state.get(p, e[p]);
    }
  });

  map.on('featureSelected', provider.loadFeature, provider);

  //*******************************************************

  provider.on('featureLoaded', map.showPopup, map);

  //*******************************************************

  var osm = Brick.OSMAPI(session.auth);

  map.on('featureSelected', function(e) {
//    osm.loadEntity('way', e, function(res) {
//console.log('WAY', res);
//    });
    osm.loadEntity('relation', e, function(res) {
console.log('REL', res);
    });
  });
};

Brick.VERSION = '0.1.0';
