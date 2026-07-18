let currentTestimonialIndex = 1;
let isTransitioningTestimonial = false;
let activeDotIndex = 1;

/**
 * Calculates the horizontal translation offset based on the window viewport width.
 * @param {number} width - The current window inner width in pixels.
 * @returns {number} The calculated CSS translateX pixel offset value.
 */
function calculateTestimonialOffset(width) {
    if (width >= 769 && width <= 1023) {
        const positions = [80, -560, -1200]; 
        return positions[currentTestimonialIndex] || 0;
    }
    if (width >= 479 && width <= 768) {
        const positions = [70, -330, -730]; 
        return positions[currentTestimonialIndex] || 0;
    }
    if (width <= 478) {
        const positions = [0, -310, -620]; 
        return positions[currentTestimonialIndex] || 0;
    }
    return currentTestimonialIndex * -780;
}

/**
 * Parses and extracts layout padding and layout flex gap configurations.
 * @param {HTMLElement} wrapper - The carousel container viewport wrapper element.
 * @param {HTMLElement} belt - The layout flex slider inner belt element.
 * @param {HTMLElement} card - The single indicator testimonial element node.
 * @returns {{pad: number, gap: number}} Parsed geometric layout dimensions.
 */
function getLayoutDimensions(wrapper, belt, card) {
    const pad = parseFloat(window.getComputedStyle(wrapper).paddingLeft) || 0;
    let gap = parseFloat(window.getComputedStyle(belt).gap);
    if (!gap || isNaN(gap)) {
        gap = parseFloat(window.getComputedStyle(card).marginRight) || 16;
    }
    return { pad, gap };
}

/**
 * Updates UI classes targeting the focused item context and the indicators.
 * @param {NodeListOf<HTMLElement>} cards - List containing structural element nodes.
 */
function updateVisualActiveStates(cards) {
    cards.forEach((c, i) => c.classList.toggle('focused', i === currentTestimonialIndex));
    const dots = document.querySelectorAll('.dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === activeDotIndex));
}

/**
 * Re-calculates active positions and updates layouts of the slider container.
 */
function renderTestimonial() {
    const belt = document.getElementById('testimonial-belt');
    const wrapper = document.querySelector('.carousel-wrapper');
    const cards = document.querySelectorAll('.testimonial-card');
    if (!belt || !cards.length || !wrapper) return;

    const dimensions = getLayoutDimensions(wrapper, belt, cards[0]);
    const cOffset = dimensions.pad > 0 
        ? ((wrapper.offsetWidth - (dimensions.pad * 2)) / 2) - (cards[0].offsetWidth / 2) + dimensions.pad 
        : (wrapper.offsetWidth / 2) - (cards[0].offsetWidth / 2);
    
    const targetX = (currentTestimonialIndex * (cards[0].offsetWidth + dimensions.gap)) - cOffset;
    belt.style.transform = `translate3d(${-targetX}px, 0, 0)`;
    updateVisualActiveStates(cards);
}

/**
 * Calculates circular navigational dot index updates based on velocity vector.
 * @param {number} direction - Direction parameter offset delta value (-1 or 1).
 */
function updateActiveDotIndex(direction) {
    activeDotIndex += direction;
    if (activeDotIndex > 2) activeDotIndex = 0;
    if (activeDotIndex < 0) activeDotIndex = 2;
}

/**
 * Shifts layout items to the right to handle infinite forward movements.
 * @param {HTMLElement} belt - The layout flex slider inner belt element.
 */
function shiftCarouselForward(belt) {
    currentTestimonialIndex = 2;
    renderTestimonial();
    
    setTimeout(() => {
        belt.style.transition = 'none';
        belt.appendChild(belt.querySelectorAll('.testimonial-card')[0]);
        currentTestimonialIndex = 1;
        renderTestimonial();
        
        setTimeout(() => {
            belt.style.transition = 'transform 0.3s ease-out';
            isTransitioningTestimonial = false;
        }, 20);
    }, 300);
}

/**
 * Shifts layout items to the left to handle infinite backward movements.
 * @param {HTMLElement} belt - The layout flex slider inner belt element.
 * @param {NodeListOf<HTMLElement>} cards - List containing structural element nodes.
 */
function shiftCarouselBackward(belt, cards) {
    belt.style.transition = 'none';
    belt.insertBefore(cards[cards.length - 1], cards[0]);
    currentTestimonialIndex = 2;
    renderTestimonial();
    
    setTimeout(() => {
        belt.style.transition = 'transform 0.3s ease-out';
        currentTestimonialIndex = 1;
        renderTestimonial();
        setTimeout(() => { isTransitioningTestimonial = false; }, 300);
    }, 20);
}

/**
 * Triggers state shifting handling wrap-around structures cleanly.
 * @param {number} direction - Direction modifier integer (-1 or 1).
 */
function switchTestimonial(direction) {
    if (isTransitioningTestimonial) return;
    const belt = document.getElementById('testimonial-belt');
    const cards = document.querySelectorAll('.testimonial-card');
    if (!belt || !cards.length) return;
    
    isTransitioningTestimonial = true;
    updateActiveDotIndex(direction);

    if (direction === 1) {
        shiftCarouselForward(belt);
    } else if (direction === -1) {
        shiftCarouselBackward(belt, cards);
    }
}

/**
 * Initializes the testimonial carousel position safely after DOM content has loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
    const belt = document.getElementById('testimonial-belt');
    if (!belt) return;
    renderTestimonial();
    setTimeout(() => {
        renderTestimonial();
    }, 50);
});

window.addEventListener('DOMContentLoaded', () => {
    renderTestimonial();
});

window.addEventListener('resize', () => {
    renderTestimonial();
});