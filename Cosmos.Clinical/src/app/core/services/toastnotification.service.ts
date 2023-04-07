import { Injectable } from '@angular/core';
import { ToastyService, ToastOptions } from 'ng2-toasty';

export enum ToastType { default, info, success, wait, error, warning}
export enum ToastTheme {default="default", material="material", bootstrap="bootstrap"}

@Injectable()
export class ToastNotificationService {
 
  constructor(private toastyService: ToastyService) {
  }

  showToast(title, message, type: ToastType = ToastType.success, toastTheme: ToastTheme = ToastTheme.material) {
      this.toastyService.clearAll();

    const toastOptions: ToastOptions = {
      title: title,
      msg: message,
      showClose: true,
      timeout: 6000,
      theme: toastTheme
    };

    switch (type) {
      case ToastType.default: this.toastyService.default(toastOptions); break;
      case ToastType.info: this.toastyService.info(toastOptions); break;
      case ToastType.success: this.toastyService.success(toastOptions); break;
      case ToastType.wait: this.toastyService.wait(toastOptions); break;
      case ToastType.error: this.toastyService.error(toastOptions); break;
      case ToastType.warning: this.toastyService.warning(toastOptions); break;
    }
  }

}
