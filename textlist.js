
$(document).ready( function () {

    var TextModel = Backbone.Model.extend({
      defaults: {"num" : 0, "value" : "", "lastVal" : ""},
      replace : function (str) {
        this.set("value", str);
        var currVal = this.get("num");
        var currText = this.get("value");
        if (currText !== this.get("lastVal")) {
          this.set("num", currVal+1);
        }
      }
    });

    function useMustacheTemplates() {
              _.templateSettings = {
                  interpolate: /\{\{(.+?)\}\}/g
              };
          }
    useMustacheTemplates();
    var TextView = Backbone.View.extend({

        template: _.template('{{textVal}} <br><div> <input type="text" value="{{textVal}}" /> <button id="clr">Clear</button> </div><p> {{counter}} </p>'),

        render: function () {
          var data = {counter:this.model.get("num"),
                      textVal:this.model.get("value")};

            //var counter = this.model.get("num");
            //var textVal = this.model.get("value");
            //var btn = '<button id="clr">Clear</button>';
            //var input = '<input type="text" value="' + textVal + '" />';
            //this.$el.html(textVal + "<br><div>" + input + btn + "</div" + "<p>" + counter + "</p>")

            this.$el.html(this.template(data));
            // $(document.body).append(this.$el);
        },
        initialize: function () {
          this.model.on("change", this.render, this);

            // last argument 'this' ensures that render's
            // 'this' means the view, not the model
        },
        events : {
            "click #clr" : "clear",
            "keypress input" : "updateOnEnter"
        },
        replace : function () {

            var str = this.$el.find("input").val();
            this.model.replace(str);
        },
        clear: function () {
            this.model.set("lastVal", this.model.get("value"));
            this.model.replace("");
        },
        updateOnEnter: function (e){
            if(e.keyCode == 13) {
                this.replace();
            }
        },
    });

    var TextCollection = Backbone.Collection.extend({
        model : TextModel
    });

    var TextCollectionView = Backbone.View.extend({
        render : function () {
            var btn = '<button id="addbutton">Add Text</button>';
            var div = '<div id="text-list"></div>';
            var del = '<button id="del">Delete Last Item</button>';
            this.$el.html(div + btn + del);
        },

        initialize : function () {
            this.listenTo(this.collection, 'add', this.addView);
            this.arr = [];
        },
        events : {
            "click #addbutton" : "addModel",
            "click #del" : "delModel"
        },
        addModel : function () {
            this.collection.add({});
            // collection adds a model, fires add event, then listener calls this.addView(model)
        },
        addView : function (newModel) {
            newModel.set("value","");
            var view = new TextView({model : newModel});
            this.arr.push(view);
            view.render();
            this.$("#text-list").append(view.$el);
        },
        delModel : function () {
            var view = this.arr.pop();
            view.remove();
        }
    });

    var textCollection = new TextCollection();

    var textCollectionView = new TextCollectionView({ collection : textCollection});

    textCollectionView.render();

    $("#listdiv").append(textCollectionView.$el);

});