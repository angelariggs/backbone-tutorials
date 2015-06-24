
$(document).ready( function () {

    var Counter = Backbone.Model.extend({
        defaults : {"value" : 0},
        urlRoot : "/counter",
        inc: function() {
            var val = this.get("value");
            this.set("value", val+1);
            this.save();
        }
    });
    
    var counterModel1 = new Counter({id : 1});

    // Counter.prototype.inc = function () {
    //     var val = this.get("value");
    //     this.set("value", val+1);
    //     this.save();
    // }


    
    counterModel1.fetch();

var CounterView = Backbone.View.extend({
        render: function () {
            var val = this.model.get("value");
            var btn = '<button id="inc">Increment</button>';
            var btn2 = '<button id = "dec">Decrease</button>';
            this.$el.html('<p>'+val+'</p>' + btn + btn2);
        },
        initialize: function () {
            this.model.on("change", this.render, this);
            this.listenTo(this.model, 'sync', this.view, this);
        },
        events : {
            'click #inc' : 'increment',
            'click #dec' : 'decrement'
        },
        increment : function () {
            this.model.inc();
        },
        decrement : function() {
            var mod = this.model;
            var currVal = mod.get("value");
            //mod.set("value")
              if (currVal === 0) {
                return 
              } else {
                mod.set("value",currVal-1);
                }
        },
        view : function() {
            this.$el.append('<p>Success</p>')
            console.log("works")
        }
    });
    
    var counterView1 = new CounterView({model : counterModel1});
    
    counterView1.render();
    
    $("#counterdiv").append(counterView1.$el);
    
});
