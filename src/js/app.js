document.addEventListener("DOMContentLoaded", function(event) {
  //do work
  function calculateDuration(start, end, unit) {
    var start = moment(start);
    var end = moment(end || new Date());
    return end.diff(start, unit)
  }

  function generateDynamicDates() {
    var $document = document;
    var gratka = $document.querySelector('.gratka'),
      schibsted = $document.querySelector('.schibsted');
      epam = $document.querySelector('.epam');
      misys = $document.querySelector('.misys');
      pixlab = $document.querySelector('.pixlab');
      blueoceanmedia = $document.querySelector('.blueoceanmedia');
      pjwstk = $document.querySelector('.pjwstk');

    gratka.innerHTML = "<span>"+ calculateDuration('2012-05-01','2012-09-01', 'months') + "</span> months";
    schibsted.innerHTML = "<span>"+ calculateDuration('2016-06-01', null , 'months') + "</span> months";
    epam.innerHTML = "<span>"+ calculateDuration('2015-05-01', '2016-06-01' , 'months') + "</span> months";
    pixlab.innerHTML = "<span>"+ calculateDuration('2012-09-01', '2013-05-01' , 'months') + "</span> months";
    blueoceanmedia.innerHTML = "<span>"+ calculateDuration('2013-06-01', '2013-08-01' , 'months') + "</span> months";
    misys.innerHTML = "<span>"+ calculateDuration('2013-08-01', '2015-04-01' , 'months') + "</span> months";
    pjwstk.innerHTML = "<span>"+ calculateDuration('2009-09-01', '2013-02-01' , 'years') + "</span> years";
  }

  if(window.location.href.indexOf('work') !== -1) {
    generateDynamicDates();
  }
});
