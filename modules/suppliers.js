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

			scope.supplier = {};
			scope.supplier.id = 0;	
			
			scope.supplier.main_categories = [];
			scope.supplier.main_categories_dels = [];	

			scope.supplier.categories = [];
			scope.supplier.categories_dels = [];			
			
			scope.suppliers = [];
			
		};

		self.list = function(scope) {
			
			bui.show();
			
			if (scope.$id > 2) scope = scope.$parent;			
			
			scope.views.list = true;			
			
			scope.supplier = {};
			scope.supplier.id = 0;						
			
			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;
			
			$http({
			  method: 'GET',
			   url: 'handlers/suppliers/list.php'
			}).then(function success(response) {
				
				scope.suppliers = angular.copy(response.data);
				scope.filterData = scope.suppliers;
				scope.currentPage = scope.views.currentPage;
				
				bui.hide();
				
			}, function error(response) {
				
				bui.hide();

			});			
			
			$('#content').load('lists/suppliers.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); }, 500);
			});			
			
		};
		
		function validate(scope) {
			
			var controls = scope.formHolder.supplier.$$controls;
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});

			return scope.formHolder.supplier.$invalid;
			
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
			
			discounts(scope);

			scope.supplier.main_categories = [];
			scope.supplier.main_categories_dels = [];	

			scope.supplier.categories = [];
			scope.supplier.categories_dels = [];			
			
			bui.show();
			
			scope.views.list = false;
			
			mode(scope,row);
			
			$('#content').load('forms/supplier.html',function() {
				$timeout(function() {
					
					$compile($('#content')[0])(scope);
					
					if (row != null) {
						
						if (scope.$id > 2) scope = scope.$parent;
						$http({
						  method: 'POST',
						  url: 'handlers/suppliers/view.php',
						  data: {id: row.id}
						}).then(function success(response) {
							
							scope.supplier = angular.copy(response.data);
							bui.hide();							
							
						}, function error(response) {
							
							bui.hide();				
							
						});
						
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
			  url: 'handlers/suppliers/save.php',
			  data: {supplier: scope.supplier}
			}).then(function success(response) {
				
				bui.hide();
				if (scope.supplier.id == 0) growl.show('btn btn-success',{from: 'top', amount: 55},'New supplier info successfully added');				
				else growl.show('btn btn-success',{from: 'top', amount: 55},'Supplier Info successfully updated');				
				mode(scope,scope.supplier);		
				
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
				  url: 'handlers/suppliers/delete.php',
				  data: {id: [row.id]}
				}).then(function mySucces(response) {

					self.list(scope);
					
					growl.show('btn btn-danger',{from: 'top', amount: 55},'Supplier Info successfully deleted.');
					
				}, function myError(response) {
					 
				  // error
					
				});

			};

			bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
				
		};
		
		function discounts(scope) {
			
			$http({
			  method: 'POST',
			  url: 'api/suggestions/discounts.php'
			}).then(function mySuccess(response) {
				
				scope.discounts = angular.copy(response.data);
				
			}, function myError(response) {
				
				//
				
			});				
			
		};
		
		self.main_category = {
			
			add: function(scope) {

				scope.supplier.main_categories.push({
					id: 0,
					suppliers_id: 0,
					name: '',
					description: '',
					disabled: false
				});
				
			},	

			edit: function(scope,row) {

				row.disabled = !row.disabled;
				
			},			
			
			delete: function(scope,row) {
				
				if (row.id > 0) {
					scope.supplier.main_categories_dels.push(row.id);
				};
				
				var main_categories = scope.supplier.main_categories;
				var index = scope.supplier.main_categories.indexOf(row);
				scope.supplier.main_categories = [];			
				
				angular.forEach(main_categories, function(d,i) {
					
					if (index != i) {
						
						delete d['$$hashKey'];
						scope.supplier.main_categories.push(d);
						
					};
					
				});

			}			
			
		};
		
		self.category = {
			
			add: function(scope) {

				scope.supplier.categories.push({
					id: 0,
					suppliers_id: 0,
					name: '',
					description: '',
					disabled: false
				});
				
			},	

			edit: function(scope,row) {

				row.disabled = !row.disabled;
				
			},			
			
			delete: function(scope,row) {
				
				if (row.id > 0) {
					scope.supplier.categories_dels.push(row.id);
				};
				
				var categories = scope.supplier.categories;
				var index = scope.supplier.categories.indexOf(row);
				scope.supplier.categories = [];			
				
				angular.forEach(categories, function(d,i) {
					
					if (index != i) {
						
						delete d['$$hashKey'];
						scope.supplier.categories.push(d);
						
					};
					
				});

			}			
			
		};

	};
	
	return new app();
	
});