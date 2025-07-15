import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import GameInfo from "../components/GameInfo";
import Filter from "../components/Filter";
import { fetchGames } from "../service/gameAPI";
import { Game, FilterState } from "@/types";
import "../css/HomePage.css";

// Default platforms list - updated to match API
const DEFAULT_PLATFORMS = [
  "PC",
  "PlayStation",
  "PlayStation 2",
  "PlayStation 3",
  "PlayStation 4",
  "PlayStation 5",
  "Xbox",
  "Xbox One",
  "Xbox 360",
  "Xbox Series S/X",
  "Nintendo Switch",
  "Nintendo 3DS",
  "Nintendo DS",
  "iOS",
  "Android",
  "macOS",
  "Linux",
  "PS Vita",
  "PSP",
  "Wii",
  "Wii U",
  "PC (Microsoft Windows)",
  "Web"
];

function HomePage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [visibleGames, setVisibleGames] = useState<Game[]>([]);
  const [filter, setFilter] = useState<FilterState>({ platforms: [...DEFAULT_PLATFORMS] });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadedPages = useRef<Set<number>>(new Set());

  // Initial load
  useEffect(() => {
    loadGames(1, true);
  }, []);

  const loadGames = async (page: number, reset: boolean = false): Promise<void> => {
    // Prevent loading the same page twice
    if (loadedPages.current.has(page) && !reset) return;
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const { games: newGames, hasNextPage } = await fetchGames(page);
      
      // Log the platform names to see what the API returns
      if (newGames.length > 0) {
        console.log("Sample game platforms:", newGames[0].platforms);
      }
      
      if (reset) {
        loadedPages.current.clear();
        loadedPages.current.add(page);
        setAllGames(newGames);
        setCurrentPage(2);
      } else {
        loadedPages.current.add(page);
        setAllGames(prev => {
          // Remove duplicates by creating a Map with game.id as key
          const gamesMap = new Map<number, Game>();
          
          // Add existing games
          prev.forEach(game => gamesMap.set(game.id, game));
          
          // Add new games (will overwrite if duplicate ID exists)
          newGames.forEach(game => gamesMap.set(game.id, game));
          
          // Convert back to array
          return Array.from(gamesMap.values());
        });
        setCurrentPage(prev => prev + 1);
      }
      
      setHasMore(hasNextPage);
    } catch (error) {
      console.error("Error loading games:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSearch = useCallback((
    gamesList: Game[], 
    searchText: string, 
    selectedPlatforms: string[]
  ): Game[] => {
    // Trim the search text to handle whitespace
    const trimmedSearch = searchText.trim();
    
    const filtered = gamesList.filter((game) => {
      // Search filter - if search is less than 3 characters, show all
      // If 3 or more characters, check if name starts with search
      const matchSearch = trimmedSearch.length < 3 || 
        game.name.toLowerCase().startsWith(trimmedSearch.toLowerCase());

      // Platform filter - check if game has any of the selected platforms
      const matchPlatform = (() => {
        // If no platforms selected, don't show any games
        if (selectedPlatforms.length === 0) return false;
        
        // Get game's platform names
        const gamePlatforms = game.platforms?.map(p => p.name) || [];
        
        // Check if any of the game's platforms match our selected platforms
        return gamePlatforms.some(gamePlatform => {
          // Normalize the platform name for comparison
          const normalizedGamePlatform = gamePlatform.toLowerCase().trim();
          
          return selectedPlatforms.some(selected => {
            const normalizedSelected = selected.toLowerCase().trim();
            
            // Exact match (case-insensitive)
            if (normalizedGamePlatform === normalizedSelected) return true;
            
            // PC variations
            if ((normalizedSelected === "pc" || normalizedSelected === "pc (microsoft windows)") && 
                (normalizedGamePlatform === "pc" || 
                 normalizedGamePlatform === "windows" || 
                 normalizedGamePlatform === "pc (microsoft windows)" ||
                 normalizedGamePlatform.includes("windows"))) {
              return true;
            }
            
            // Handle PlayStation variations
            if (normalizedSelected.includes("playstation")) {
              // Check for exact PlayStation versions
              if (normalizedSelected === "playstation" && normalizedGamePlatform === "playstation") return true;
              if (normalizedSelected === "playstation 2" && 
                  (normalizedGamePlatform === "playstation 2" || normalizedGamePlatform === "ps2")) return true;
              if (normalizedSelected === "playstation 3" && 
                  (normalizedGamePlatform === "playstation 3" || normalizedGamePlatform === "ps3")) return true;
              if (normalizedSelected === "playstation 4" && 
                  (normalizedGamePlatform === "playstation 4" || normalizedGamePlatform === "ps4")) return true;
              if (normalizedSelected === "playstation 5" && 
                  (normalizedGamePlatform === "playstation 5" || normalizedGamePlatform === "ps5")) return true;
            }
            
            // Handle Xbox variations
            if (normalizedSelected.includes("xbox")) {
              if (normalizedSelected === "xbox" && normalizedGamePlatform === "xbox") return true;
              if (normalizedSelected === "xbox one" && normalizedGamePlatform === "xbox one") return true;
              if (normalizedSelected === "xbox 360" && normalizedGamePlatform === "xbox 360") return true;
              if (normalizedSelected === "xbox series s/x" && 
                  (normalizedGamePlatform === "xbox series s/x" || 
                   normalizedGamePlatform === "xbox series s" || 
                   normalizedGamePlatform === "xbox series x")) return true;
            }
            
            // Handle Nintendo variations
            if (normalizedSelected === "nintendo switch" && normalizedGamePlatform === "nintendo switch") return true;
            if (normalizedSelected === "nintendo 3ds" && 
                (normalizedGamePlatform === "nintendo 3ds" || normalizedGamePlatform === "3ds")) return true;
            if (normalizedSelected === "nintendo ds" && 
                (normalizedGamePlatform === "nintendo ds" || normalizedGamePlatform === "ds")) return true;
            if (normalizedSelected === "wii" && normalizedGamePlatform === "wii") return true;
            if (normalizedSelected === "wii u" && normalizedGamePlatform === "wii u") return true;
            
            // Handle mobile platforms
            if (normalizedSelected === "ios" && 
                (normalizedGamePlatform === "ios" || normalizedGamePlatform === "iphone" || 
                 normalizedGamePlatform === "ipad")) return true;
            if (normalizedSelected === "android" && normalizedGamePlatform === "android") return true;
            
            // Handle other platforms
            if (normalizedSelected === "macos" && 
                (normalizedGamePlatform === "macos" || normalizedGamePlatform === "mac" || 
                 normalizedGamePlatform === "mac os")) return true;
            if (normalizedSelected === "linux" && normalizedGamePlatform === "linux") return true;
            if (normalizedSelected === "ps vita" && 
                (normalizedGamePlatform === "ps vita" || normalizedGamePlatform === "playstation vita" || 
                 normalizedGamePlatform === "vita")) return true;
            if (normalizedSelected === "psp" && 
                (normalizedGamePlatform === "psp" || normalizedGamePlatform === "playstation portable")) return true;
            
            return false;
          });
        });
      })();

      // Both conditions must be true
      return matchSearch && matchPlatform;
    });

    return filtered;
  }, []);

  // Apply filters whenever games, search, or filter changes
  useEffect(() => {
    console.log("Filtering games:", {
      totalGames: allGames.length,
      searchQuery,
      selectedPlatforms: filter.platforms.length,
      platforms: filter.platforms
    });
    
    const filtered = filterAndSearch(allGames, searchQuery, filter.platforms);
    console.log("Filtered results:", filtered.length);
    
    // Log sample game platforms if we have games but no filtered results
    if (allGames.length > 0 && filtered.length === 0) {
      console.log("Sample game platforms from API:", 
        allGames.slice(0, 3).map(g => ({
          name: g.name,
          platforms: g.platforms?.map(p => p.name)
        }))
      );
    }
    
    setVisibleGames(filtered);
  }, [searchQuery, filter, allGames, filterAndSearch]);

  // Intersection Observer callback for infinite scrolling
  const observer = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        // Only load more if there's no active search or we need more results
        if (searchQuery.trim().length < 3 || visibleGames.length < 10) {
          loadGames(currentPage);
        }
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [currentPage, hasMore, isLoading, visibleGames.length, searchQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <div className="home">
      <div className="navbar">
        <button className="user-profile">ICON</button>
        <Filter filter={filter} setFilter={setFilter} />
        <form onSubmit={handleSearch} className="search">
          <input
            type="text"
            placeholder="Search for Games (min. 3 letters)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            title="Enter at least 3 letters to search"
          />
          {searchQuery.length > 0 && searchQuery.length < 3 && (
            <span className="search-hint">Enter at least 3 letters to search</span>
          )}
        </form>
        <Link to="/cart">Cart</Link>
      </div>

      <div className="games-grid">
        {visibleGames.map((game, index) => {
          const isLast = index === visibleGames.length - 1;
          return (
            <div ref={isLast ? observer : null} key={game.id}>
              <GameInfo game={game} />
            </div>
          );
        })}
        {visibleGames.length === 0 && searchQuery.length >= 3 && (
          <div className="no-games">
            <h2>No games found</h2>
            <p>No games starting with "{searchQuery}" were found.</p>
          </div>
        )}
        {visibleGames.length === 0 && filter.platforms.length === 0 && (
          <div className="no-games">
            <h2>No platforms selected</h2>
            <p>Please select at least one platform to see games.</p>
          </div>
        )}
        {visibleGames.length === 0 && allGames.length > 0 && filter.platforms.length > 0 && searchQuery.length < 3 && (
          <div className="no-games">
            <h2>No games match the selected platforms</h2>
            <p>Try selecting different platforms or click "Select all"</p>
            <p className="debug-info">Games loaded: {allGames.length} | Platforms selected: {filter.platforms.length}</p>
          </div>
        )}
        {isLoading && (
          <div className="loading-more">
            <div className="spinner"></div>
            <p>Loading more games...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;