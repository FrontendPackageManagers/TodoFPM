
/**
 * Module dependencies.
 */

var model = require('model')
  , timestamps = require('model-timestamps')
  , defaults = require('model-defaults')
  , store = require('store')
  , uid = require('uid');

/**
 * Namespace for the store.
 */

var storeNamespace = 'component-todo-fpm';

/**
 * Item model.
 */

var ItemConstructor = model('Item')
  .use(defaults)
  .use(timestamps)
  .attr('id')
  .attr('title')
  .attr('complete', { default: false })
  .use(function(model) {
    // need this event, default plugin result would be: same id for all instances
    model.on('construct', function(newModel, attrs) {
      if (attrs.id == null) newModel.attrs.id = uid(8);
    })
  });

/**
* Overwrite default comonent/model behaviour: using REST
*/
module.exports = function(attrs) {
  var item = ItemConstructor(attrs);
  
  item.model.prototype.destroy = function() {
      store(storeNamespace+'.'+this.id(), null);
  }
  
  item.model.prototype.save = function() {
      store(storeNamespace+'.'+this.id(), this);
  }
  return item;
};

module.exports.all = function() {
  var all = store();
  var keys = Object.keys(all);
  var itemKeys = keys.filter(function(key){
      return key.substr(0, storeNamespace.length) === storeNamespace;
  });
  return itemKeys.map(function(id) {return all[id]}) || [];
}