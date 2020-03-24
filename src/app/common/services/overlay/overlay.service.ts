import { Injectable } from "@angular/core";

import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";

import { MatSpinner } from "@angular/material/progress-spinner";

@Injectable({
  providedIn: "root"
})
export class OverlayService {
  private spinnerOverlay: OverlayRef = this.createSpinner();

  constructor(private overlay: Overlay) { }

  private createSpinner(): OverlayRef {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: "spinnerBackdrop",
      positionStrategy: this.overlay.position()
        .global()
        .centerVertically()
        .centerHorizontally()
    });
  }

  public showSpinner(): void {
    this.spinnerOverlay.attach(new ComponentPortal(MatSpinner));
  }

  public hideSpinner(): void {
    this.spinnerOverlay.detach();
  }
}
