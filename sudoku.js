var SqrModel = Backbone.Model.extend({
  defaults: {"num":0}
});

var SqrCollection = Backbone.Collection.extend({
  model:SqrModel
});// closes SqrCollection

var sqrcoll = new SqrCollection();

for (i=0; i<82; i++) {
  sqrcoll.add([{num:i}])
};

var inputString = '158.2..6.2...8..9..3..7.8.2.6.74......4.6.7......19.5.4.9.3..2..2..5...8.7..9.413'

var SqrView = Backbone.View.extend({
  

})// closes SqrView