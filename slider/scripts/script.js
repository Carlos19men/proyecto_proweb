(() => {
    /**
     * Configuration object for slider settings
     */
    const CONFIG = {
        itemsPerSlide: 3,
        animationDuration: 300,
        apiUrl: 'https://wc-qualifications-api-production.up.railway.app/api/v1/leagues'
    };

    /**
     * Cache DOM elements for better performance
     */
    const elements = {
        track: document.querySelector('.slider-track'),
        grid: document.querySelector('.grid-container'),
        prevBtn: document.querySelector('.slider-button-prev'),
        nextBtn: document.querySelector('.slider-button-next'),
        showMoreBtn: document.querySelector('.show-more'),
        slider: document.querySelector('.slider')
    };

    /**
     * State management object
     */
    const state = {
        currentSlide: 0,
        isAnimating: false
    };

    /**
     * Updates the navigation buttons state based on current slide
     */
    const updateButtons = () => {
        const totalItems = elements.track.children.length;
        const totalSlides = Math.ceil(totalItems / CONFIG.itemsPerSlide) - 1;
        elements.prevBtn.disabled = state.currentSlide === 0;
        elements.nextBtn.disabled = state.currentSlide >= totalSlides;
    };

    /**
     * Moves the slider to a specific slide
     * @param {number} slideIndex - The index to move to
     */
    const moveToSlide = (slideIndex) => {
        if (state.isAnimating) return;
        state.isAnimating = true;
        state.currentSlide = slideIndex;

        const slideWidth = 100 / CONFIG.itemsPerSlide;
        elements.track.style.transform = `translateX(-${slideIndex * (slideWidth * CONFIG.itemsPerSlide)}%)`;

        setTimeout(() => {
            state.isAnimating = false;
            updateButtons();
        }, CONFIG.animationDuration);
    };

    /**
     * Navigates to league page with the specific league ID
     * @param {Object} league - The league object containing information
     */
    const navigateToLeague = (league) => {
        window.location.href = `../league/index.html?id=${league.id}`;
    };

    /**
     * Creates a slider or grid item
     * @param {Object} league - The league data
     * @param {boolean} isGrid - Whether to create a grid item
     * @returns {HTMLElement} The created item element
     */
    const createItem = (league, isGrid = false) => {
        const container = document.createElement('div');
        container.className = isGrid ? 'grid-item' : 'slider-item';

        const img = document.createElement('img');
        img.src = league.logo;
        img.alt = league.alias;
        img.loading = 'lazy';
        img.addEventListener('click', () => navigateToLeague(league));

        const title = document.createElement('div');
        title.className = isGrid ? 'grid-title' : 'slider-alias';
        title.textContent = league.alias;

        container.append(img, title);
        return container;
    };

    /**
     * Handles click on previous button
     */
    const handlePrevClick = () => {
        if (state.currentSlide > 0) {
            moveToSlide(state.currentSlide - 1);
        }
    };

    /**
     * Handles click on next button
     */
    const handleNextClick = () => {
        const totalItems = elements.track.children.length;
        const totalSlides = Math.ceil(totalItems / CONFIG.itemsPerSlide) - 1;
        if (state.currentSlide < totalSlides) {
            moveToSlide(state.currentSlide + 1);
        }
    };

    /**
     * Toggles between slider and grid views
     */
    window.toggleView = () => {
        const isShowingMore = elements.showMoreBtn.textContent === 'Mostrar más';
        elements.showMoreBtn.textContent = isShowingMore ? 'Mostrar menos' : 'Mostrar más';
        elements.slider.style.display = isShowingMore ? 'none' : 'flex';
        elements.grid.style.display = isShowingMore ? 'grid' : 'none';
    };

    /**
     * Initializes the slider
     */
    const init = async () => {
        try {
            // Fetch data from API
            const response = await fetch(CONFIG.apiUrl);
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            const sortedLeagues = data.leagues.sort((a, b) => a.alias.localeCompare(b.alias));

            // Create and append items
            const fragment = document.createDocumentFragment();
            const gridFragment = document.createDocumentFragment();

            sortedLeagues.forEach(league => {
                fragment.appendChild(createItem(league));
                gridFragment.appendChild(createItem(league, true));
            });

            elements.track.appendChild(fragment);
            elements.grid.appendChild(gridFragment);
            updateButtons();

            // Add event listeners
            elements.prevBtn.addEventListener('click', handlePrevClick);
            elements.nextBtn.addEventListener('click', handleNextClick);

        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    // Initialize the application
    init();
})();
