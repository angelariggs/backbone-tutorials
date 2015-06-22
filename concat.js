var TextModel = Backbone.Model.extend({
  defaults : {"value" : ""},
  replace : function (str) {
    this.set("value", str);
  }
});

var TextView = Backbone.View.extend({
  render: function () {
    var textVal = this.model.get("value");
    var btn = '<button id="addbutton">Add Text</button>';
    var input = '<input type="text" value=""/>';
    var clr = '<button id = "clr">Clear Text</button>'
    this.$el.html(textVal+"<div>" + input + btn + "</div>" + clr);
  },
  initialize: function () {
    this.model.on("change", this.render, this);
    // last argument 'this' ensures that render's
    // 'this' means the view, not the model
  },
  events : {
    "click #clr" : "clear",
    "click #addbutton" : "concat", 
    "keypress input" : "updateOnEnter"
  },
  concat : function () {
    var str = this.$el.find("input").val();
    var currVal = textModel.get("value");
    this.model.replace(currVal+str);
  },
  clear: function () {
    this.model.replace("");
  },
  updateOnEnter: function (e){
    var str = this.$el.find("input").val();
    var currVal = textModel.get("value");
    if(e.keyCode == 13) {
      this.model.replace(currVal+str);
    }
  }
});

var textModel;
var textView;
$(document).ready( function () {

    textModel = new TextModel();

    textView = new TextView({model : textModel});
    textView.render();

    textModel.on("change", function () {
        textView.render();
    });

    // textView.$el.on("click","#addbutton", function () {
    //     var mod = textView.model;
    //     var currVal = mod.get("value");
    //     var str = textView.$el.find("input").val();
    //     mod.set("value",currVal+str);
    // });

    // textView.$el.on("click","#clr", function () {
    //   var mod = textView.model;
    //   mod.set("value","");
    // });

    $("#concat-text").append(textView.$el);

});
