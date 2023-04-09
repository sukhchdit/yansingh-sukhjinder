import { PermissionValues } from './permission.model';
import { UserRole } from './user.model';


export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}


export interface AccessToken {
  nbf: number;
  exp: number;
  iss: string;
  aud: string | string[];
  client_id: string;
  sub: string;
  auth_time: number;
  idp: string;
  role: UserRole;
  permission: PermissionValues | PermissionValues[];
  name: string;
  email: string;
  phone_number: string;
  givenName: string;
  jobtitle: string;
  configuration: string;
  scope: string | string[];
  amr: string[];
  unique_name: number;
  given_name: string;  
  phone: string;
  logo: string;
  firstName: string;
  lastName: string;
  currency: string;
  timezone: string;
  organizationContactId: number;
  lastLoginDate: string;
  organizationContactRole: string;
  organizationContactRoleType: string;
}
