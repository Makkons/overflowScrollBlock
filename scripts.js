document.addEventListener('DOMContentLoaded', function () {
   overflowScrollContent();

   function overflowScrollContent() {
      const section = document.querySelector('.section_descr-wrapper');

      if (!section) {
         return;
      }
      
      const elements = section.children;

      let maxHeight = 0;

      window.addEventListener('resize', function (enevt) {
         setMaxHeight();
      });

      setMaxHeight();

      function setMaxHeight() {
         maxHeight = getMaxHeight(elements, 2);
         section.style.maxHeight = `${maxHeight}px`;

         section.removeEventListener('wheel', scrollTop);
         section.addEventListener('wheel', scrollTop);
      }

      function scrollTop(event) {
         event.preventDefault();
         const offsetScroll = 0.2;
         const ratio = Math.abs(event.deltaY) > maxHeight ? maxHeight / Math.abs(event.deltaY) - offsetScroll : 1;

         this.scrollTop += event.deltaY * ratio;
      }

      function getMaxHeight(elements, num) {
         let maxHeight = 0;
         let isHeightMarginBottom = 0;

         for (let index = 0; index < num; index++) {
            let el = elements[index];

            if (!el) {
               return maxHeight;
            }

            el = typeof el === 'string' ? document.querySelector(el) : el;
            const styles = window.getComputedStyle(el);

            const marginTop = parseFloat(styles['marginTop']) > isHeightMarginBottom ? parseFloat(styles['marginTop']) : 0;
            const marginBottom = parseFloat(styles['marginBottom']);

            isHeightMarginBottom = marginBottom;

            const margin = marginTop + marginBottom;
            maxHeight += el.offsetHeight + margin;
         }

         return Math.ceil(maxHeight);
      }
   }
});
