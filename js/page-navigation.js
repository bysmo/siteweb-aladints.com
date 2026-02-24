// ===================================
// Page Navigation Active State
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Determine page type from body data attribute
    const pageType = document.body.getAttribute('data-page-type');
    
    if (!pageType) return;
    
    // Get all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Map page types to their corresponding nav link
    const pageTypeMap = {
        'solution': '#solutions',
        'service': '#services'
    };
    
    // Find and activate the corresponding nav link
    const targetHash = pageTypeMap[pageType];
    
    if (targetHash) {
        navLinks.forEach(link => {
            // Remove active class from all links
            link.classList.remove('active');
            
            // Add active class to the matching link
            if (link.getAttribute('href').includes(targetHash)) {
                link.classList.add('active');
            }
        });
    }
});
