var JobTracker = new Backbone.Marionette.Application();

var Job = Backbone.Model.extend({});
var Jobs = Backbone.Collection.extend({
    model: Job
});

var JobView = Backbone.Marionette.ItemView.extend({
    template: '#jobView'
});

var NoJobsView = Backbone.Marionette.ItemView.extend({
    template: '#noJobsView'
});

var JobsView = Backbone.Marionette.CollectionView.extend({
    jobView: JobView,
    emptyView: NoUsersView
});

var FormView = Backbone.Marionette.ItemView.extend({
    template: '#formView',
    events: {
	'click button': 'createNewJob'
    },
    ui: {
	name : '#name',
	length  : '#length'
    },
    createNewJob: function() {
	this.collection.add({
	    name : this.ui.name.val(),
	    length: this.ui.length.val()
	});
	this.ui.name.val('');
	this.ui.length.val('');
    }
});

JobTracker.addRegions({
    form: '#form',
    list: '#list'
});

JobTracker.addInitializer(function () {
    JobTracker.jobs = new Jobs();

    JobTracker.form.show(new FormView({ collection: JobTracker.jobs }));
    JobTracker.list.show(new Jobsview({ collection: JobTracker.jobs });
});

JobTracker.start();


