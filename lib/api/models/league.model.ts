import type ID from "./_id.model";

const LeagueType = {
  MERCURY: "Mercury",
  VENUS: "Venus",
  EARTH: "Earth",
  MARS: "Mars",
  JUPITER: "Jupiter",
  SATURN: "Saturn",
};

type League = {
  name: string;
  icon: string;
  color: string;
  is_completed: boolean,
  is_unlocked: boolean,
  type: keyof typeof LeagueType;
} & ID;

export default League;
