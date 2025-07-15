import axios from "axios";
import { GameAPIResponse, FetchGamesResult } from "@/types";

const BASE_URL = "https://jsonfakery.com/games/paginated";

export const fetchGames = async (page: number = 1): Promise<FetchGamesResult> => {
  try {
    const response = await axios.get<GameAPIResponse>(`${BASE_URL}?page=${page}`);
    return {
      games: response.data.data,
      hasNextPage: !!response.data.next_page_url
    };
  } catch (error) {
    console.error(`Error fetching games on page ${page}:`, error);
    return { games: [], hasNextPage: false };
  }
};