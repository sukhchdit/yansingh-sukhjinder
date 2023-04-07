import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { EConsentSignature } from '../../models/econsent/econsentsignature.model';

@Injectable()
export class EConsentSignatureService {
  private readonly _getEconsentSignatureURL: string = "api/EconsentSignature/GetEconsentSignature";
  private readonly _getAllEconsentSignatureURL: string = "api/EconsentSignature/GetAllEconsentSignature";
  private readonly _saveEconsentSignatureURL: string = "api/EconsentSignature/SaveEconsentSignature";
  private readonly _saveEconsentDocumentURL: string = "api/EconsentSignature/SaveEconsentDocument";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getEconsentSignatureURL + "?id=" + id;
    return this.endpoint.get<EConsentSignature>(url);
  }

  getAll() {
    return this.endpoint.get<EConsentSignature[]>(this._getAllEconsentSignatureURL);
  }

  save(econsentSignature: EConsentSignature) {
    if (econsentSignature.id <= 0 || econsentSignature.id == null || econsentSignature.id == undefined) {
      econsentSignature.createdBy = this.authService.organization.id;
    }
    econsentSignature.updatedBy = this.authService.organization.id;
    return this.endpoint.addupdate<EConsentSignature>(econsentSignature, this._saveEconsentSignatureURL);
  }

  saveEconsentDocument(fromDocumentId, toDocumentId) {
    const url = this._saveEconsentDocumentURL + "?fromDocumentId=" + fromDocumentId + "&toDocumentId=" + toDocumentId;
    return this.endpoint.get<boolean>(url);
  }
}
