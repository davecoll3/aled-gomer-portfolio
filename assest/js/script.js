document.addEventListener('DOMContentLoaded', function() {
    // Get navbar elements
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Function to close navbar
    function closeNavbar() {
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    }
    
    // Close navbar when clicking on a nav link (for mobile)
    document.querySelectorAll('.navbar-nav .nav-link').forEach(function(navLink) {
        navLink.addEventListener('click', closeNavbar);
    });
    
    // Close navbar when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navbarToggler.contains(event.target) || 
                              navbarCollapse.contains(event.target);
        
        if (!isClickInside && navbarCollapse.classList.contains('show')) {
            closeNavbar();
        }
    });
});