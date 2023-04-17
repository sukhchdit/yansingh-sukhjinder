import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

export enum ToastType { default, info, success, wait, error, warning }
export enum ToastTheme { default = "default", material = "material", bootstrap = "bootstrap" }

@Injectable()
export class ToastNotificationService {

  constructor(private toastyService: ToastrService) {
  }

  showToast(title, message, type: ToastType = ToastType.success, toastTheme: ToastTheme = ToastTheme.material) {
    this.toastyService.clear();

    const toastOptions: Partial<IndividualConfig> = {
      closeButton: true,
      timeOut: 6000
      // theme: toastTheme
    };

    switch (type) {
      case ToastType.default: this.toastyService.show(message, title, toastOptions); break;
      case ToastType.info: this.toastyService.info(message, title, toastOptions); break;
      case ToastType.success: this.toastyService.success(message, title); break;
      // case ToastType.wait: this.toastyService.wait(toastOptions); break;
      case ToastType.error: this.toastyService.error(message, title, toastOptions); break;
      case ToastType.warning: this.toastyService.warning(message, title, toastOptions); break;
    }
  }

}
