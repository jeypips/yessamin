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

			scope.discount = {};
			scope.discount.id = 0;			
			
			scope.discounts = [];
			
		};

		self.list = function(scope) {
			
			bui.show();
			
			if (scope.$id > 2) scope = scope.$parent;			
			
			scope.views.list = true;			
			
			scope.discount = {};
			scope.discount.id = 0;						
			
			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;
			
			$http({
			  method: 'GET',
			   url: 'handlers/discounts/list.php'
			}).then(function success(response) {
				
				scope.discounts = angular.copy(response.data);
				scope.filterData = scope.discounts;
				scope.currentPage = scope.views.currentPage;
				
				bui.hide();
				
			}, function error(response) {
				
				bui.hide();

			});			
			
			$('#content').load('lists/discounts.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); }, 500);
			});			
			
		};
		
		function validate(scope) {
			
			var controls = scope.formHolder.discount.$$controls;
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});

			return scope.formHolder.discount.$invalid;
			
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
			
			var title = 'Add Discount Type';
			
			//save
			var onOk = function () {
				
				self.save(scope);
				
			};
			
			mode(scope,row);
		
			if (row != null) {
						
				if (scope.$id > 2) scope = scope.$parent;
				$http({
				  method: 'POST',
				  url: 'handlers/discounts/view.php',
				  data: {id: row.id}
				}).then(function success(response) {
					
					angular.copy(response.data, scope.discount);
					mode(scope,row);
					
					bui.hide();							
					
				}, function error(response) {
					
					bui.hide();				
					
				});
				
			} else {
				
				scope.discount = {};
				scope.discount.id = 0;
				
			};
			
			bui.hide();
			
			bootstrapModal.box3(scope,title,'dialogs/discount.html',onOk);
			
		};
		
		self.save = function(scope) {

			if (validate(scope)) {
				growl.show('btn btn-danger',{from: 'top', amount: 55},'Some fields are required');				
				return;
			};

			$http({
			  method: 'POST',
			  url: 'handlers/discounts/save.php',
			  data: {discount: scope.discount}
			}).then(function success(response) {
				
				if (scope.discount.id == 0) growl.show('btn btn-success',{from: 'top', amount: 55},'New discount info successfully added');				
				else growl.show('btn btn-success',{from: 'top', amount: 55},'Discount Info successfully updated');				
				
				self.list(scope);
				
				mode(scope,scope.discount);		
				
				bui.hide();
				
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
				  url: 'handlers/discounts/delete.php',
				  data: {id: [row.id]}
				}).then(function mySucces(response) {

					self.list(scope);
					
					growl.show('btn btn-danger',{from: 'top', amount: 55},'Discount Info successfully deleted.');
					
				}, function myError(response) {
					 
				  // error
					
				});

			};

			bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
				
		};

		
	};
	
	return new app();
	
});