import { useLocation, useNavigate, Link } from "react-router-dom";
import { Game } from "@/types";
import "../css/DetailsPage.css";

interface LocationState {
  game: Game;
}

interface Screenshot {
  id: number;
  image_url: string;
}

interface Tag {
  id: number;
  name: string;
}

interface ExtendedGame extends Game {
  tags?: Tag[];
  screenshots?: Screenshot[];
}

function DetailsPage(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const game = state?.game as ExtendedGame | undefined;

  if (!game) {
    return (
      <div className="details-page">
        <Link to="/home" className="back-button">← Back to Games</Link>
        <p>No game data found.</p>
      </div>
    );
  }

  return (
    <div className="details-page">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <div className="general-info">
        <img src={game.background_image} alt={game.name} />
        <div className="game-tags">
          <h3 className="genres">Genres</h3>
          <ul>
            {game.genres?.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>

          <h3 className="tags">Tags</h3>
          <ul>
            {game.tags?.map((tag) => (
              <li key={tag.id}>{tag.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="more-images">
        <h3>More screenshots from the game:</h3>
        <div className="screenshots-wrapper">
          {game.screenshots?.map((shot) => (
            <img key={shot.id} src={shot.image_url} alt="Screenshot" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;