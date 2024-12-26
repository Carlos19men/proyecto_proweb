// Configuration and Constants
function getLeagueIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('League ID from URL:', id);
    if (!id) {
        console.warn('No league ID found in URL, using default');
    }
    return id;
}

const CONFIG = {
    API_BASE_URL: 'https://wc-qualifications-api-production.up.railway.app/api/v1',
    LEAGUE_ID: getLeagueIdFromUrl() || 4,
    MATCHES_PER_PAGE: 5,
    DEBOUNCE_DELAY: 300,
    CACHE_DURATION: 300000, // 5 minutes
    REQUEST_TIMEOUT: 5000   // 5 seconds
};

console.log('Using League ID:', CONFIG.LEAGUE_ID);

// Application State
const state = {
    currentPage: 1,
    totalMatches: 0,
    loading: false,
    matchesCache: new Map(),
    countriesCache: null
};

// Utility Functions
const utils = {
    formatDate(date, time) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const dateObj = new Date(`${date} ${time || '00:00'}`);
        return `${dateObj.toLocaleDateString('es-ES', options)} ${time || ''}`;
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// API Related Classes
class APIError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'APIError';
        this.status = status;
    }
}

class APIService {
    static async fetchWithTimeout(url, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.REQUEST_TIMEOUT);

        try {
            console.log('Fetching URL:', url);
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });

            if (!response.ok) {
                console.log('Response status:', response.status);
                console.log('Response status text:', response.statusText);
                throw new APIError(`API request failed: ${response.status} ${response.statusText}`, response.status);
            }

            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    static async getLeagueInfo() {
        try {
            const url = `${CONFIG.API_BASE_URL}/leagues/${CONFIG.LEAGUE_ID}`;
            console.log('Fetching league info from:', url);
            const response = await this.fetchWithTimeout(url);
            console.log('League Info Response:', response);
            return response.league;
        } catch (error) {
            console.error('Error fetching league info:', error);
            throw error;
        }
    }

    static async getCountries() {
        if (state.countriesCache) {
            return state.countriesCache;
        }

        try {
            const url = `${CONFIG.API_BASE_URL}/countries`;
            console.log('Fetching countries from:', url);
            const data = await this.fetchWithTimeout(url);
            console.log('Countries data received:', data);

            const countriesMap = new Map(
                data.countries.map(country => [country.id.toString(), country])
            );

            state.countriesCache = countriesMap;
            return countriesMap;
        } catch (error) {
            console.error('Error fetching countries:', error);
            throw error;
        }
    }

    static async getMatches(filters) {
        const cacheKey = filters.toString();
        const cached = state.matchesCache.get(cacheKey);

        if (cached && Date.now() - cached.timestamp < CONFIG.CACHE_DURATION) {
            return cached.data;
        }

        try {
            // Using the correct endpoint structure from api_calls.txt
            const url = `${CONFIG.API_BASE_URL}/matches/${CONFIG.LEAGUE_ID}${filters ? '?' + filters : ''}`;
            console.log('Attempting to fetch matches from:', url);
            const data = await this.fetchWithTimeout(url);
            console.log('Matches data received:', data);

            state.matchesCache.set(cacheKey, {
                data,
                timestamp: Date.now()
            });

            return data;
        } catch (error) {
            console.error('Error in getMatches:', error);
            throw error;
        }
    }
}

class MatchFilters {
    constructor(filters = {}) {
        this.stage = filters.stage || '';
        this.status = filters.status || '';
        this.from = filters.from || '';
        this.to = filters.to || '';
    }

    toString() {
        const params = new URLSearchParams();
        Object.entries(this).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        return params.toString();
    }
}

// UI Components
class MatchRenderer {
    constructor() {
        this.template = document.getElementById('match-template');
        if (!this.template) {
            console.error('Match template not found in the DOM');
        }
    }

