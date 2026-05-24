const PALETTE: ReadonlyArray<readonly [string, string]> = [
  ["#7B61FF", "#40D5FF"],
  ["#FF58A8", "#7B61FF"],
  ["#40D5FF", "#4CF0A8"],
  ["#FFAE58", "#FF58A8"],
  ["#9A5CFF", "#FF58A8"],
  ["#5CD8FF", "#7B61FF"],
  ["#FFC94D", "#FF7A59"],
  ["#4CF0C8", "#5CD8FF"],
  ["#B58CFF", "#FF8FB8"],
  ["#58D8FF", "#A8FFD3"],
];

export function avatarGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  const [from, to] = PALETTE[hash % PALETTE.length];
  return `linear-gradient(135deg, ${from}, ${to})`;
}

export function avatarInitial(name: string): string {
  const trimmed = name.trim();
  return trimmed ? trimmed[0].toUpperCase() : "?";
}
