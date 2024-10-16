export default class OverflowScrollBlock {

   constructor(options) {
      const defaultOptions = {
         className: 'overflow-scroll-block',
         visibleElements: 2,
         offsetScroll: 0.2
      };
      this.options = Object.assign(defaultOptions, options);
      this.block = document.querySelector(`.${this.options.className}`);
      this.visibleElements = this.options.visibleElements;
      this.offsetScroll = this.options.offsetScroll;
      this.elements = this.block?.children;
      this.maxHeight = false;

      this.isCancel();
      this.setMaxHeight();
      this.events();
   }

   events() {
      if (this.block) {
         window.addEventListener('resize', this.setMaxHeight.bind(this));
         this.block.removeEventListener('wheel', this.scrollTop.bind(this));
         this.block.addEventListener('wheel', this.scrollTop.bind(this));
      }
   }
   setMaxHeight() {
      if (this.block) {
         this.maxHeight = this.getMaxHeight(this.elements, this.visibleElements);
         this.block.style.maxHeight = `${this.maxHeight}px`;
      }
   }
   getMaxHeight(elements, num) {
      if (this.block) {
         this.maxHeight = 0;
         let isHeightMarginBottom = 0;

         for (let index = 0; index < num; index++) {
            let el = elements[index];

            if (!el) {
               return this.maxHeight;
            }

            el = typeof el === 'string' ? document.querySelector(el) : el;
            const styles = window.getComputedStyle(el);

            const marginTop = parseFloat(styles['marginTop']) > isHeightMarginBottom ? parseFloat(styles['marginTop']) : 0;
            const marginBottom = parseFloat(styles['marginBottom']);

            isHeightMarginBottom = marginBottom;

            const margin = marginTop + marginBottom;
            this.maxHeight += el.offsetHeight + margin;
         }

         return Math.ceil(this.maxHeight);
      }
   }
   scrollTop(event) {
      if (this.block) {
         event.preventDefault();
         const ratio = Math.abs(event.deltaY) > this.maxHeight ?  this.maxHeight / Math.abs(event.deltaY) -  this.offsetScroll : 1;
         this.block.scrollTop += event.deltaY * ratio;
      }
   }
   isCancel() {
      if (!this.block) {
         console.log('Block not found');
         return;
      }
   }
}