import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { BaseEntity } from "../../models/baseentity.model";
import { ActionButtonViewModel } from "../../models/userrrolemanagement/actionbuttonview.model";
import { UserInterface } from "../../models/userrrolemanagement/userinterface.model";
import { UserInterfaceActionButtonRoleViewModel } from "../../viewmodels/userinterface/userInterfaceactionbuttonroleviewmodel";
import { AuthService } from "../account/auth.service";
import { EndPointService } from "../endpoint.service";

@Injectable()
export class UserInterfaceService {
  port = environment.apiport;

  private readonly _getURL: string = "api/UserInterface/Get";
  private readonly _getAllURL: string = "api/UserInterface/GetAll";
  private readonly _saveURL: string = "api/UserInterface/Save";
  private readonly _deleteURL: string = "api/UserInterface/Delete";

  private readonly _getActionButtonURL: string = "api/UserInterface/GetActionButton";
  private readonly _getAllActionButtonURL: string = "api/UserInterface/GetAllActionButton";
  private readonly _saveActionButtonURL: string = "api/UserInterface/SaveActionButton";
  private readonly _deleteActionButtonURL: string = "api/UserInterface/DeleteActionButton";

  private readonly _getUserInterfaceActionButtonURL: string = "api/UserInterface/GetUserInterfaceActionButton";
  private readonly _getAllUserInterfaceActionButtonURL: string = "api/UserInterface/GetAllUserInterfaceActionButton";
  private readonly _saveUserInterfaceActionButtonURL: string = "api/UserInterface/SaveUserInterfaceActionButton";
  private readonly _deleteUserInterfaceActionButtonURL: string = "api/UserInterface/DeleteUserInterfaceActionButton";

  private readonly _getUserInterfaceActionButtonListURL: string = "api/UserInterface/GetUserInterfaceActionButtonList";
  private readonly _saveUserInterfaceActionButtonRoleURL: string = "api/UserInterface/SaveUserInterfaceActionButtonRole";
  private readonly _bulkSaveUserInterfaceActionButtonRoleURL: string = "api/UserInterface/BulkSaveUserInterfaceActionButtonRole";
  private readonly _deleteUserInterfaceActionButtonRoleURL: string = "api/UserInterface/DeleteUserInterfaceActionButtonRole";
  private readonly _getUserInterfaceActionButtonRoleURL: string = "api/UserInterface/GetUserInterfaceActionButtonRole";
  private readonly _uploadUserInterfaceScreenshotFileURL: string = "api/UserInterface/UploadUserInterfaceScreenshot";
  private readonly _downloadUserInterfaceScreenshotURL: string = "api/UserInterface/DownloadUserInterfaceScreenshot";

  private readonly _getAllUserInterfacesWithButtonAndRolesURL: string = "api/UserInterface/GetAllUserInterfacesWithButtonAndRoles";
  private readonly _deleteUserInterfaceScreenshotURL: string = "api/UserInterface/DeleteUserInterfaceScreenshot";

  private readonly _getMenuListForSortingURL: string = "api/UserInterface/GetMenuListForSorting";
  private readonly _updateSortOrderURL: string = "api/UserInterface/UpdateSortOrder";

