import "../common/scss/main.scss";

$(".custom-datepicker").datepicker({
  format: "mm/dd/yyyy",
  maxViewMode: 0,
  language: "ru",
  templates: {
    leftArrow: "<span></span>",
    rightArrow: "<span></span>"
  }
});

$(".custom-datepicker").datepicker("update", new Date());

$(".custom-datepicker__prev").on("click", () => {
  console.log("nnn");
});

$(".custom-datepicker")
  .datepicker()
  .on("changeMonth", function(e) {
    var currMonth = new Date(e.date);
    console.log(currMonth);
  });

$(".custom-datepicker")
  .datepicker()
  .on("changeYear", function(e) {
    var currYear = String(e.date);
    console.log(currYear);
  });
