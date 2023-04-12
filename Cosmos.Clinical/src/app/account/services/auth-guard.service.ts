
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  expectedRole: string[];

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //if (this.authService.sponsorStudyInfoId) {
    //  var study = this.authService.userStudies.find(x => x.sponsorStudy.sponsorStudyInfoId == this.authService.sponsorStudyInfoId);
    //  if (study) {
    //    var userInterface = study.userInterfaces.find(x => x.uiUrl && x.uiUrl.toLowerCase() == state.url.toLowerCase());
    //    if (userInterface) {
    let url: string = state.url;
    return this.checkLogin(url, route);
    //    }
    //    else {
    //      this.router.navigate(['']);
    //    }
    //  }
    //  else {
    //    this.router.navigate(['']);
    //  }
    //}
    //else {
    //  this.router.navigate(['']);
    //}

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    return this.checkLogin(url, route);
  }

  checkLogin(url: string, route): boolean {
    //this.expectedRole = route.data.expectedRole;
    //let userRole = null;
    //if (this.authService.currentUser)
    //  userRole = this.authService.currentUser.userRole.toString().toLowerCase();
    if (this.authService.isLoggedIn)
      return true;

    this.router.navigate(['']);

    return false;
  }
}
