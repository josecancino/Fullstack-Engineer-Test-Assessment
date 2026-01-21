import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { SportsArticle } from '../entities/SportsArticle';

const sportsArticles = [
    {
        title: 'Champions League Final: Real Madrid Crowned Champions',
        content: 'Real Madrid secured a 3–1 victory in a dominant Champions League final performance...',
        createdAt: new Date('2024-05-01'),
        imageUrl: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a',
    },
    {
        title: 'NBA Playoffs: Lakers Survive Game 7 Thriller',
        content: 'The Los Angeles Lakers edged out the Nuggets in a nail-biting Game 7 showdown...',
        createdAt: new Date('2024-05-02'),
        imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b',
    },
    {
        title: 'Premier League: Arsenal Back on Top',
        content: 'Arsenal moved back to first place after a decisive 4–1 win against Brighton...',
        createdAt: new Date('2024-05-03'),
        imageUrl: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf',
    },
    {
        title: 'Formula 1: Verstappen Extends Championship Lead',
        content: 'Max Verstappen dominated another Grand Prix weekend, taking pole and the win...',
        createdAt: new Date('2024-05-04'),
        imageUrl: 'https://images.unsplash.com/photo-1505738290762-01acc746b89c',
    },
    {
        title: 'UFC 302: Stunning Knockout in Main Event',
        content: 'A shocking first-round knockout stole the show in UFC 302\'s main event...',
        createdAt: new Date('2024-05-04'),
        imageUrl: 'https://images.unsplash.com/photo-1534158914592-062992fbe700',
    },
    {
        title: 'NHL Playoffs: Rangers Advance to Conference Finals',
        content: 'The New York Rangers clinched the series with a 5–2 win in Game 6...',
        createdAt: new Date('2024-05-05'),
        imageUrl: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd',
    },
    {
        title: 'La Liga: Barcelona Drop Points in Title Race',
        content: 'Barcelona\'s 1–1 draw against Valencia puts their title hopes in jeopardy...',
        createdAt: new Date('2024-05-06'),
        imageUrl: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d',
    },
    {
        title: 'Tennis: Djokovic Returns Strong in Clay Season Opener',
        content: 'Novak Djokovic looked sharp in his first clay match of the season...',
        createdAt: new Date('2024-05-06'),
        imageUrl: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721',
    },
    {
        title: 'Olympics 2024: New Security Measures Announced',
        content: 'Paris has unveiled updated security plans ahead of the 2024 Summer Olympics...',
        createdAt: new Date('2024-05-07'),
        imageUrl: 'https://images.unsplash.com/photo-1517649418965-ffb5f1b2e428',
    },
    {
        title: 'MLS: Inter Miami Continue Winning Streak',
        content: 'Inter Miami secured their sixth consecutive win with a dramatic late goal...',
        createdAt: new Date('2024-05-08'),
        imageUrl: 'https://images.unsplash.com/photo-1600059832674-91f3f2b3f0ed',
    },
    {
        title: 'MotoGP: Last-Lap Drama in Spain',
        content: 'A bold overtake in the final corner sealed victory at the Spanish Grand Prix...',
        createdAt: new Date('2024-05-08'),
        imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9891a6fff',
    },
    {
        title: 'Boxing: Heavyweight Superfight Announced',
        content: 'Two heavyweight champions have agreed to a long-awaited unification bout...',
        createdAt: new Date('2024-05-09'),
        imageUrl: 'https://images.unsplash.com/photo-1571008887538-14a8cd24cf6f',
    },
    {
        title: 'Cricket: India Clinch T20 Series',
        content: 'India secured the T20 series after a stellar all-round performance in the final match...',
        createdAt: new Date('2024-05-10'),
        imageUrl: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0',
    },
    {
        title: 'Rugby: All Blacks Dominate Opening Test',
        content: 'New Zealand delivered a commanding performance in their first Test of the season...',
        createdAt: new Date('2024-05-10'),
        imageUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2',
    },
    {
        title: 'Bundesliga: Bayern Win Seven-Goal Thriller',
        content: 'Bayern Munich outlasted Dortmund in an explosive 4–3 match...',
        createdAt: new Date('2024-05-11'),
        imageUrl: 'https://images.unsplash.com/photo-1517922302871-9fa67e51ed9f',
    },
    {
        title: 'Cycling: New Leader in Giro d\'Italia',
        content: 'A surprise breakaway rider claimed the pink jersey after Stage 9...',
        createdAt: new Date('2024-05-12'),
        imageUrl: 'https://images.unsplash.com/photo-1505842465776-3d90f616310d',
    },
    {
        title: 'NFL: Draft Class Shows Strong Quarterback Talent',
        content: 'Analysts praise this year\'s draft as one of the deepest QB classes in a decade...',
        createdAt: new Date('2024-05-12'),
        imageUrl: 'https://images.unsplash.com/photo-1518600506278-4e8ef466b810',
    },
    {
        title: 'Baseball: Yankees Extend AL East Lead',
        content: 'The New York Yankees won their fifth straight game behind dominant pitching...',
        createdAt: new Date('2024-05-13'),
        imageUrl: 'https://images.unsplash.com/photo-1518306727297-4c86cd9f1a3f',
    },
    {
        title: 'WNBA: Rookie Shines in Season Debut',
        content: 'A standout rookie delivered 28 points in her first professional game...',
        createdAt: new Date('2024-05-13'),
        imageUrl: 'https://images.unsplash.com/photo-1505840717128-6f202417f6e5',
    },
    {
        title: 'Golf: Masters Preview Highlights Top Contenders',
        content: 'Experts weigh in on which golfers are best positioned to win the green jacket...',
        createdAt: new Date('2024-05-14'),
        imageUrl: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde',
    },
    {
        title: 'Swimming: World Champion Sets New Record',
        content: 'A new world record was set during the 200m freestyle finals...',
        createdAt: new Date('2024-05-14'),
        imageUrl: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd4e',
    },
    {
        title: 'Volleyball: Brazil Defeats Italy in Five-Set Epic',
        content: 'Brazil outlasted Italy in a dramatic five-set battle in the Nations League...',
        createdAt: new Date('2024-05-15'),
        imageUrl: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d',
    },
    {
        title: 'Athletics: Sprinter Breaks Season Record',
        content: 'A rising star in the 100m dash posted the fastest time of the season...',
        createdAt: new Date('2024-05-15'),
        imageUrl: 'https://images.unsplash.com/photo-1502810190503-830027c1fe6c',
    },
    {
        title: 'Hockey: Maple Leafs Make Key Trade',
        content: 'Toronto acquired a top defender in a major trade ahead of the postseason...',
        createdAt: new Date('2024-05-16'),
        imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904',
    },
    {
        title: 'Fencing: Gold Medal Match Ends in Upset',
        content: 'A lower-ranked fencer stunned the favorite with a comeback victory...',
        createdAt: new Date('2024-05-16'),
        imageUrl: 'https://images.unsplash.com/photo-1589571739149-47ed80eae6ba',
    },
    {
        title: 'Esports: CS2 Major Sees Huge Upset',
        content: 'A top seed was eliminated early in one of the biggest surprises of the CS2 Major...',
        createdAt: new Date('2024-05-17'),
        imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8f43',
    },
    {
        title: 'Snooker: Veteran Reaches Final Again',
        content: 'A veteran legend advanced to yet another championship final after a tense semifinal...',
        createdAt: new Date('2024-05-17'),
        imageUrl: 'https://images.unsplash.com/photo-1604014232478-bf4ecfba0c11',
    },
    {
        title: 'Handball: Denmark Wins Championship',
        content: 'Denmark secured the title after a dominant showing in the final match...',
        createdAt: new Date('2024-05-18'),
        imageUrl: 'https://images.unsplash.com/photo-1517649022861-ec50e34f3c49',
    },
    {
        title: 'Skiing: Season Opener in Austria Draws Massive Crowd',
        content: 'The winter season opened with a spectacular giant slalom event...',
        createdAt: new Date('2024-05-18'),
        imageUrl: 'https://images.unsplash.com/photo-1516542076529-1ea3854896e1',
    },
    {
        title: 'Table Tennis: China Sweeps Team Finals',
        content: 'China continued its dominance by sweeping the team competitions at the World Championships...',
        createdAt: new Date('2024-05-19'),
        imageUrl: 'https://images.unsplash.com/photo-1556112921-38c7a5a5e803',
    },
];

async function seed() {
    try {
        if (process.env.NODE_ENV === 'production') {
            console.error('❌ Error: Refusing to run seed script in production environment to prevent data loss.');
            process.exit(1);
        }
        await AppDataSource.initialize();
        console.log('✅ Database connected');

        const articleRepository = AppDataSource.getRepository(SportsArticle);
        await articleRepository.clear();
        console.log('🗑️  Cleared existing articles');

        const articles = sportsArticles.map(data => articleRepository.create(data));
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
