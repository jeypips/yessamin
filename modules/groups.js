angular.module('app-module',['ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,bui) {
	
	function app() {
		
		var self = this;
		
		var loading = '<div class="col-sm-offset-4 col-sm-8"><button type="button" class="btn btn-dark" title="Loading" disabled><i class="fa fa-spinner fa-spin"></i>&nbsp; Please wait...</button></div>';
		
		self.data = function(scope) { // initialize data			
						
			scope.mode = null;
			
			scope.views = {};
			scope.views.currentPage = 1;

			scope.views.list = true;
			
			scope.btns = {
				ok: {disabled: false, label: 'Save'},
				cancel: {disabled: false, label: 'Cancel'}
			};
				
			scope.group = {};
			scope.group.id = 0;
			
			scope.groups = []; // list
			
		};
		
		self.list = function(scope) {

			scope.views.list = true;
		
			bui.show();
			
			scope.group = {};
			scope.group.id = 0;
			
			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;
			
			$http({
			  method: 'POST',
			  url: 'handlers/groups/list.php',
			}).then(function mySucces(response) {
				
				scope.groups = angular.copy(response.data);
				scope.filterData = scope.groups;
				scope.currentPage = scope.views.currentPage;
				
				bui.hide();
				
			}, function myError(response) {
				 
				bui.hide();
				
			});
			
			$('#content').load('lists/groups.html', function() {
				$timeout(function() { $compile($('#content')[0])(scope); },100);								
			});				
			
		};

		function validate(scope) {
			
			var controls = scope.formHolder.group.$$controls;
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});

			return scope.formHolder.group.$invalid;
			
		};
		
		function mode(scope,row) {
			
			if (row == null) {
				scope.btns.ok.label = 'Save';
				scope.btns.ok.btn = false;
				scope.btns.cancel.label = 'Cancel';
				scope.btns.cancel.btn = false;
			} else {
				scope.btns.ok.label = 'Update';
				scope.btns.ok.btn = true;
				scope.btns.cancel.label = 'Close';
				scope.btns.cancel.btn = false;				
			}
			
		};	
		
		self.add = function(scope,row) {	
		
			scope.group = {};
			scope.group.id = 0;
			
			privileges(scope);	
			
			mode(scope,row);
			
			$('#content').html(loading);
			$('#content').load('forms/group.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});
			
			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;				
				$http({
				  method: 'POST',
				  url: 'handlers/groups/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.group);
					privileges(scope);
					
				}, function myError(response) {
					
				  // error
				  
				});
					
			}; //row
		
			
		};
		
		
		self.edit = function(scope) {
			
			scope.btns.ok.btn = !scope.btns.ok.btn;
			
		};
		
		self.cancel = function(scope) {
			
			self.list(scope);
			
		};
		
		self.save = function(scope) {
			
			if (validate(scope)){ 
			growl.show('btn btn-danger',{from: 'top', amount: 55},'Please complete required fields.');
			return;
			}
		
			$http({
			  method: 'POST',
			  url: 'handlers/groups/save.php',
			  data: {group: scope.group, privileges: scope.privileges}
			}).then(function mySucces(response) {
				
				if (scope.group.id == 0) {
					scope.group.id = response.data;
					growl.show('btn btn-success',{from: 'top', amount: 55},'Group Info successfully added.');
					}	else{
						growl.show('btn btn-success',{from: 'top', amount: 55},'Group Info successfully updated.');
					}
					mode(scope,scope.group);
				
			}, function myError(response) {
				 
			  // error
				
			});			
			
		};		
		
		self.delete = function(scope,row) {
			
		var onOk = function() {
			
			if (scope.$id > 2) scope = scope.$parent;			
			
			$http({
			  method: 'POST',
			  url: 'handlers/groups/delete.php',
			  data: {id: [row.id]}
			}).then(function mySucces(response) {

				self.list(scope);
				
				growl.show('btn btn-danger',{from: 'top', amount: 55},'Group Info successfully deleted.');
				
			}, function myError(response) {
				 
			  // error
				
			});

		};

		bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
			
		};
		
		function privileges(scope) {
			
			$http({
			  method: 'POST',
			  url: 'handlers/privileges.php',
			  data: {id: scope.group.id}
			}).then(function mySuccess(response) {
				
				scope.privileges = angular.copy(response.data);
				
			}, function myError(response) {
				
				//
				
			});				
			
		};		
		
	};
	
	return new app();
	
});