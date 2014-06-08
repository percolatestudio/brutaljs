if (Meteor.isServer) {
  var Brutal = new Meteor.Collection('brutal');
  
  // event loop timer
  function tickTimer(threshold) {
    var time = process.hrtime();
    setImmediate(function() {
      var diff = process.hrtime(time);
      var ns = diff[0] * 1e9 + diff[1];
      var ms = ns * 1e-6;

      if (ms > (threshold || 0))
        console.log('tick delay: %j (%d ms)', diff, ms);

      tickTimer(threshold);
    });
  }
  
  tickTimer(100);
  
  Meteor.startup(function () {
    // function block() {
    //   for (var i = 0; i < 1e9;i++) {/*noop*/}
    //   console.log('block iteration');
    // }
    // 
    // function withSetTimeout(fn) {
    //   setTimeout(function() {
    //     fn();
    //     withSetTimeout(fn);
    //   })
    // }
    // 
    // function withImmediate(fn) {
    //   process.nextTick(function() {
    //     fn();
    //     withImmediate(fn);
    //   })
    // }
    // 
    // withSetTimeout(block);

    Meteor.setTimeout(function() {
      console.log('running forever update');
      Brutal.upsert({}, {i: 0});
      while(true){
        Brutal.update({_id: Brutal.findOne()._id}, {$inc: {i: 1}});
      }
    });
  });
}
