document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate hamburger to X
            const spans = mobileBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'translateY(6px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
            } else {
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }

    // 3. Showcase component is now inlined in the HTML.

    // 4. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 4. Auto-generate Table of Contents
    const contentArea = document.querySelector('.main-content');
    const tocList = document.querySelector('.toc-list');

    if (contentArea && tocList) {
        // Find all h2 and h3 in main content
        const headings = contentArea.querySelectorAll('h2, h3');
        if (headings.length > 0) {
            headings.forEach((heading, index) => {
                // Ensure heading has an ID
                if (!heading.id) {
                    heading.id = 'heading-' + index;
                }

                // Create link
                const link = document.createElement('a');
                link.href = '#' + heading.id;
                link.textContent = heading.textContent;

                // Indent h3
                if (heading.tagName.toLowerCase() === 'h3') {
                    link.style.paddingLeft = '1rem';
                }

                tocList.appendChild(link);
            });
        } else {
            // Hide sidebar if no headings
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) sidebar.style.display = 'none';
        }
    }
});
