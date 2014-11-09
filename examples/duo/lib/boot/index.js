
/**
 * Module dependencies.
 */

var Item = require('/lib/item')
  , ItemPresenter = require('/lib/item-presenter')
  , Collection = require('component/collection')
  , keyname = require('component/keyname@0.0.1')
  , page = require('visionmedia/page.js@1.3.7');

/**
 * Collection of todo Items.
 */

var items = new Collection();

/**
 * Todo input.
 */

var input = document.querySelector('[name=todo]');

/**
 * Todo list.
 */

var list = document.querySelector('#todos');

/**
 * Handle keydown.
 */

if (input != null && list != null) {
  input.onkeydown = function(e){
    switch (keyname(e.which)) {
      case 'enter':
        // input
        var str = e.target.value;
        if ('' == str.trim()) return;
        e.target.value = '';

        // item
        var item = new Item({ title: str });
        items.push(item);
        item.save();

        // presenter
        var presenter = new ItemPresenter(item);
        list.appendChild(presenter.view.el);
        break;
    }
  };


  page.base('/examples/duo');

  /**
   * Clear list.
   */

  page('*', function(ctx, next){
    list.innerHTML = '';
    next();
  });

  /**
   * All items.
   */

  page('/', function(){
    var items = Item.all();
    items.forEach(function(unserialized){
      var presenter = new ItemPresenter(new Item(unserialized));
      list.appendChild(presenter.view.el);
    });
  });

  /**
   * Completed items.
   */

  page('/complete', function(){
    var items = Item.all();
    items.forEach(function(unserialized){
      var item = new Item(unserialized);
      if (item.complete() === false) return;
      var presenter = new ItemPresenter(item);
      list.appendChild(presenter.view.el);
    });
  });

  /**
   * Incomplete items.
   */

  page('/incomplete', function(){
    var items = Item.all();
    items.forEach(function(unserialized){
      var item = new Item(unserialized);
      if (item.complete() === true) return;
      var presenter = new ItemPresenter(item);
      list.appendChild(presenter.view.el);
    });
  });

  page();
}