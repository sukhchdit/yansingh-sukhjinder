import { Injectable } from '@angular/core';
import { AuthService } from '../../../account/services/auth.service';
import { Role } from '../../../models/role.model';
import { EndPointService } from '../endpoint.service';


@Injectable()
export class RoleService {
  private readonly _getURL: string = "api/Role/Get";
  private readonly _getAllURL: string = "api/Role/GetAll";
  private readonly _getAllByOrganizationTypeURL: string = "api/Role/GetAllByOrganizationType";
  private readonly _getAllByRoleTypeURL: string = "api/Role/GetAllByRoleType";
  private readonly _getSiteRoleByNameURL: string = "api/Role/GetSiteRoleByName";

  //_getByDocumentTypeAndRoleIdURL
  private readonly _saveURL: string = "api/Role/Save";
  private readonly _deleteURL: string = "api/Role/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<Role>(url);
  }

  getAll() {
    return this.endpoint.get<Role[]>(this._getAllURL);
  }

  getAllByOrganizationType(organizationType) {
    const url = this._getAllByOrganizationTypeURL + "?organizationType=" + organizationType;
    return this.endpoint.get<Role[]>(url);
  }


  getAllByRoleType(roleTypeId) {
    const url = this._getAllByRoleTypeURL + "?roleTypeId=" + roleTypeId;
    return this.endpoint.get<Role[]>(url);
  }

  save(role: Role) {
    if (role.id <= 0)
      role.createdBy = this.authService.currentUser.id;
    role.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<Role>(role, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getSiteRoleByName(roleTypeName, roleName) {
    const url = this._getSiteRoleByNameURL + "?roleTypeName=" + roleTypeName + "&roleName=" + roleName;
    return this.endpoint.get<Role>(url);
  }

}
