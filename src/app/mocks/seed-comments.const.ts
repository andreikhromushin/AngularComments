import { Comment } from "../core/models/comment.interface";
import { createId } from "../core/utils/id.util";

const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

interface Seed {
  readonly author: string;
  readonly body: string;
  readonly ago: number;
  readonly likes: number;
  readonly tag?: string;
  readonly parent?: string;
}

const SEEDS: readonly Seed[] = [
  {
    tag: "mira",
    author: "Mira Castellanos",
    ago: 2 * HOUR,
    likes: 12,
    body: "Read this on the train this morning and stared out the window for the rest of the ride. Hard to be mad at anything for at least an hour after.",
  },
  {
    tag: "jonas-reply-mira",
    parent: "mira",
    author: "Jonas Weber",
    ago: 90 * MIN,
    likes: 6,
    body: "The weather part broke me. I will not stop thinking about an alien on planet K2-18b stuck in traffic, also complaining about the weather.",
  },
  {
    tag: "amara-reply-mira",
    parent: "mira",
    author: "Amara Okafor",
    ago: 1 * HOUR,
    likes: 3,
    body: 'Yes. Every now and then a piece reminds you the bar for "special" should just be "alive at all."',
  },
  {
    tag: "lena",
    author: "Lena Park",
    ago: 5 * HOUR,
    likes: 4,
    body: "Forwarded this to a friend who's going through it. Cosmic perspective might be the cheapest and most underused form of therapy.",
  },
  {
    tag: "tomas",
    author: "Tomás Ribeiro",
    ago: 6 * HOUR,
    likes: 8,
    body: 'I want to push back gently. "Be grateful you exist" is a beautiful thought, but it doesn\'t pay rent, and it can feel a little hollow at 3 AM. Both things can be true.',
  },
  {
    tag: "yuki-reply-tomas",
    parent: "tomas",
    author: "Yuki Tanaka",
    ago: 4 * HOUR,
    likes: 5,
    body: 'Sure — but I read it less as "don\'t feel bad" and more as "remember the scale." That\'s something different, and for me, much kinder.',
  },
  {
    tag: "tomas-reply-yuki",
    parent: "yuki-reply-tomas",
    author: "Tomás Ribeiro",
    ago: 3 * HOUR,
    likes: 2,
    body: 'Fair. I was reading "enjoy it" as "cheer up" — you\'re right that it\'s closer to "remember it."',
  },
  {
    tag: "henrik",
    author: "Henrik Lindqvist",
    ago: 1 * DAY,
    likes: 9,
    body: "There's a Carl Sagan line about being made of star-stuff I keep almost-remembering. This essay made me look it up again. Worth the trip every time.",
  },
  {
    tag: "sofia",
    author: "Sofia Esposito",
    ago: 26 * HOUR,
    likes: 3,
    body: "The line about \"we'll almost certainly never meet\" is the loneliest sentence I've read this week. Also somehow the most romantic.",
  },
  {
    tag: "noah-reply-sofia",
    parent: "sofia",
    author: "Noah Bennett",
    ago: 20 * HOUR,
    likes: 4,
    body: 'Hard to think of a love letter with better odds than "sent across galaxies, never to be answered." Hope they get it eventually.',
  },
  {
    tag: "dimitri",
    author: "Dimitri Volkov",
    ago: 2 * DAY,
    likes: 2,
    body: "Cool perspective, but pretending we're \"lucky\" is a bit much. The universe didn't choose us. We're just here. Enjoying that is fine — owing thanks for it is strange.",
  },
  {
    tag: "anna",
    author: "Anna Sharma",
    ago: 3 * DAY,
    likes: 7,
    body: '"Briefly alive on a small blue planet" is going on a postcard I\'m sending to my future self. Thank you.',
  },
  {
    tag: "clara",
    author: "Clara Lefèvre",
    ago: 28 * MIN,
    likes: 1,
    body: "Read this five minutes after a terrible meeting and it absolutely fixed me. Going to look at the moon tonight, no notes.",
  },
];

export function createSeedComments(now: number = Date.now()): Comment[] {
  const idByTag = new Map<string, string>();

  return SEEDS.map((seed) => {
    const id = createId();
    if (seed.tag) {
      idByTag.set(seed.tag, id);
    }
    return {
      id,
      parentId: seed.parent ? (idByTag.get(seed.parent) ?? null) : null,
      author: seed.author,
      isGuest: false,
      body: seed.body,
      createdAt: now - seed.ago,
      likes: seed.likes,
      likedByMe: false,
    };
  });
}
