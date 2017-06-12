(function() {
    var intFrameHeight = window.innerHeight;
       
    function testScroll(ev) {
        if (window.pageYOffset > intFrameHeight) {
            document.getElementsByClassName("header")[0].style.backgroundColor= 'rgba(50, 65, 79 , 1)';
        }
        else {
            document.getElementsByClassName('header')[0].style.backgroundColor= 'rgba(50, 65, 79, 0)';
        }
    }

    window.onscroll = testScroll
})()
