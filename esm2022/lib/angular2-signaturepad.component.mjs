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
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SignaturePad, [{
        type: Component,
        args: [{
                template: '<canvas></canvas>',
                selector: 'signature-pad',
            }]
    }], () => [{ type: i0.ElementRef }], { options: [{
            type: Input
        }], onBeginEvent: [{
            type: Output
        }], onEndEvent: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SignaturePad, { className: "SignaturePad" }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItc2lnbmF0dXJlcGFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLXNpZ25hdHVyZXBhZC9zcmMvbGliL2FuZ3VsYXIyLXNpZ25hdHVyZXBhZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEtBQUssa0JBQWtCLE1BQU0sZUFBZSxDQUFDOztBQWNwRCxNQUFNLE9BQU8sWUFBWTtJQUNQLE9BQU8sQ0FBTTtJQUNaLFlBQVksQ0FBd0I7SUFDcEMsVUFBVSxDQUF3QjtJQUUzQyxZQUFZLENBQU07SUFDbEIsVUFBVSxDQUFhO0lBRS9CLFlBQVksVUFBc0I7UUFDaEMsUUFBUTtRQUNSLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRU0sa0JBQWtCO1FBQ3ZCLE1BQU0sTUFBTSxHQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUxRSxJQUFLLElBQUksQ0FBQyxPQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDdkMsTUFBTSxDQUFDLE1BQU0sR0FBSSxJQUFJLENBQUMsT0FBZSxDQUFDLFlBQVksQ0FBQztRQUNyRCxDQUFDO1FBRUQsSUFBSyxJQUFJLENBQUMsT0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxLQUFLLEdBQUksSUFBSSxDQUFDLE9BQWUsQ0FBQyxXQUFXLENBQUM7UUFDbkQsQ0FBQztRQUVELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU0sV0FBVztRQUNoQixNQUFNLE1BQU0sR0FBUSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUUsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVNLFlBQVk7UUFDakIsbUVBQW1FO1FBQ25FLHVEQUF1RDtRQUN2RCwrQ0FBK0M7UUFDL0MsTUFBTSxLQUFLLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sTUFBTSxHQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDMUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUM1QyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLG1EQUFtRDtJQUNoRixDQUFDO0lBRUQsc0RBQXNEO0lBQy9DLE1BQU07UUFDWCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN0QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDcEMsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUM7SUFDSCxDQUFDO0lBRUQsc0RBQXNEO0lBQy9DLFFBQVEsQ0FBQyxNQUF5QjtRQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFhLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsd0dBQXdHO0lBQ2pHLFNBQVMsQ0FBQyxTQUFrQixFQUFFLE9BQWdCO1FBQ25ELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMseUJBQXlCO0lBQ25GLENBQUM7SUFFRCxzQ0FBc0M7SUFDL0IsV0FBVyxDQUFDLE9BQWUsRUFBRSxVQUFlLEVBQUU7UUFDbkQscURBQXFEO1FBQ3JELElBQ0UsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBZSxDQUFDLFlBQVksRUFDbEMsQ0FBQztZQUNELE9BQU8sQ0FBQyxNQUFNLEdBQUksSUFBSSxDQUFDLE9BQWUsQ0FBQyxZQUFZLENBQUM7UUFDdEQsQ0FBQztRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFLLElBQUksQ0FBQyxPQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDMUUsT0FBTyxDQUFDLEtBQUssR0FBSSxJQUFJLENBQUMsT0FBZSxDQUFDLFdBQVcsQ0FBQztRQUNwRCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxvQkFBb0I7SUFDYixLQUFLO1FBQ1YsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsMkRBQTJEO0lBQ3BELE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELDZCQUE2QjtJQUN0QixHQUFHO1FBQ1IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsNkJBQTZCO0lBQ3RCLEVBQUU7UUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxnRUFBZ0U7SUFDekQsR0FBRyxDQUFDLE1BQWMsRUFBRSxLQUFVO1FBQ25DLFFBQVEsTUFBTSxFQUFFLENBQUM7WUFDZixLQUFLLGNBQWM7Z0JBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3hDLE1BQU07WUFDUixLQUFLLGFBQWE7Z0JBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ3ZDLE1BQU07WUFDUjtnQkFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN0QyxDQUFDO0lBQ0gsQ0FBQztJQUVELHdDQUF3QztJQUNqQyxPQUFPO1FBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELHNDQUFzQztJQUMvQixLQUFLO1FBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztzRUFsSVUsWUFBWTs2REFBWixZQUFZO1lBSFoseUJBQWlCOzs7aUZBR2pCLFlBQVk7Y0FKeEIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRSxlQUFlO2FBQzFCOzJDQUVpQixPQUFPO2tCQUF0QixLQUFLO1lBQ1csWUFBWTtrQkFBNUIsTUFBTTtZQUNVLFVBQVU7a0JBQTFCLE1BQU07O2tGQUhJLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgU2lnbmF0dXJlUGFkTmF0aXZlIGZyb20gJ3NpZ25hdHVyZV9wYWQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBvaW50IHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHRpbWU6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgUG9pbnRHcm91cCA9IEFycmF5PFBvaW50PjtcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlOiAnPGNhbnZhcz48L2NhbnZhcz4nLFxuICBzZWxlY3RvcjogJ3NpZ25hdHVyZS1wYWQnLFxufSlcbmV4cG9ydCBjbGFzcyBTaWduYXR1cmVQYWQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBwdWJsaWMgb3B0aW9uczogYW55O1xuICBAT3V0cHV0KCkgcHVibGljIG9uQmVnaW5FdmVudDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xuICBAT3V0cHV0KCkgcHVibGljIG9uRW5kRXZlbnQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcblxuICBwcml2YXRlIHNpZ25hdHVyZVBhZDogYW55O1xuICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIC8vIG5vIG9wXG4gICAgdGhpcy5lbGVtZW50UmVmID0gZWxlbWVudFJlZjtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnMgfHwge307XG4gICAgdGhpcy5vbkJlZ2luRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5vbkVuZEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBjYW52YXM6IGFueSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xuXG4gICAgaWYgKCh0aGlzLm9wdGlvbnMgYXMgYW55KS5jYW52YXNIZWlnaHQpIHtcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSAodGhpcy5vcHRpb25zIGFzIGFueSkuY2FudmFzSGVpZ2h0O1xuICAgIH1cblxuICAgIGlmICgodGhpcy5vcHRpb25zIGFzIGFueSkuY2FudmFzV2lkdGgpIHtcbiAgICAgIGNhbnZhcy53aWR0aCA9ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5jYW52YXNXaWR0aDtcbiAgICB9XG5cbiAgICB0aGlzLnNpZ25hdHVyZVBhZCA9IG5ldyBTaWduYXR1cmVQYWROYXRpdmUuZGVmYXVsdChjYW52YXMsIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQub25CZWdpbiA9IHRoaXMub25CZWdpbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2lnbmF0dXJlUGFkLm9uRW5kID0gdGhpcy5vbkVuZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IGNhbnZhczogYW55ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gMDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gMDtcbiAgfVxuXG4gIHB1YmxpYyByZXNpemVDYW52YXMoKTogdm9pZCB7XG4gICAgLy8gV2hlbiB6b29tZWQgb3V0IHRvIGxlc3MgdGhhbiAxMDAlLCBmb3Igc29tZSB2ZXJ5IHN0cmFuZ2UgcmVhc29uLFxuICAgIC8vIHNvbWUgYnJvd3NlcnMgcmVwb3J0IGRldmljZVBpeGVsUmF0aW8gYXMgbGVzcyB0aGFuIDFcbiAgICAvLyBhbmQgb25seSBwYXJ0IG9mIHRoZSBjYW52YXMgaXMgY2xlYXJlZCB0aGVuLlxuICAgIGNvbnN0IHJhdGlvOiBudW1iZXIgPSBNYXRoLm1heCh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxLCAxKTtcbiAgICBjb25zdCBjYW52YXM6IGFueSA9IHRoaXMuc2lnbmF0dXJlUGFkLmNhbnZhcztcbiAgICBjYW52YXMud2lkdGggPSBjYW52YXMub2Zmc2V0V2lkdGggKiByYXRpbztcbiAgICBjYW52YXMuaGVpZ2h0ID0gY2FudmFzLm9mZnNldEhlaWdodCAqIHJhdGlvO1xuICAgIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLnNjYWxlKHJhdGlvLCByYXRpbyk7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQuY2xlYXIoKTsgLy8gb3RoZXJ3aXNlIGlzRW1wdHkoKSBtaWdodCByZXR1cm4gaW5jb3JyZWN0IHZhbHVlXG4gIH1cblxuICAvLyBSZXR1cm5zIHNpZ25hdHVyZSBpbWFnZSBhcyBhbiBhcnJheSBvZiBwb2ludCBncm91cHNcbiAgcHVibGljIHRvRGF0YSgpOiBBcnJheTxQb2ludEdyb3VwPiB7XG4gICAgaWYgKHRoaXMuc2lnbmF0dXJlUGFkKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaWduYXR1cmVQYWQudG9EYXRhKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICAvLyBEcmF3cyBzaWduYXR1cmUgaW1hZ2UgZnJvbSBhbiBhcnJheSBvZiBwb2ludCBncm91cHNcbiAgcHVibGljIGZyb21EYXRhKHBvaW50czogQXJyYXk8UG9pbnRHcm91cD4pOiB2b2lkIHtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5mcm9tRGF0YShwb2ludHMgYXMgYW55KTtcbiAgfVxuXG4gIC8vIFJldHVybnMgc2lnbmF0dXJlIGltYWdlIGFzIGRhdGEgVVJMIChzZWUgaHR0cHM6Ly9tZG4uaW8vdG9kYXRhdXJsIGZvciB0aGUgbGlzdCBvZiBwb3NzaWJsZSBwYXJhbXRlcnMpXG4gIHB1YmxpYyB0b0RhdGFVUkwoaW1hZ2VUeXBlPzogc3RyaW5nLCBxdWFsaXR5PzogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zaWduYXR1cmVQYWQudG9EYXRhVVJMKGltYWdlVHlwZSwgcXVhbGl0eSk7IC8vIHNhdmUgaW1hZ2UgYXMgZGF0YSBVUkxcbiAgfVxuXG4gIC8vIERyYXdzIHNpZ25hdHVyZSBpbWFnZSBmcm9tIGRhdGEgVVJMXG4gIHB1YmxpYyBmcm9tRGF0YVVSTChkYXRhVVJMOiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KTogdm9pZCB7XG4gICAgLy8gc2V0IGRlZmF1bHQgaGVpZ2h0IGFuZCB3aWR0aCBvbiByZWFkIGRhdGEgZnJvbSBVUkxcbiAgICBpZiAoXG4gICAgICAhb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnaGVpZ2h0JykgJiZcbiAgICAgICh0aGlzLm9wdGlvbnMgYXMgYW55KS5jYW52YXNIZWlnaHRcbiAgICApIHtcbiAgICAgIG9wdGlvbnMuaGVpZ2h0ID0gKHRoaXMub3B0aW9ucyBhcyBhbnkpLmNhbnZhc0hlaWdodDtcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLmhhc093blByb3BlcnR5KCd3aWR0aCcpICYmICh0aGlzLm9wdGlvbnMgYXMgYW55KS5jYW52YXNXaWR0aCkge1xuICAgICAgb3B0aW9ucy53aWR0aCA9ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5jYW52YXNXaWR0aDtcbiAgICB9XG4gICAgdGhpcy5zaWduYXR1cmVQYWQuZnJvbURhdGFVUkwoZGF0YVVSTCwgb3B0aW9ucyk7XG4gIH1cblxuICAvLyBDbGVhcnMgdGhlIGNhbnZhc1xuICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQuY2xlYXIoKTtcbiAgfVxuXG4gIC8vIFJldHVybnMgdHJ1ZSBpZiBjYW52YXMgaXMgZW1wdHksIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlXG4gIHB1YmxpYyBpc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZVBhZC5pc0VtcHR5KCk7XG4gIH1cblxuICAvLyBVbmJpbmRzIGFsbCBldmVudCBoYW5kbGVyc1xuICBwdWJsaWMgb2ZmKCk6IHZvaWQge1xuICAgIHRoaXMuc2lnbmF0dXJlUGFkLm9mZigpO1xuICB9XG5cbiAgLy8gUmViaW5kcyBhbGwgZXZlbnQgaGFuZGxlcnNcbiAgcHVibGljIG9uKCk6IHZvaWQge1xuICAgIHRoaXMuc2lnbmF0dXJlUGFkLm9uKCk7XG4gIH1cblxuICAvLyBzZXQgYW4gb3B0aW9uIG9uIHRoZSBzaWduYXR1cmVQYWQgLSBlLmcuIHNldCgnbWluV2lkdGgnLCA1MCk7XG4gIHB1YmxpYyBzZXQob3B0aW9uOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBzd2l0Y2ggKG9wdGlvbikge1xuICAgICAgY2FzZSAnY2FudmFzSGVpZ2h0JzpcbiAgICAgICAgdGhpcy5zaWduYXR1cmVQYWQuY2FudmFzLmhlaWdodCA9IHZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NhbnZhc1dpZHRoJzpcbiAgICAgICAgdGhpcy5zaWduYXR1cmVQYWQuY2FudmFzLndpZHRoID0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5zaWduYXR1cmVQYWRbb3B0aW9uXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIG5vdGlmeSBzdWJzY3JpYmVycyBvbiBzaWduYXR1cmUgYmVnaW5cbiAgcHVibGljIG9uQmVnaW4oKTogdm9pZCB7XG4gICAgdGhpcy5vbkJlZ2luRXZlbnQuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIC8vIG5vdGlmeSBzdWJzY3JpYmVycyBvbiBzaWduYXR1cmUgZW5kXG4gIHB1YmxpYyBvbkVuZCgpOiB2b2lkIHtcbiAgICB0aGlzLm9uRW5kRXZlbnQuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBxdWVyeVBhZCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZVBhZDtcbiAgfVxufVxuIl19