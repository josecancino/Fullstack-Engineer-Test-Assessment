import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { SportsArticle } from '../entities/SportsArticle';

const sportsArticles = [
  {
    title: 'Champions League Final: Real Madrid Crowned Champions',
    content:
      "Real Madrid secured a 3–1 victory in a dominant Champions League final performance. The match was a masterclass in tactical discipline and clinical finishing. \n\nFrom the first whistle, Madrid controlled the tempo, neutralizing the opposition's high press with precise passing and intelligent movement. The breakthrough came in the 25th minute with a stunning volley that left the goalkeeper with no chance. \n\nThe second half saw more of the same, as Madrid's midfield trio dictated play. Despite a late consolation goal, the result was never really in doubt. This victory marks yet another chapter in the club's illustrious history in European competition.",
    createdAt: new Date('2024-05-20'),
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&q=80', // Soccer celebration
  },
  {
    title: 'NBA Playoffs: Lakers Survive Game 7 Thriller',
    content:
      'The Los Angeles Lakers edged out the Nuggets in a nail-biting Game 7 showdown that went down to the final buzzer. It was a game of runs, with both teams trading blows in a high-octane atmosphere. \n\nLeBron James led the way with a triple-double, controlling the game in the clutch moments. His vision and decision-making were the difference maker against a resilient Denver defense. \n\nThe final play was pure drama—a blocked shot followed by a fast-break dunk sealed the deal. The Lakers now advance to the Conference Finals, looking stronger than ever.',
    createdAt: new Date('2024-05-19'),
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
  },
  {
    title: 'Premier League: Arsenal Back on Top',
    content:
      "Arsenal moved back to first place after a decisive 4–1 win against Brighton. The Gunners played with flair and intensity, overwhelming their opponents from the start. \n\nSakai and Odegaard were instrumental, linking up beautifully in the final third. The first goal was a team effort involving 15 passes, showcasing Arteta's philosophy in full effect. \n\nWith only three games left in the season, the title race is heating up. Manchester City remains close behind, but Arsenal's destiny is now in their own hands.",
    createdAt: new Date('2024-05-18'),
    imageUrl: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=800&q=80',
  },
  {
    title: 'Formula 1: Verstappen Extends Championship Lead',
    content:
      "Max Verstappen dominated another Grand Prix weekend, taking pole position and the race win without ever looking threatened. The Red Bull car's pace was simply unreachable for the rest of the grid. \n\nFerrari and Mercedes battled for the scraps, with Hamilton securing a hard-fought podium. But the story of the day was once again the Dutchman's flawless driving. \n\nAs the season heads to Europe, questions are being asked about whether anyone can stop the Red Bull juggernaut this year.",
    createdAt: new Date('2024-05-17'),
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80', // Reliable Red Sports Car
  },
  {
    title: 'UFC 302: Stunning Knockout in Main Event (Broken Image Test)',
    content:
      "A shocking first-round knockout stole the show in UFC 302's main event. The underdog caught the champion with a perfect left hook just two minutes into the fight. \n\nThe crowd erupted as the referee waved off the contest. It was a reminder of how unpredictable and brutal this sport can be. \n\nPost-fight interviews hinted at an immediate rematch, but for now, we have a new champion in the lightweight division.",
    createdAt: new Date('2024-05-16'),
    imageUrl: 'https://images.unsplash.com/photo-invalid-url-for-testing-fallback', // BROKEN IMAGE INTENTIONALLY
  },
  {
    title: 'NHL Playoffs: Rangers Advance to Conference Finals',
    content:
      "The New York Rangers clinched the series with a 5–2 win in Game 6. The atmosphere at Madison Square Garden was electric as the home team delivered a commanding performance. \n\nKreider's hat-trick was the highlight, but the defensive solidity was equally impressive. They shut down the opposing power play completely. \n\nNow they wait for the winner of the Boston-Florida series, confident that they have what it takes to lift the Stanley Cup.",
    createdAt: new Date('2024-05-15'),
    imageUrl: 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?w=800&q=80',
  },
  {
    title: 'La Liga: Barcelona Drop Points in Title Race',
    content:
      "Barcelona's 1–1 draw against Valencia puts their title hopes in jeopardy. Despite dominating possession, Xavi's side struggled to break down a compact defense. \n\nLewandowski hit the post twice, summing up a frustrating evening for the Catalans. A late equalizer saved a point, but it feels like two points dropped. \n\nWith Real Madrid winning their match, the gap at the top has widened to five points with only a handful of games remaining.",
    createdAt: new Date('2024-05-14'),
    imageUrl: 'https://images.unsplash.com/photo-1626025437642-0b05076ca301?w=800&q=80',
  },
  {
    title: 'Tennis: Djokovic Returns Strong in Clay Season Opener',
    content:
      "Novak Djokovic looked sharp in his first clay match of the season, winning in straight sets. Any doubts about his fitness were quickly dispelled as he moved gracefully around the court. \n\nHis backhand down the line was particularly effective, creating numerous winners. The opponent had no answer to the Serb's consistency and depth. \n\nLooking ahead to Roland Garros, Djokovic appears to be peaking at exactly the right time.",
    createdAt: new Date('2024-05-13'),
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80', // Reliable Tennis
  },
  {
    title: 'Olympics 2024: New Security Measures Announced',
    content:
      'Paris has unveiled updated security plans ahead of the 2024 Summer Olympics. The measures include increased police presence, advanced surveillance technology, and strict access controls around venues. \n\nOfficials emphasized that safety is the top priority for athletes and spectators alike. However, some local groups have raised concerns about traffic disruptions. \n\nThe Opening Ceremony on the Seine remains the focal point of the security operation, presenting unique logistical challenges.',
    createdAt: new Date('2024-05-12'),
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80', // Athletics track
  },
  {
    title: 'MLS: Inter Miami Continue Winning Streak',
    content:
      "Inter Miami secured their sixth consecutive win with a dramatic late goal from Lionel Messi. The Argentine maestro curated a moment of magic in the 89th minute to break the deadlock. \n\nThe stadium in Fort Lauderdale was rocking as the team celebrated. This win cements their position at the top of the Eastern Conference. \n\nOpposing coaches are still struggling to find a way to contain Miami's potent attack.",
    createdAt: new Date('2024-05-11'),
    imageUrl: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80', // Generic Soccer
  },
  {
    title: 'MotoGP: Last-Lap Drama in Spain',
    content:
      'A bold overtake in the final corner sealed victory at the Spanish Grand Prix. The crowd held its breath as the two leaders rubbbed elbows in a daring maneuver...',
    createdAt: new Date('2024-05-10'),
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80',
  },
  {
    title: 'Boxing: Heavyweight Superfight Announced',
    content:
      'Two heavyweight champions have agreed to a long-awaited unification bout scheduled for later this year in Riyadh...',
    createdAt: new Date('2024-05-09'),
    imageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80',
  },
  {
    title: 'Cricket: India Clinch T20 Series',
    content:
      "India secured the T20 series after a stellar all-round performance in the final match. Kohli's 85 not out was the backbone of the innings...",
    createdAt: new Date('2024-05-08'),
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80&v=2', // Reliable stadium
  },
  {
    title: 'Rugby: All Blacks Dominate Opening Test',
    content:
      'New Zealand delivered a commanding performance in their first Test of the season, defeating France by 20 points...',
    createdAt: new Date('2024-05-07'),
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  },
  {
    title: 'Bundesliga: Bayern Win Seven-Goal Thriller',
    content:
      'Bayern Munich outlasted Dortmund in an explosive 4–3 match that showcased the best of German football...',
    createdAt: new Date('2024-05-06'),
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
  },
  {
    title: "Cycling: New Leader in Giro d'Italia",
    content:
      'A surprise breakaway rider claimed the pink jersey after Stage 9, upsetting the pre-race favorites on the mountain climb...',
    createdAt: new Date('2024-05-05'),
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80',
  },
  {
    title: 'NFL: Draft Class Shows Strong Quarterback Talent',
    content:
      "Analysts praise this year's draft as one of the deepest QB classes in a decade, with four quarterbacks taken in the top 10...",
    createdAt: new Date('2024-05-04'),
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&q=80',
  },
  {
    title: 'Baseball: Yankees Extend AL East Lead',
    content:
      'The New York Yankees won their fifth straight game behind dominant pitching from their ace...',
    createdAt: new Date('2024-05-03'),
    imageUrl: 'https://images.unsplash.com/photo-1508345228704-935cc84bf5e2?w=800&q=80',
  },
  {
    title: 'WNBA: Rookie Shines in Season Debut',
    content:
      'A standout rookie delivered 28 points in her first professional game, signaling the arrival of a new superstar...',
    createdAt: new Date('2024-05-02'),
    imageUrl: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=800&q=80&v=2', // Generic basketball
  },
  {
    title: 'Golf: Masters Preview Highlights Top Contenders',
    content:
      'Experts weigh in on which golfers are best positioned to win the green jacket at Augusta this year...',
    createdAt: new Date('2024-05-01'),
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80',
  },
];

async function seed() {
  try {
    if (process.env.NODE_ENV === 'production') {
      console.error(
        '❌ Error: Refusing to run seed script in production environment to prevent data loss.'
      );
      process.exit(1);
    }
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    const articleRepository = AppDataSource.getRepository(SportsArticle);
    await articleRepository.clear();
    console.log('🗑️  Cleared existing articles');

    const articles = sportsArticles.map((data) => articleRepository.create(data));
    await articleRepository.save(articles);
    console.log(`📝 Created ${articles.length} articles`);

    console.log(`\n✅ Successfully seeded ${sportsArticles.length} sports articles!`);

    const count = await articleRepository.count();
    console.log(`📊 Total articles in database: ${count}`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
    console.log('👋 Database connection closed');
  }
}

seed().catch((error) => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});
