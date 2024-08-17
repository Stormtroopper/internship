//jshint esversion:6
exports.getDate = function () {
    let today = new Date();
    let selectors = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", selectors);
    return day;
}