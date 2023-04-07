import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/account/services/auth.service';
import { UserRole } from 'src/app/models/account/user.model';
import { StudyUserInterfaceModel } from 'src/app/models/userrrolemanagement/studyuserinterface.model';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  selectedNavDropdown = 'none';
  selectedSubNavDropdown: 'none';
  isFullWidth = false;
  isResponsiveNav = false;
  public navigation: any;
  constructor(public authService: AuthService) {

  }

  ngOnInit(): void {
    var temp = this.getNavigationItems();
    if (temp && temp.length > 0 && temp[0].children && temp[0].children.length > 0)
      this.navigation = temp[0].children;
  }


  openNav() {
    this.isFullWidth = !this.isFullWidth;
    if (this.isFullWidth) {
      document.querySelector('body').classList.add('openmenu');
    } else {
      document.querySelector('body').classList.remove('openmenu');
    }

  }


  openNavDropdown(ele: any) {
    if (this.selectedNavDropdown == ele)
      this.selectedNavDropdown = 'none';
    else
      this.selectedNavDropdown = ele;
    this.selectedSubNavDropdown = 'none';
    //ele.stopPropagation();
    //var $this = $(ele.currentTarget);
    //$this.parent().parent().parent().addClass('activeLink');
    //$this.parent().parent().parent().siblings().removeClass('activeLink');
  }

  openSubNavDropdown(ele: any) {
    if (this.selectedSubNavDropdown == ele)
      this.selectedSubNavDropdown = 'none';
    else
      this.selectedSubNavDropdown = ele;
  }

  closeNavDropdown() {
    this.selectedNavDropdown = 'none';
  }

  openResponsiveNav() {
    /*$('#navbar').addClass('responsiveNavActive');*/
    this.isResponsiveNav = true;
    this.isFullWidth = true;
  }


  closeResponsiveNav() {
    //$('#navbar').removeClass('responsiveNavActive');
    this.selectedNavDropdown = 'none';
    this.isFullWidth = false;
    this.isResponsiveNav = false;
  }


  getNavigationItems() {
    if (this.authService && this.authService.isLoggedIn) {
      this.authService.mainLoadingIndicator = true;
      if (this.authService.currentUser.userRole.toString().toLowerCase() == "investigatoradmin")
        return this.getNonAdminNavigations();
      else if (this.authService.currentUser.userRole.toString().toLowerCase() == "sponsoradmin" || this.authService.currentUser.userRole.toString().toLowerCase() == "sponsoruser")
        return this.getNonAdminNavigations();
      else if (this.authService.currentUser.userRole.toString().toLowerCase() == "croadmin")
        return this.getNonAdminNavigations();
      else if (this.authService.currentUser.userRole.toString().toLowerCase() == "siteadmin")
        return this.getAdminNavigations();
      else if (this.authService.currentUser.userRole.toString().toLowerCase() == "siteuser")
        return this.getNonAdminNavigations();
      else if (this.authService.currentUser.userRole.toString().toLowerCase() == "investigatoruser")
        return this.getNonAdminNavigations();
      else if (this.authService.currentUser.userRole.toString().toLowerCase() == "sponsoruser")
        return this.getNonAdminNavigations();
      else if (this.authService.currentUser.userRole.toString().toLowerCase() == "superadmin")
        return this.getAdminNavigations();
      else if (this.authService.currentUser.userRole.toString().toLowerCase() == "superuser")
        return this.getAdminNavigations();
      else if (this.authService.currentUser.userRole.toString().toLowerCase() == "siteinvestigatoradmin" || this.authService.currentUser.userRole == UserRole.siteinvestigatoradmin) {
        if (this.authService.accountType == "site")
          return this.getAdminNavigations();
        else if (this.authService.accountType == "investigator")
          return this.getNonAdminNavigations();
        //return SiteInvestigatorAdminNavigationItems;
      }
      else if (this.authService.currentUser.userRole.toString().toLowerCase() == "monitoradmin")
        return this.getNonAdminNavigations();
      else if (this.authService.currentUser.userRole.toString().toLowerCase() == "monitoruser")
        return this.getNonAdminNavigations();
      else if (this.authService.currentUser.userRole.toString().toLowerCase() == "investigator")
        return this.getNonAdminNavigations();

      return this.getNonAdminNavigations();
    }
    this.authService.logout();
    return null;
  }


  getNonAdminNavigations() {
    var study = new StudyUserInterfaceModel();
    let dynamicInvestigatorNavigationItems = [
      {
        id: 'other',
        title: '',
        type: 'group',
        icon: 'icon-other',
        children: []
      }];

    if (this.authService.userStudies && this.authService.userStudies.length > 0) {

      if (this.authService.sponsorStudyInfoId && this.authService.sponsorStudyInfoId > 0) {
        var study1 = this.authService.userStudies.find(x => x.sponsorStudy != null && x.sponsorStudy.sponsorStudyInfoId != null && x.sponsorStudy.sponsorStudyInfoId == this.authService.sponsorStudyInfoId);
        if (study1) {
          study = study1;
        }
        if (!study)
          study = this.authService.userStudies[0];
      }
      else
        study = this.authService.userStudies[0];
      if (study && study.userInterfaces) {
        study.userInterfaces.forEach(ui => {
          if (ui && ui.isApplicable && ui.isNavMenuItem) {
            var parent = {
              id: ui.uiNavigationId,
              title: ui.uiTitle,
              type: ui.uiType,
              url: ui.uiUrl,
              classes: 'nav-item',
              icon: ui.uiIcon,
              children: []
            };
          }
          if (ui && ui.children) {
            ui.children.forEach(childUI => {
              if (childUI && childUI.isApplicable && childUI.isNavMenuItem) {
                var child = {
                  id: childUI.uiNavigationId,
                  title: childUI.uiTitle,
                  type: childUI.uiType,
                  url: childUI.uiUrl,
                  external: childUI.uiIsExternal,
                  children: []
                  //classes: 'nav-item',
                  //icon: childUI.uiIcon
                };

                if (childUI.children && childUI.children.length > 0) {
                  childUI.children.forEach(childsChildUI => {
                    if (childsChildUI && childsChildUI.isApplicable && childsChildUI.isNavMenuItem) {
                      var innerChild = {
                        id: childsChildUI.uiNavigationId,
                        title: childsChildUI.uiTitle,
                        type: childsChildUI.uiType,
                        url: childsChildUI.uiUrl,
                        external: childsChildUI.uiIsExternal,
                        //classes: 'nav-item',
                        //icon: childUI.uiIcon
                      };
                      child.children.push(innerChild);
                    }
                  });
                }

                if (parent && parent.children)
                  parent.children.push(child);
              }
            });
          }
          dynamicInvestigatorNavigationItems[0].children.push(parent);
        });
      }
    }
    this.authService.mainLoadingIndicator = false;
    return dynamicInvestigatorNavigationItems;
  }


  getAdminNavigations() {
    let flag = false;
    let dynamicSiteAdminNavigationItems = [
      {
        id: 'other',
        title: '',
        type: 'group',
        icon: 'icon-other',
        children: []
      }];

    if (this.authService.userStudies && this.authService.userStudies) {
      this.authService.userStudies.forEach(x => {
        if (!flag) {
          if (x.userInterfaces) {
            x.userInterfaces.forEach(ui => {
              if (ui.isApplicable && ui.isNavMenuItem) {
                var parent = {
                  id: ui.uiNavigationId,
                  title: ui.uiTitle,
                  type: ui.uiType,
                  url: ui.uiUrl,
                  classes: 'nav-item',
                  icon: ui.uiIcon,
                  children: []
                };
              }
              if (ui.children) {
                ui.children.forEach(childUI => {
                  if (childUI.isApplicable && childUI.isNavMenuItem) {
                    var child = {
                      id: childUI.uiNavigationId,
                      title: childUI.uiTitle,
                      type: childUI.uiType,
                      url: childUI.uiUrl,
                      external: childUI.uiIsExternal,
                      children: []
                      //classes: 'nav-item',
                      //icon: childUI.uiIcon
                    };

                    if (childUI.children && childUI.children.length > 0) {
                      childUI.children.forEach(childsChildUI => {
                        if (childsChildUI.isApplicable && childsChildUI.isNavMenuItem) {
                          var innerChild = {
                            id: childsChildUI.uiNavigationId,
                            title: childsChildUI.uiTitle,
                            type: childsChildUI.uiType,
                            url: childsChildUI.uiUrl,
                            external: childsChildUI.uiIsExternal,
                            //classes: 'nav-item',
                            //icon: childUI.uiIcon
                          };
                          if (child && child.children)
                            child.children.push(innerChild);
                        }
                      });
                    }
                    if (parent && parent.children)
                      parent.children.push(child);
                  }
                });
              }
              dynamicSiteAdminNavigationItems[0].children.push(parent);
            });
            flag = true;
          }
        }
      });
    }

    this.authService.mainLoadingIndicator = false;
    return dynamicSiteAdminNavigationItems;
  }
}
