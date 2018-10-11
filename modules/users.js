angular.module('app-module', ['bootstrap-modal','ui.bootstrap','block-ui','bootstrap-growl','form-validator','window-open-post']).factory('app', function($http,$timeout,$compile,bui,growl,validate,bootstrapModal,printPost) {

	function app() {
		
		var self = this;				

		self.data = function(scope) {

			scope.formHolder = {};
			
			scope.views = {};
			scope.views.currentPage = 1;

			scope.views.list = true;
			
			scope.btns = {
				ok: {disabled: false, label: 'Save'},
				cancel: {disabled: false, label: 'Cancel'}
			};

			scope.user = {};
			scope.user.id = 0;			
			
			scope.users = [];
			
		};

		self.list = function(scope) {
			
			bui.show();
			
			if (scope.$id > 2) scope = scope.$parent;			
			
			scope.views.list = true;			
			
			scope.user = {};
			scope.user.id = 0;						
			
			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;
			
			$http({
			  method: 'GET',
			   url: 'api/users/list'
			}).then(function success(response) {
				
				scope.users = angular.copy(response.data);
				scope.filterData = scope.users;
				scope.currentPage = scope.views.currentPage;
				
				bui.hide();
				
			}, function error(response) {
				
				bui.hide();

			});			
			
			$('#content').load('lists/users.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); }, 500);
			});			
			
		};
		
		function mode(scope,row) {
			
			if (row != null) {

				scope.btns = {
					ok: {disabled: true, label: 'Update'},
					cancel: {disabled: true, label: 'Close'}
				};				
			
			
			} else {
				
				scope.btns = {
					ok: {disabled: false, label: 'Save'},
					cancel: {disabled: false, label: 'Cancel'}
				};				
				
			};
			
		};
		
		self.add = function(scope,row){
			
			bui.show();
			
			scope.views.list = false;
			
			mode(scope,row);
			
			$('#content').load('forms/user.html',function() {
				$timeout(function() {
					
					$compile($('#content')[0])(scope);
					
					if (row != null) {
						
						if (scope.$id > 2) scope = scope.$parent;
						
						$http({
						  method: 'GET',
						  url: 'api/users/view/'+row.id,
						  data: {id: row.id}
						}).then(function success(response) {
							
							scope.user = angular.copy(response.data);
							bui.hide();							
							
						}, function error(response) {
							
							bui.hide();				
							
						});
						
					} else {
						
						scope.user = {};
						scope.user.id = 0;
						
					};
					
					bui.hide();
					
				}, 500);
			});	
			
		};
		
		self.save = function(scope,user) {
			
			if (validate.form(scope,'user')) {
				growl.show('danger',{from: 'top', amount: 55},'Some fields are required');				
				return;
			};
			
			var url = 'api/users/add';
			var method = 'POST';
			if (scope.user.id != 0) {
				url = 'api/users/update';
				method = 'PUT';
			};

			$http({
			  method: method,
			  url: url,
			  data: scope.user
			}).then(function success(response) {
				
				bui.hide();
				if (scope.user.id == 0) growl.show('success',{from: 'top', amount: 55},'User Info successfully added');				
				else growl.show('success',{from: 'top', amount: 55},'User Info successfully updated');				
				mode(scope,scope.user);
				// self.list(scope);								
				
			}, function error(response) {
				
				bui.hide();				
				
			});
			
		};
		
		self.cancel = function(scope){
			
			self.list(scope);
			
		};
		
		self.edit = function(scope){
			
			scope.btns.ok.disabled = !scope.btns.ok.disabled;
			
		};
		
		self.delete = function(scope, row) {
			
			var onOk = function() {
				
				$http({
					method: 'DELETE',
					url: 'api/users/delete/'+row.id
				}).then(function mySuccess(response) {
						
						growl.show('alert alert-danger no-border mb-2',{from: 'top', amount: 55},'User Info successfully deleted.');
						self.list(scope);
						
				}, function myError(response) {
			

				});

			};
			
			var onCancel = function() { };
			
			bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to Delete?',onOk,onCancel);
			
		};
		
		
		
	};
	
	return new app();
	
});