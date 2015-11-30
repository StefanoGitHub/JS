//var Person = function(config) {
//    this.name = config.name;
//    this.age = config.age;
//    this.occupation = config.occupation;
//};
//
//Person.prototype.work = function() {
//    return this.name + 'is working';
//};
//
//var person = new Person( {
//    name: 'Stefano',
//    age: 32,
//    occupation: 'student'
//})


var Person = Backbone.Model.extend({
    defaults: {
        name: 'Stefano',
        age: 32,
        occupation: 'student'
    },
    work: function() {
        return this.get(name) + 'is working';
    }
})

var PersonView = Backbone.View.extend({
    tagName: 'li',
    template: _.template( $("#user-template").html() ),
    initialize: function() {
        //console.log(this);
        this.render();
    },
    render: function() {
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;
    }
});

var PeopleCollection = Backbone.Collection.extend({
    model: Person
})

var PeopleView = Backbone.View.extend({
    el: "#people",
    initialize: function() {
        console.log(this);
        this.render();
    },
    render: function() {
        this.collection.each(function (user) {
            var personView = new PersonView( { model: user });
            this.$el.append(personView.render().el);
        }, this);
    }
});


var person = new Person;
var peopleCollection = new PeopleCollection([
//    person,
//    {
//        name: 'Thomas',
//        age: 33,
//        occupation: 'teacher'
//    }
    ]);
var peopleView = new PeopleView({collection: peopleCollection});


