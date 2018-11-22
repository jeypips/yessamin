 <ul class="nav nav-tabs border-0 flex-column flex-lg-row">
  <li class="nav-item">
	<a href="index.html" class="nav-link <?=($page=="index")?' active':''?>"><i class="fe fe-home"></i> Home</a>
  </li>
  <li class="nav-item">
	<a href="javascript:void(0)" class="nav-link <?=($page=="groups")?' active':''?>" data-toggle="dropdown"><i class="fe fe-settings"></i> Maitenance</a>
	<div class="dropdown-menu dropdown-menu-arrow">
	  <a href="groups.html" class="dropdown-item <?=($page=="groups")?' active':''?>">Groups</a>
	  <a href="users.html" class="dropdown-item<?=($page=="users")?' active':''?>">Users</a>
	  <a href="discounts.html" class="dropdown-item<?=($page=="discounts")?' active':''?>">Discounts</a>
	  <a href="suppliers.html" class="dropdown-item<?=($page=="suppliers")?' active':''?>">Suppliers</a>
	</div>
  </li>
</ul>