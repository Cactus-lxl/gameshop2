import { FilterProps } from "@/types";
import "../css/Filter.css";

// Define available platforms - updated to match common API platform names
const PLATFORMS = [
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

function Filter({ filter, setFilter }: FilterProps): JSX.Element {
  // Check if a platform is selected
  const isPlatformChecked = (platform: string): boolean => {
    return filter.platforms.includes(platform);
  };

  // Handle checkbox change
  const handleCheckboxChange = (platform: string): void => {
    setFilter(prev => {
      if (prev.platforms.includes(platform)) {
        // Remove platform if unchecked
        return {
          platforms: prev.platforms.filter(p => p !== platform)
        };
      } else {
        // Add platform if checked
        return {
          platforms: [...prev.platforms, platform]
        };
      }
    });
  };

  // Select/Deselect all platforms
  const handleSelectAll = (): void => {
    setFilter({ platforms: [...PLATFORMS] });
  };

  const handleDeselectAll = (): void => {
    setFilter({ platforms: [] });
  };

  return (
    <div className="filter-container">
      <button className="filter-toggle" type="button">
        <span className="filter-icon">⚙</span>
        Platform settings
      </button>

      <div className="filter-dropdown">
        <div className="filter-header">
          <h3>Select Platform</h3>
          <div className="filter-actions">
            <button type="button" onClick={handleSelectAll} className="select-all-btn">
              Select all
            </button>
            <button type="button" onClick={handleDeselectAll} className="deselect-all-btn">
              Cancel Select all
            </button>
          </div>
        </div>

        <div className="filter-content">
          <div className="platform-list">
            {PLATFORMS.map(platform => (
              <label key={platform} className="platform-checkbox">
                <input
                  type="checkbox"
                  checked={isPlatformChecked(platform)}
                  onChange={() => handleCheckboxChange(platform)}
                />
                <span className="platform-name">{platform}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;