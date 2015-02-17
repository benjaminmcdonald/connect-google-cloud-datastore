module.exports = function(session){
  var Store = session.Store;
  var Error = require('errno-codes');


  function CloudStore(options) {
    options = options || {};
    Store.call(this, options);

    if (options.dataset) {
      this.dataset = options.dataset

    } else if (options.credentials && options.projectId) {
      this.dataset = require('gcloud').datastore.dataset({
        credentials: options.credentials,
        projectId: options.projectId
      });

    } else {
      throw new Error('Missing Google Cloud Datastore');
    }
  }


  CloudStore.prototype.__proto__ = Store.prototype;


  CloudStore.prototype.get = function(id, callback) {
    var key = this.dataset.key(['Session', id]);

    this.dataset.get(key, function(error, entity) {

      if (error || !entity) {
        return callback(error || Error.get(Error.ENOENT));
      }

      callback(null, JSON.parse(entity.data.config));
    });
  };


  CloudStore.prototype.set = function(id, sessionConfig, callback) {
    var key = this.dataset.key(['Session', id]);
    var config = JSON.stringify(sessionConfig);

    this.dataset.save({
      key: key,
      data: {
        updatedAt: new Date(),
        config: config
      }
    }, function(error, entity) {
      callback(error, config);
    });
  };


  CloudStore.prototype.destroy = function(id, callback) {
    var key = this.dataset.key(['Session', id]);

    this.dataset.delete(key, callback);
  };


  return CloudStore;
};
