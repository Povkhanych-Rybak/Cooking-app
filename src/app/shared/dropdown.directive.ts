import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

// export class DropdownDirective {
//   //allows to bind to prop of the el the dir sits on. Class is the array.
//   @HostBinding('class.open')isOpen = false;
//
//   @HostListener('click') toggleOpen() {
//       this.isOpen = !this.isOpen;
//   }
// }

// my appropach
export class DropdownDirective {
  constructor(private elementRef: ElementRef) {
}
  @HostListener('click') toggleOpen(eventData: Event) {
      this.elementRef.nativeElement.querySelector('ul.dropdown-menu').classList.toggle('visible');
  }
}
// creating a dir to toggle a class
//Ang gives us an access to the element the dir sits on

// plan : 1.cces to the el dir is on-  elementRef: ElementRef
// 2. Inform Ang that we have a new dir
// 3. Set a listener to the ev occured on the el (if needed)
// . use dir (indicate it near the el)
//
