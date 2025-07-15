// Game related types
export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image?: string;
  released?: string;
  rating?: number;
  metacritic?: number;
  platforms?: Platform[];
  genres?: Genre[];
  price?: number; // Added for cart functionality
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

// API Response types
export interface GameAPIResponse {
  data: Game[];
  next_page_url: string | null;
}

export interface FetchGamesResult {
  games: Game[];
  hasNextPage: boolean;
}

// Filter types
export interface FilterState {
  platforms: string[];
}

// Old filter state for backward compatibility during migration
export interface OldFilterState {
  Platform: string;
  SubPlatform: string;
}

// User/Auth types
export interface User {
  username: string;
  email?: string;
}

// Cart types
export interface CartItem extends Game {
  price: number;
  quantity?: number;
}

export interface CartContextType {
  cartItem: CartItem[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: number) => void;
  getTotalPrice: () => number;
}

// Props types for components
export interface GameInfoProps {
  game: Game;
}

export interface CartItemProps {
  item: CartItem;
}

export interface FilterProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
}

export interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

export interface LoginProps {
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}