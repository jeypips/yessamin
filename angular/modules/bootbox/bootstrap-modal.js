angular.module('bootstrap-modal',[]).service('bootstrapModal', function($compile,$timeout) {

	this.confirm = function(scope,title,content,onOk,onCancel) {
		
		var dialog = bootbox.confirm({
			title: title,
			message: content,
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-secondary'
				},
				confirm: {
					label: 'Ok',
					className: 'btn-primary'
				}
			},
			callback: function (result) {
				if (result) {
					onOk(scope);
				} else {
					onCancel();
				}
			}
		});
		
		dialog.init(function() {
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		});	
		
	};
	
	this.notify = function(scope,content,onOk) {

		var dialog = bootbox.alert({
			title: 'Notification',
			message: content,
			callback: function () {
				onOk();
			}
		});
		
		dialog.init(function() {
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		});
	
	};
	
	this.box = function(scope,title,content,onOk) {

		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				},
				confirm: {
					label: 'Ok',
					className: 'btn-success'
				}
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content);
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		});
	
	};
	
	this.box2 = function(scope,title,content,onOk) {

		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading...',
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				},
				confirm: {
					label: 'Ok',
					className: 'btn-success'
				}				
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}
			}
		});

		dialog.init(function() {
			dialog.find('.bootbox-body').load(content);
			$('.modal-content').css({"width": "230%","left": "-65%"});			
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		});

	};
	
	this.box3 = function(scope,title,content,onOk) {

		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				},
				confirm: {
					label: 'Save',
					className: 'btn-primary'
				}
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content);
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		});
	
	};

});