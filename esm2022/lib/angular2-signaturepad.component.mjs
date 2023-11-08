import { Component, EventEmitter, Input, Output, } from '@angular/core';
import * as SignaturePadNative from 'signature_pad';
import * as i0 from "@angular/core";
export class SignaturePad {
    options;
    onBeginEvent;
    onEndEvent;
    signaturePad;
    elementRef;
    constructor(elementRef) {
        // no op
        this.elementRef = elementRef;
        this.options = this.options || {};
        this.onBeginEvent = new EventEmitter();
        this.onEndEvent = new EventEmitter();
    }
    ngAfterContentInit() {
        const canvas = this.elementRef.nativeElement.querySelector('canvas');
        if (this.options.canvasHeight) {
            canvas.height = this.options.canvasHeight;
        }
        if (this.options.canvasWidth) {
            canvas.width = this.options.canvasWidth;
        }
        this.signaturePad = new SignaturePadNative.default(canvas, this.options);
        this.signaturePad.onBegin = this.onBegin.bind(this);
        this.signaturePad.onEnd = this.onEnd.bind(this);
    }
    ngOnDestroy() {
        const canvas = this.elementRef.nativeElement.querySelector('canvas');
        canvas.width = 0;
        canvas.height = 0;
    }
    resizeCanvas() {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const canvas = this.signaturePad.canvas;
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
        this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
    }
    // Returns signature image as an array of point groups
    toData() {
        if (this.signaturePad) {
            return this.signaturePad.toData();
        }
        else {
            return [];
        }
    }
    // Draws signature image from an array of point groups
    fromData(points) {
        this.signaturePad.fromData(points);
    }
    // Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible paramters)
    toDataURL(imageType, quality) {
        return this.signaturePad.toDataURL(imageType, quality); // save image as data URL
    }
    // Draws signature image from data URL
    fromDataURL(dataURL, options = {}) {
        // set default height and width on read data from URL
        if (!options.hasOwnProperty('height') &&
            this.options.canvasHeight) {
            options.height = this.options.canvasHeight;
        }
        if (!options.hasOwnProperty('width') && this.options.canvasWidth) {
            options.width = this.options.canvasWidth;
        }
        this.signaturePad.fromDataURL(dataURL, options);
    }
    // Clears the canvas
    clear() {
        this.signaturePad.clear();
    }
    // Returns true if canvas is empty, otherwise returns false
    isEmpty() {
        return this.signaturePad.isEmpty();
    }
    // Unbinds all event handlers
    off() {
        this.signaturePad.off();
    }
    // Rebinds all event handlers
    on() {
        this.signaturePad.on();
    }
    // set an option on the signaturePad - e.g. set('minWidth', 50);
    set(option, value) {
        switch (option) {
            case 'canvasHeight':
                this.signaturePad.canvas.height = value;
                break;
            case 'canvasWidth':
                this.signaturePad.canvas.width = value;
                break;
            default:
                this.signaturePad[option] = value;
        }
    }
    // notify subscribers on signature begin
    onBegin() {
        this.onBeginEvent.emit(true);
    }
    // notify subscribers on signature end
    onEnd() {
        this.onEndEvent.emit(true);
    }
    queryPad() {
        return this.signaturePad;
    }
    static ɵfac = function SignaturePad_Factory(t) { return new (t || SignaturePad)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SignaturePad, selectors: [["signature-pad"]], inputs: { options: "options" }, outputs: { onBeginEvent: "onBeginEvent", onEndEvent: "onEndEvent" }, decls: 1, vars: 0, template: function SignaturePad_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "canvas");
        } }, encapsulation: 2 });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SignaturePad, [{
        type: Component,
        args: [{
                template: '<canvas></canvas>',
                selector: 'signature-pad',
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { options: [{
            type: Input
        }], onBeginEvent: [{
            type: Output
        }], onEndEvent: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItc2lnbmF0dXJlcGFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLXNpZ25hdHVyZXBhZC9zcmMvbGliL2FuZ3VsYXIyLXNpZ25hdHVyZXBhZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEtBQUssa0JBQWtCLE1BQU0sZUFBZSxDQUFDOztBQWNwRCxNQUFNLE9BQU8sWUFBWTtJQUNQLE9BQU8sQ0FBTTtJQUNaLFlBQVksQ0FBd0I7SUFDcEMsVUFBVSxDQUF3QjtJQUUzQyxZQUFZLENBQU07SUFDbEIsVUFBVSxDQUFhO0lBRS9CLFlBQVksVUFBc0I7UUFDaEMsUUFBUTtRQUNSLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRU0sa0JBQWtCO1FBQ3ZCLE1BQU0sTUFBTSxHQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUxRSxJQUFLLElBQUksQ0FBQyxPQUFlLENBQUMsWUFBWSxFQUFFO1lBQ3RDLE1BQU0sQ0FBQyxNQUFNLEdBQUksSUFBSSxDQUFDLE9BQWUsQ0FBQyxZQUFZLENBQUM7U0FDcEQ7UUFFRCxJQUFLLElBQUksQ0FBQyxPQUFlLENBQUMsV0FBVyxFQUFFO1lBQ3JDLE1BQU0sQ0FBQyxLQUFLLEdBQUksSUFBSSxDQUFDLE9BQWUs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b250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgKiBhcyBTaWduYXR1cmVQYWROYXRpdmUgZnJvbSAnc2lnbmF0dXJlX3BhZCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9pbnQge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgdGltZTogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBQb2ludEdyb3VwID0gQXJyYXk8UG9pbnQ+O1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGU6ICc8Y2FudmFzPjwvY2FudmFzPicsXG4gIHNlbGVjdG9yOiAnc2lnbmF0dXJlLXBhZCcsXG59KVxuZXhwb3J0IGNsYXNzIFNpZ25hdHVyZVBhZCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHB1YmxpYyBvcHRpb25zOiBhbnk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25CZWdpbkV2ZW50OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25FbmRFdmVudDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xuXG4gIHByaXZhdGUgc2lnbmF0dXJlUGFkOiBhbnk7XG4gIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgLy8gbm8gb3BcbiAgICB0aGlzLmVsZW1lbnRSZWYgPSBlbGVtZW50UmVmO1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLm9uQmVnaW5FdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLm9uRW5kRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNhbnZhczogYW55ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XG5cbiAgICBpZiAoKHRoaXMub3B0aW9ucyBhcyBhbnkpLmNhbnZhc0hlaWdodCkge1xuICAgICAgY2FudmFzLmhlaWdodCA9ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5jYW52YXNIZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKCh0aGlzLm9wdGlvbnMgYXMgYW55KS5jYW52YXNXaWR0aCkge1xuICAgICAgY2FudmFzLndpZHRoID0gKHRoaXMub3B0aW9ucyBhcyBhbnkpLmNhbnZhc1dpZHRoO1xuICAgIH1cblxuICAgIHRoaXMuc2lnbmF0dXJlUGFkID0gbmV3IFNpZ25hdHVyZVBhZE5hdGl2ZS5kZWZhdWx0KGNhbnZhcywgdGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5vbkJlZ2luID0gdGhpcy5vbkJlZ2luLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQub25FbmQgPSB0aGlzLm9uRW5kLmJpbmQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY29uc3QgY2FudmFzOiBhbnkgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSAwO1xuICAgIGNhbnZhcy5oZWlnaHQgPSAwO1xuICB9XG5cbiAgcHVibGljIHJlc2l6ZUNhbnZhcygpOiB2b2lkIHtcbiAgICAvLyBXaGVuIHpvb21lZCBvdXQgdG8gbGVzcyB0aGFuIDEwMCUsIGZvciBzb21lIHZlcnkgc3RyYW5nZSByZWFzb24sXG4gICAgLy8gc29tZSBicm93c2VycyByZXBvcnQgZGV2aWNlUGl4ZWxSYXRpbyBhcyBsZXNzIHRoYW4gMVxuICAgIC8vIGFuZCBvbmx5IHBhcnQgb2YgdGhlIGNhbnZhcyBpcyBjbGVhcmVkIHRoZW4uXG4gICAgY29uc3QgcmF0aW86IG51bWJlciA9IE1hdGgubWF4KHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEsIDEpO1xuICAgIGNvbnN0IGNhbnZhczogYW55ID0gdGhpcy5zaWduYXR1cmVQYWQuY2FudmFzO1xuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy5vZmZzZXRXaWR0aCAqIHJhdGlvO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBjYW52YXMub2Zmc2V0SGVpZ2h0ICogcmF0aW87XG4gICAgY2FudmFzLmdldENvbnRleHQoJzJkJykuc2NhbGUocmF0aW8sIHJhdGlvKTtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5jbGVhcigpOyAvLyBvdGhlcndpc2UgaXNFbXB0eSgpIG1pZ2h0IHJldHVybiBpbmNvcnJlY3QgdmFsdWVcbiAgfVxuXG4gIC8vIFJldHVybnMgc2lnbmF0dXJlIGltYWdlIGFzIGFuIGFycmF5IG9mIHBvaW50IGdyb3Vwc1xuICBwdWJsaWMgdG9EYXRhKCk6IEFycmF5PFBvaW50R3JvdXA+IHtcbiAgICBpZiAodGhpcy5zaWduYXR1cmVQYWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZVBhZC50b0RhdGEoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIC8vIERyYXdzIHNpZ25hdHVyZSBpbWFnZSBmcm9tIGFuIGFycmF5IG9mIHBvaW50IGdyb3Vwc1xuICBwdWJsaWMgZnJvbURhdGEocG9pbnRzOiBBcnJheTxQb2ludEdyb3VwPik6IHZvaWQge1xuICAgIHRoaXMuc2lnbmF0dXJlUGFkLmZyb21EYXRhKHBvaW50cyBhcyBhbnkpO1xuICB9XG5cbiAgLy8gUmV0dXJucyBzaWduYXR1cmUgaW1hZ2UgYXMgZGF0YSBVUkwgKHNlZSBodHRwczovL21kbi5pby90b2RhdGF1cmwgZm9yIHRoZSBsaXN0IG9mIHBvc3NpYmxlIHBhcmFtdGVycylcbiAgcHVibGljIHRvRGF0YVVSTChpbWFnZVR5cGU/OiBzdHJpbmcsIHF1YWxpdHk/OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZVBhZC50b0RhdGFVUkwoaW1hZ2VUeXBlLCBxdWFsaXR5KTsgLy8gc2F2ZSBpbWFnZSBhcyBkYXRhIFVSTFxuICB9XG5cbiAgLy8gRHJhd3Mgc2lnbmF0dXJlIGltYWdlIGZyb20gZGF0YSBVUkxcbiAgcHVibGljIGZyb21EYXRhVVJMKGRhdGFVUkw6IHN0cmluZywgb3B0aW9uczogYW55ID0ge30pOiB2b2lkIHtcbiAgICAvLyBzZXQgZGVmYXVsdCBoZWlnaHQgYW5kIHdpZHRoIG9uIHJlYWQgZGF0YSBmcm9tIFVSTFxuICAgIGlmIChcbiAgICAgICFvcHRpb25zLmhhc093blByb3BlcnR5KCdoZWlnaHQnKSAmJlxuICAgICAgKHRoaXMub3B0aW9ucyBhcyBhbnkpLmNhbnZhc0hlaWdodFxuICAgICkge1xuICAgICAgb3B0aW9ucy5oZWlnaHQgPSAodGhpcy5vcHRpb25zIGFzIGFueSkuY2FudmFzSGVpZ2h0O1xuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3dpZHRoJykgJiYgKHRoaXMub3B0aW9ucyBhcyBhbnkpLmNhbnZhc1dpZHRoKSB7XG4gICAgICBvcHRpb25zLndpZHRoID0gKHRoaXMub3B0aW9ucyBhcyBhbnkpLmNhbnZhc1dpZHRoO1xuICAgIH1cbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5mcm9tRGF0YVVSTChkYXRhVVJMLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8vIENsZWFycyB0aGUgY2FudmFzXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5jbGVhcigpO1xuICB9XG5cbiAgLy8gUmV0dXJucyB0cnVlIGlmIGNhbnZhcyBpcyBlbXB0eSwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2VcbiAgcHVibGljIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbmF0dXJlUGFkLmlzRW1wdHkoKTtcbiAgfVxuXG4gIC8vIFVuYmluZHMgYWxsIGV2ZW50IGhhbmRsZXJzXG4gIHB1YmxpYyBvZmYoKTogdm9pZCB7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQub2ZmKCk7XG4gIH1cblxuICAvLyBSZWJpbmRzIGFsbCBldmVudCBoYW5kbGVyc1xuICBwdWJsaWMgb24oKTogdm9pZCB7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQub24oKTtcbiAgfVxuXG4gIC8vIHNldCBhbiBvcHRpb24gb24gdGhlIHNpZ25hdHVyZVBhZCAtIGUuZy4gc2V0KCdtaW5XaWR0aCcsIDUwKTtcbiAgcHVibGljIHNldChvcHRpb246IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHN3aXRjaCAob3B0aW9uKSB7XG4gICAgICBjYXNlICdjYW52YXNIZWlnaHQnOlxuICAgICAgICB0aGlzLnNpZ25hdHVyZVBhZC5jYW52YXMuaGVpZ2h0ID0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2FudmFzV2lkdGgnOlxuICAgICAgICB0aGlzLnNpZ25hdHVyZVBhZC5jYW52YXMud2lkdGggPSB2YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnNpZ25hdHVyZVBhZFtvcHRpb25dID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLy8gbm90aWZ5IHN1YnNjcmliZXJzIG9uIHNpZ25hdHVyZSBiZWdpblxuICBwdWJsaWMgb25CZWdpbigpOiB2b2lkIHtcbiAgICB0aGlzLm9uQmVnaW5FdmVudC5lbWl0KHRydWUpO1xuICB9XG5cbiAgLy8gbm90aWZ5IHN1YnNjcmliZXJzIG9uIHNpZ25hdHVyZSBlbmRcbiAgcHVibGljIG9uRW5kKCk6IHZvaWQge1xuICAgIHRoaXMub25FbmRFdmVudC5lbWl0KHRydWUpO1xuICB9XG5cbiAgcHVibGljIHF1ZXJ5UGFkKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbmF0dXJlUGFkO1xuICB9XG59XG4iXX0=