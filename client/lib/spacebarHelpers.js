Template.registerHelper('debug', function (optionalValue) {
  if (typeof console !== "undefined" || typeof console.log !== "undefined") {
    console.log("Current Context");
    console.log("====================");
    console.log(this);
    if (optionalValue) {
      console.log("Value");
      console.log("====================");
      console.log(optionalValue);
    }

    return '';
  }

  // For IE8
  alert(this);

  if (optionalValue) {
    alert(optionalValue);
  }

  return '';
});

Template.registerHelper('constant', function (what) {
  return Meteor.App[what.toUpperCase()];
});

Template.registerHelper('plusOne', function (num) {
  return num + 1;
});


Template.registerHelper('truncate', function (str, len) {
  if (str.length > len) {
      var new_str = str.substr (0, len+1);

      while (new_str.length) {
          var ch = new_str.substr ( -1 );
          new_str = new_str.substr ( 0, -1 );

          if (ch == ' ') {
              break;
          }
      }

      if ( new_str == '' ) {
          new_str = str.substr ( 0, len );
      }

      return new Handlebars.SafeString ( new_str +'...' ); 
  }
  return str;
});
