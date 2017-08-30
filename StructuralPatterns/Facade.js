//Facade is a simple interface exposed publicly
//to hide the complexity of the
//underlying system

//It shields developer from the effects of change to the subsystem

// Example - jQuery's $(document).ready(..)

const $ = (function () {
  return {
    bindReady: function() {
      if (document.addEventListener) {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);

        // A fallback to window.onload, that will always work
        window.addEventListener('load', jQuery.ready, false);
      } else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', DOMContentLoaded);

        // A fallback to window.onload, that will always work
        window.addEventListener('load', jQuery.ready, false);
      }
    }
  }
})();