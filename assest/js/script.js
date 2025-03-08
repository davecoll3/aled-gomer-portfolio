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


// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all the thumbnail images in the facilitating section
    const images = document.querySelectorAll('#facilitating-images .img-thumbnail');
    
    // Create modal elements
    const modalContainer = document.createElement('div');
    modalContainer.className = 'image-modal-container';
    modalContainer.innerHTML = `
        <div class="image-modal-overlay"></div>
        <div class="image-modal-content">
            <button class="image-modal-close">&times;</button>
            <button class="image-modal-prev">&lt;</button>
            <button class="image-modal-next">&gt;</button>
            <img class="image-modal-img" src="" alt="Modal Image">
        </div>
    `;
    document.body.appendChild(modalContainer);
    
    // Get modal elements
    const modal = document.querySelector('.image-modal-container');
    const modalImg = document.querySelector('.image-modal-img');
    const modalOverlay = document.querySelector('.image-modal-overlay');
    const modalContent = document.querySelector('.image-modal-content');
    const closeBtn = document.querySelector('.image-modal-close');
    const prevBtn = document.querySelector('.image-modal-prev');
    const nextBtn = document.querySelector('.image-modal-next');
    
    // Track current image index
    let currentIndex = 0;
    
    // Add click event listeners to all thumbnails
    images.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentIndex = index;
            openModal(img.src);
        });
    });
    
    // Open modal function
    function openModal(src) {
        modalImg.src = src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex].src;
    }
    
    // Navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex].src;
    }
    
    // Event listeners for modal controls
    closeBtn.addEventListener('click', closeModal);
    
    // Close when clicking the overlay (outside the image)
    modalContent.addEventListener('click', function(e) {
        // Only close if clicking on the content area but not on the image or buttons
        if (e.target === modalContent) {
            closeModal();
        }
    });
    
    // Also make sure the overlay closes the modal
    modalOverlay.addEventListener('click', closeModal);
    
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event from bubbling to content
        prevImage();
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event from bubbling to content
        nextImage();
    });
    
    // Prevent clicks on the image from closing the modal
    modalImg.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event from bubbling to content
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });
});