  constructor(private endpoint: EndPointService, private authService: AuthService, private httpClient: HttpClient) { }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<any>(url);
  }

  getAll() {
    return this.endpoint.get<any[]>(this._getAllURL);
  }

  GetAllUserInterfacesWithButtonAndRoles() {
    return this.endpoint.get<UserInterfaceActionButtonRoleViewModel[]>(this._getAllUserInterfacesWithButtonAndRolesURL);
  }

  save(userInterface: UserInterface) {
    this.setBaseModelData(userInterface);
    userInterface.userInterfaceUserRoles.forEach(uiRole => {
      this.setBaseModelData(uiRole);
    });
    return this.endpoint.addupdate<any>(userInterface, this._saveURL);
  }

  setBaseModelData(model) {
    if (!model.id) {
      model.createdBy = this.authService.currentUser.id;
      model.createdOn = new Date();
      model.status = true;
    }
    model.updatedBy = this.authService.currentUser.id;
    model.updatedOn = new Date();
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getUserInterfaceActionButton(id) {
    const url = this._getUserInterfaceActionButtonURL + "?id=" + id;
    return this.endpoint.get<any>(url);
  }

  getAllUserInterfaceActionButton(id) {
    const url = this._getAllUserInterfaceActionButtonURL + "?id=" + id;
    return this.endpoint.get<any[]>(url);
  }

  deleteUserInterfaceScreenshot(id) {
    const url = this._deleteUserInterfaceScreenshotURL + "?userInterfaceId=" + id;
    return this.endpoint.get<any>(url);
  }
  //_deleteUserInterfaceScreenshotURL

  saveUserInterfaceActionButton(userInterfaceActionButton: any) {
    this.setBaseModelData(userInterfaceActionButton);
    return this.endpoint.addupdate<any>(userInterfaceActionButton, this._saveUserInterfaceActionButtonURL);
  }

  deleteUserInterfaceActionButton(id: number) {
    const url = this._deleteUserInterfaceActionButtonURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getActionButton(id) {
    const url = this._getActionButtonURL + "?id=" + id;
    return this.endpoint.get<any>(url);
  }

  getAllActionButton() {
    return this.endpoint.get<any[]>(this._getAllActionButtonURL);
  }

  saveActionButton(actionButton: any) {
    this.setBaseModelData(actionButton);
    return this.endpoint.addupdate<any>(actionButton, this._saveActionButtonURL);
  }

  deleteActionButton(id: number) {
    const url = this._deleteActionButtonURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getUserInterfaceActionButtonList(id) {
    const url = this._getUserInterfaceActionButtonListURL + "?id=" + id;
    return this.endpoint.get<any[]>(url);
  }

  saveUserInterfaceActionButtonRole(userinterfaceActionButtonRole: any) {
    this.setBaseModelData(userinterfaceActionButtonRole);
    return this.endpoint.addupdate<any>(userinterfaceActionButtonRole, this._saveUserInterfaceActionButtonRoleURL);
  }

  bulksaveUserInterfaceActionButtonRole(userinterfaceActionButtonRole: any) {
    userinterfaceActionButtonRole.userInterfaceActionButtonRoles.forEach(x => {
      this.setBaseModelData(x);
    });

    return this.endpoint.addupdate<any>(userinterfaceActionButtonRole, this._bulkSaveUserInterfaceActionButtonRoleURL);
  }

  deleteUserInterfaceActionButtonRole(id: number) {
    const url = this._deleteUserInterfaceActionButtonRoleURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getUserInterfaceActionButtonRoles(userInterfaceRoleViewModel: any) {
    return this.endpoint.addupdate<any[]>(userInterfaceRoleViewModel, this._getUserInterfaceActionButtonRoleURL);
  }

  getUserInterfaceButtons(componentId: string): ActionButtonViewModel[] {
    var buttons: ActionButtonViewModel[] = [];
    if (this.authService.userStudies && this.authService.userStudies.length > 0) {
      this.authService.userStudies.forEach(x => {
        if (x && x.sponsorStudy && x.sponsorStudy.sponsorStudyInfoId == this.authService.sponsorStudyInfoId) {
          if (x && x.userInterfaces) {
            var userInterface = x.userInterfaces.find(y => y.uiNavigationId == componentId);
            if (userInterface && userInterface.uiId > 0) {
              buttons = userInterface.userInterfaceActionButtons;
            }
          }
        }
      });
    }
    return buttons;
  }

  getUserInterfaceButton(componentId: string, buttonName: string): boolean {
    var button = new ActionButtonViewModel();
    if (this.authService.userStudies[0].isAdmin) {
      return true;
    }
    if (this.authService.userStudies && this.authService.userStudies.length > 0) {
      this.authService.userStudies.forEach(x => {
        if (x && x.sponsorStudy && x.sponsorStudy.sponsorStudyInfoId == this.authService.sponsorStudyInfoId) {
          if (x && x.userInterfaces) {
            x.userInterfaces.forEach(ui => {
              if (ui && ui.uiId > 0 && ui.uiNavigationId.toLowerCase() == componentId.toLowerCase()) {
                button = ui.userInterfaceActionButtons.find(x => x.actionButtonName.toLowerCase() == buttonName.toLowerCase());
              }
              else {
                if (ui.children && ui.children.length > 0) {
                  ui.children.forEach(uiChild => {
                    if (uiChild && uiChild.uiId > 0 && uiChild.uiNavigationId.toLowerCase() == componentId.toLowerCase()) {
                      button = uiChild.userInterfaceActionButtons.find(x => x.actionButtonName.toLowerCase() == buttonName.toLowerCase());
                    }
                    else {
                      if (uiChild.children && uiChild.children.length > 0) {
                        uiChild.children.forEach(uiChildsChild => {
                          if (uiChildsChild && uiChildsChild.uiId > 0 && uiChildsChild.uiNavigationId.toLowerCase() == componentId.toLowerCase()) {
                            button = uiChildsChild.userInterfaceActionButtons.find(x => x.actionButtonName.toLowerCase() == buttonName.toLowerCase());
                          }
                          else {
                            if (uiChildsChild.children && uiChildsChild.children.length > 0) {
                              uiChildsChild.children.forEach(uiChildsSubChild => {
                                if (uiChildsSubChild && uiChildsSubChild.uiId > 0 && uiChildsSubChild.uiNavigationId.toLowerCase() == componentId.toLowerCase()) {
                                  button = uiChildsSubChild.userInterfaceActionButtons.find(x => x.actionButtonName.toLowerCase() == buttonName.toLowerCase());
                                }
                                
                              });
                            }
                          }
                        });
                      }
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
    return button && button.isApplicable;
  }

  uploadUserInterfaceScreenshotFile(formData) {
    const url = this.port + this._uploadUserInterfaceScreenshotFileURL;
    //return this.endpoint.uploadFile(formData, url);
    return this.httpClient.post<any>(url, formData, { headers: this.getHeaders(), reportProgress: true, observe: 'events' });
  }
  //DownloadUserInterfaceScreenshot

  //downloadDocument(obj: DocumentMaster) {
  //  //return this.http.post<T>(endpointUrl, obj, this.getRequestHeaders());
  //  const url = this.port + this._downloadDocumentFileURL;
  //  this.httpClient.post(url, obj, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
  //    saveAs(data, obj.displayFileName);
  //  }, err => {
  //    console.log(err);
  //  });
  //}

  //downloadCommunicationDocument(fileName, fileNameWithPath) {
  //  const url = this.port + this._downloadCommunicationDocumentFileURL + "?fileName=" + fileNameWithPath;
  //  this.httpClient.get(url, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
  //    saveAs(data, fileName);
  //  }, err => {
  //    console.log(err);
  //  });
  //}

  //downloadAllStudyDocuments(obj) {
  //  const url = this.port + this._downloadAllStudyDocumentsURL;
  //  this.httpClient.post(url, obj, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
  //    saveAs(data, obj.fileName);
  //  }, err => {
  //    console.log(err);
  //  });
  //}

  //getAllStudyDocumentsList(studyId) {
  //  const url = this._getAllStudyDocumentsListURL + "?studyId=" + studyId;
  //  return this.endpoint.get<string[]>(url);
  //}

  downloadUserInterfaceScreenshot(obj) {
    //return this.http.post<T>(endpointUrl, obj, this.getRequestHeaders());
    const url = this.port + this._downloadUserInterfaceScreenshotURL;
    return this.httpClient.post(url, obj, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") });//.subscribe(data => {
    //  console.log("Hello");
    //  console.log(data);
    //  return data;
    //}, err => {
    //    console.log(err);
    //    return null;
    //});
  }


  //downloadSiteInbodDocumentByteArrayForPDFViewer(siteId, fileName) {
  //  //return this.http.post<T>(endpointUrl, obj, this.getRequestHeaders());
  //  const url = this.port + this._downloadSiteInbodDocumentByteArrayForPDFViewerURL + '?siteId=' + siteId + "&fileName=" + fileName;
  //  return this.httpClient.get(url, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") });
  //}

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken,
    });
  }

  getMenuListForSorting(organizationType) {
    const url = this._getMenuListForSortingURL + "?organizationType=" + organizationType;
    return this.endpoint.get<any[]>(url);
  }

  updateSortOrder(id, oldSortOrder, newSortOrder, organizationType) {
    const url = this._updateSortOrderURL + "?id=" + id + "&oldSortOrder=" + oldSortOrder + "&newSortOrder=" + newSortOrder + "&organizationType=" + organizationType;
    return this.endpoint.get<boolean>(url);
  }

}
