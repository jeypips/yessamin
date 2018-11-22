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
			   url: 'handlers/users/list.php'
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
		
		function validate(scope) {
			
			var controls = scope.formHolder.user.$$controls;
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});

			return scope.formHolder.user.$invalid;
			
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
		
		self.add = function(scope,row) {
			
			bui.show();
			
			scope.views.list = false;
			
			groups(scope);
			
			mode(scope,row);
			
			$('#content').load('forms/user.html',function() {
				$timeout(function() {
					
					$compile($('#content')[0])(scope);
					
					if (row != null) {
						
						if (scope.$id > 2) scope = scope.$parent;
						$http({
						  method: 'POST',
						  url: 'handlers/users/view.php',
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
		
		self.save = function(scope) {

			if (validate(scope)) {
				growl.show('btn btn-danger',{from: 'top', amount: 55},'Some fields are required');				
				return;
			};

			$http({
			  method: 'POST',
			  url: 'handlers/users/save.php',
			  data: {user: scope.user}
			}).then(function success(response) {
				
				bui.hide();
				if (scope.user.id == 0) growl.show('btn btn-success',{from: 'top', amount: 55},'New user info successfully added');				
				else growl.show('btn btn-success',{from: 'top', amount: 55},'User Info successfully updated');				
				mode(scope,scope.user);		
				
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
		
		self.delete = function(scope,row) {
			
			var onOk = function() {
				
				if (scope.$id > 2) scope = scope.$parent;			
				
				$http({
				  method: 'POST',
				  url: 'handlers/users/delete.php',
				  data: {id: [row.id]}
				}).then(function mySucces(response) {

					self.list(scope);
					
					growl.show('btn btn-danger',{from: 'top', amount: 55},'User Info successfully deleted.');
					
				}, function myError(response) {
					 
				  // error
					
				});

			};

			bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
				
		};
		
		function groups(scope) {
			
			$http({
			  method: 'POST',
			  url: 'api/suggestions/groups.php'
			}).then(function mySuccess(response) {
				
				scope.groups = angular.copy(response.data);
				
			}, function myError(response) {
				
				//
				
			});				
			
		};	
		
	};
	
	return new app();
	
});