    renderMatch(match, countriesMap) {
        if (!this.template) {
            console.error('Cannot render match: template is missing');
            return document.createElement('div');
        }

        const clone = this.template.content.cloneNode(true);
        const matchItem = clone.querySelector('.match-item');

        const homeTeam = countriesMap.get(match.hometeam_id.toString());
        const awayTeam = countriesMap.get(match.awayteam_id.toString());

        console.log('Rendering match:', {
            matchId: match.id,
            homeTeam: homeTeam?.name?.es?.common,
            awayTeam: awayTeam?.name?.es?.common
        });

        // Match Info
        matchItem.querySelector('.match-date').textContent =
            utils.formatDate(match.date, match.time);
        matchItem.querySelector('.match-stage').textContent =
            `Stage: ${match.stage} - Round ${match.round}`;
        matchItem.querySelector('.match-stadium').textContent =
            match.stadium || 'TBD';
        matchItem.querySelector('.match-referee').textContent =
            `Referee: ${match.referee || 'TBD'}`;
        matchItem.querySelector('.match-status').textContent = match.status;

        // Teams
        this.setTeamInfo(matchItem, '.home-team', homeTeam, match.hometeam_score, match.hometeam_penalty_score);
        this.setTeamInfo(matchItem, '.away-team', awayTeam, match.awayteam_score, match.awayteam_penalty_score);

        // Cards
        if (match.cards?.length) {
            this.renderCards(matchItem, match.cards);
        }

        return matchItem;
    }

    setTeamInfo(container, selector, team, score, penaltyScore) {
        const teamElement = container.querySelector(selector);
        if (!teamElement) {
            console.error(`Team element not found: ${selector}`);
            return;
        }

        const flagImg = teamElement.querySelector('.team-flag');
        if (flagImg) {
            flagImg.src = team?.flags?.png || '';
            flagImg.alt = team?.name?.es?.common || 'Team';
        }

        const nameElement = teamElement.querySelector('.team-name');
        if (nameElement) {
            nameElement.textContent = team?.name?.es?.common || 'Team';
        }

        const scoreElement = teamElement.querySelector('.score');
        if (scoreElement) {
            scoreElement.textContent = `${score !== null ? score : '-'}${penaltyScore ? ` (${penaltyScore})` : ''}`;
        }
    }

