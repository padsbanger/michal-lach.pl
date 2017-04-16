(function(moment)  {
  function calculateDuration(start, end, unit) {
    var start = moment(start);
    var end = moment(end);

    return end.diff(start, unit, true)
  }

  function generateDynamicDates() {
    var $document = document
    var gratka = $document.querySelector('.gratka')

    gratka.innerHTML = "<span>"+ calculateDuration('2012-05-01','2012-09-01', 'months') + "</span> months";

    // console.log(gratka);
  }

  generateDynamicDates()
}(moment))
