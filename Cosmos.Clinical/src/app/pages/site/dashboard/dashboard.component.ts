import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  pageNumsList = ['20', '40', '60', '80', '100'];
  
  selectedStatus = 'Rejected';

  selectedPageNum = '20';
  statusList = ['Rejected', 'Completed'];
  statusDrop = false;
  pageNmsDrop = false;

  openDropdown (ele) {
    /*$scope[ele] = !$scope[ele];*/
  }

  closeDropdown (ele) {
    /*$scope[ele] = false;*/
  }

  selectDropdownValue(dd, model, value) {
    //$scope[dd] = false;
    //$scope[model] = value;
  }

  openNavDropdown (ele) {
    //ele.stopPropagation();
    //var $this = $(ele.currentTarget);
    //$this.parent().parent().parent().addClass('activeLink');
    //$this.parent().parent().parent().siblings().removeClass('activeLink');
  }

  openResponsiveNav () {
    //$('#navbar').addClass('responsiveNavActive');
    //$scope.isFullWidth = true;
  }

  closeResponsiveNav () {
    //$('#navbar').removeClass('responsiveNavActive');
    //$scope.isFullWidth = false;
  }
}
