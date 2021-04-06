class Navbar {

    navbarPosition = $("#searchbar").offset().top;

    constructor() {
        window.addEventListener('scroll', this.sticky);
        window.addEventListener('resize', this.sticky);
    }

    sticky = () => {
        if ($(window).scrollTop() > this.navbarPosition) {
            $("#navbar").addClass("sticky");
            if ($(window).width() > 950) {
                $('#search-input').css({
                    'margin-left': "240px",
                });
                $('#logo').css({
                    'opacity': '1'
                });
            } else {
                $('#search-input').css({
                    'margin-left': "0px",
                });
                $('#logo').css({
                    'opacity': '0',
                });
            }
            $('#logo').css({
                'position': 'fixed',
                'padding': '5px 15px',
                'align-items': 'center'
            });
            $("#hashtags-container").slideUp();
        } else {
            $("#navbar").removeClass("sticky");
            $('#search-input').css({
                'margin-left': "0px"
            });
            $('#logo').css({
                'position': 'relative',
                'padding': '10px 0',
                'align-items': 'initial',
                'opacity': '1'
            }).removeClass("position-fixed");
            $("#hashtags-container").delay(50).slideDown();
        }
    };
}

export default Navbar;