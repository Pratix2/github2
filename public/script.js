(function() {
    var intFrameHeight = window.innerHeight;
       
    function testScroll(ev) {
        if (window.pageYOffset > intFrameHeight) {
            document.getElementsByClassName("header")[0].style.backgroundColor= '#647786';
        }
        else {
            document.getElementsByClassName('header')[0].style.backgroundColor= 'rgba(50, 65, 79, 0)';
        }
    }

    window.onscroll = testScroll


    function setTerm() {
        var term = document.getElementById("yelpTerm").value
    }
})()
