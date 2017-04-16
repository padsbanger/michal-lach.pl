$(function(moment) {
  function calculateDuration(start, end, unit) {
    var start = moment(start);
    var end = moment(end || new Date());
    return end.diff(start, unit)
  }

  function generateDynamicDates() {
    var $gratka = $('.gratka'),
      $schibsted = $('.schibsted'),
      $epam = $('.epam'),
      $misys = $('.misys'),
      $pixlab = $('.pixlab'),
      $blueoceanmedia = $('.blueoceanmedia'),
      $pjwstk = $('.pjwstk');

    console.log($pjwstk.html())

    $gratka.html("<span>"+ calculateDuration('2012-05-01','2012-09-01', 'months') + "</span> months");
    $schibsted.html("<span>"+ calculateDuration('2016-06-01', null , 'months') + "</span> months");
    $epam.html("<span>"+ calculateDuration('2015-05-01', '2016-06-01' , 'months') + "</span> months");
    $pixlab.html("<span>"+ calculateDuration('2012-09-01', '2013-05-01' , 'months') + "</span> months");
    $blueoceanmedia.html("<span>"+ calculateDuration('2013-06-01', '2013-08-01' , 'months') + "</span> months");
    $misys.html("<span>"+ calculateDuration('2013-08-01', '2015-04-01' , 'months') + "</span> months");
    $pjwstk.html("<span>"+ calculateDuration('2009-09-01', '2013-02-01' , 'years') + "</span> years");

    console.log($pjwstk.html())
  }

  generateDynamicDates()
}(moment));