    renderCards(container, cards) {
        const cardsContainer = container.querySelector('.match-cards');
        if (!cardsContainer) {
            console.error('Cards container not found');
            return;
        }

        if (!cards.length) return;

        cardsContainer.innerHTML = `
            <h4>Cards</h4>
            <div class="cards-list">
                ${cards.map(card =>
            `<div class="card-item">${card.player} - ${card.card} (${card.time}')</div>`
        ).join('')}
            </div>
        `;
    }
}

// Main Application Class
class MatchesApp {
    constructor() {
        console.log('Initializing MatchesApp');
        this.renderer = new MatchRenderer();
        this.setupEventListeners();
        this.initialize();
    }

    async initialize() {
        try {
            console.log('Starting initialization');
            await this.loadLeagueInfo();
            await this.loadMatches();
            console.log('Initialization complete');
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    setupEventListeners() {
        console.log('Setting up event listeners');
        const debouncedFilters = utils.debounce(() => {
            state.currentPage = 1;
            this.handleFilters();
        }, CONFIG.DEBOUNCE_DELAY);

        ['stage-filter', 'status-filter', 'from-date', 'to-date'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', debouncedFilters);
            } else {
                console.warn(`Filter element not found: ${id}`);
            }
        });

        const prevButton = document.getElementById('prev-page');
        const nextButton = document.getElementById('next-page');

        if (prevButton) {
            prevButton.addEventListener('click', () => this.changePage(-1));
        } else {
            console.warn('Previous page button not found');
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => this.changePage(1));
        } else {
            console.warn('Next page button not found');
        }

        window.addEventListener('unload', () => {
            state.matchesCache.clear();
            state.countriesCache = null;
        });
    }

    async loadLeagueInfo() {
        try {
            const leagueInfo = await APIService.getLeagueInfo();
            console.log('Loading league info:', leagueInfo);

            const leagueLogoElement = document.getElementById('league-logo');
            const leagueAliasElement = document.getElementById('league-alias');
            const qualificationProcessElement = document.getElementById('qualification-process');

            if (leagueLogoElement) {
                leagueLogoElement.src = leagueInfo.logo || '';
            } else {
                console.warn('League logo element not found');
            }

            if (leagueAliasElement) {
                leagueAliasElement.textContent = leagueInfo.alias || '';
            } else {
                console.warn('League alias element not found');
            }

            if (qualificationProcessElement) {
                qualificationProcessElement.textContent =
                    leagueInfo.qualification_process?.es?.join(' ') || '';
            } else {
                console.warn('Qualification process element not found');
            }

        } catch (error) {
            console.error('Error in loadLeagueInfo:', error);
            const leagueInfoElement = document.querySelector('.league-info');
            if (leagueInfoElement) {
                leagueInfoElement.innerHTML =
                    '<div class="error-message">Error loading league information</div>';
            }
        }
    }

    async loadMatches(filters = new MatchFilters()) {
        if (state.loading) {
            console.log('Already loading matches, skipping');
            return;
        }

        const elements = {
            matchesList: document.getElementById('matches-list'),
            filterWarning: document.getElementById('filter-warning'),
            paginationInfo: document.getElementById('pagination-info')
        };

        if (!elements.matchesList) {
            console.error('Matches list element not found');
            return;
        }

        try {
            state.loading = true;
            elements.matchesList.innerHTML = '<div class="loading">Loading matches...</div>';
            if (elements.filterWarning) {
                elements.filterWarning.hidden = true;
            }

            console.log('Fetching matches with filters:', filters.toString());
            const [countriesMap, matchesData] = await Promise.all([
                APIService.getCountries(),
                APIService.getMatches(filters)
            ]);

            this.renderMatches(matchesData, countriesMap, elements);

        } catch (error) {
            this.handleError(error, elements);
        } finally {
            state.loading = false;
        }
    }

    renderMatches(matchesData, countriesMap, elements) {
        const { matchesList, paginationInfo } = elements;
        console.log('Rendering matches:', matchesData);

        if (!matchesData.matches?.length) {
            matchesList.innerHTML = '<div class="error-message">No matches found</div>';
            if (paginationInfo) paginationInfo.textContent = '';
            this.updatePaginationButtons(0);
            return;
        }

        const sortedMatches = this.sortMatches(matchesData.matches);
        state.totalMatches = sortedMatches.length;

        const { currentMatches, totalPages } = this.paginateMatches(sortedMatches);

        const fragment = document.createDocumentFragment();
        currentMatches.forEach(match => {
            fragment.appendChild(this.renderer.renderMatch(match, countriesMap));
        });

        matchesList.innerHTML = '';
        matchesList.appendChild(fragment);

        if (paginationInfo) {
            paginationInfo.textContent =
                `Page ${state.currentPage} of ${totalPages} (${state.totalMatches} matches)`;
        }

        this.updatePaginationButtons(totalPages);
    }

    sortMatches(matches) {
        return matches.sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time || '00:00'}`);
            const dateB = new Date(`${b.date} ${b.time || '00:00'}`);
            return dateB - dateA;
        });
    }

    paginateMatches(matches) {
        const totalPages = Math.ceil(matches.length / CONFIG.MATCHES_PER_PAGE);
        const startIndex = (state.currentPage - 1) * CONFIG.MATCHES_PER_PAGE;
        const endIndex = Math.min(startIndex + CONFIG.MATCHES_PER_PAGE, matches.length);

        return {
            currentMatches: matches.slice(startIndex, endIndex),
            totalPages
        };
    }

    handleError(error, elements) {
        const { matchesList, paginationInfo } = elements;
        console.error('Error handling matches:', error);

        const errorMessage = error instanceof APIError && error.status === 404
            ? 'No matches found for the selected filters.'
            : 'Error loading matches. Please try again later.';

        if (matchesList) {
            matchesList.innerHTML = `<div class="error-message">${errorMessage}</div>`;
        }
        if (paginationInfo) {
            paginationInfo.textContent = '';
        }
        this.updatePaginationButtons(0);
    }

    updatePaginationButtons(totalPages) {
        const prevButton = document.getElementById('prev-page');
        const nextButton = document.getElementById('next-page');

        if (prevButton && nextButton) {
            prevButton.disabled = state.currentPage <= 1;
            nextButton.disabled = state.currentPage >= totalPages;
        }
    }

    async handleFilters() {
        const filters = new MatchFilters({
            stage: document.getElementById('stage-filter')?.value || '',
            status: document.getElementById('status-filter')?.value || '',
            from: document.getElementById('from-date')?.value || '',
            to: document.getElementById('to-date')?.value || ''
        });

        await this.loadMatches(filters);
    }

    async changePage(delta) {
        state.currentPage += delta;
        const filters = new MatchFilters({
            stage: document.getElementById('stage-filter')?.value || '',
            status: document.getElementById('status-filter')?.value || '',
            from: document.getElementById('from-date')?.value || '',
            to: document.getElementById('to-date')?.value || ''
        });

        await this.loadMatches(filters);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded, initializing application');
    new MatchesApp();
});

// Navigation function
window.goBack = function () {
    window.location.href = '../slider/index.html';
};
