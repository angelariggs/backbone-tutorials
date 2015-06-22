
var Counter = Backbone.Model.extend({
    defaults : {"value" : 0}
});

var CounterView = Backbone.View.extend({
    render: function () {
        var val = this.model.get("value");
        var btn = '<button id="btn">Increment</button>';
        var btn2 = '<button id = "btn2">Decrease</button>';
        var clr = '<button id = "clr">Clear</button>';
        this.$el.html('<p>'+val+'</p>' + btn + btn2 + clr);
    }
});

var counterModel;
var counterView;
$(document).ready( function () {

    counterModel = new Counter();

    counterView = new CounterView({model : counterModel});
    counterView.render();

    counterModel.on("change", function () {
        counterView.render();
    });

    counterView.$el.on("click","#btn", function () {
        var mod = counterView.model;
        var currVal = mod.get("value");
        mod.set("value",currVal+1);
    });

    counterView.$el.on("click","#btn2", function () {
        var mod = counterView.model;
        var currVal = mod.get("value");
        mod.set("value",currVal-1);
    });

    counterView.$el.on("click","#clr", function () {
        var mod = counterView.model;
        var currVal = mod.get("value");
        mod.set("value",currVal = 0);
    });

    $("#counterdiv").append(counterView.$el);

});
