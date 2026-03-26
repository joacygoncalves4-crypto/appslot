// ==================== CATALOGO DE JOGOS ====================
const IMG = 'assets/games/';

const PGSOFT_GAMES = [
  { id: 1, name: "Fortune Horse", image: IMG+"fortune-horse.png", category: "pgsoft" },
  { id: 2, name: "Fortune Tiger", image: IMG+"fortune-tiger.png", category: "pgsoft" },
  { id: 3, name: "Fortune Ox", image: IMG+"fortune-ox.png", category: "pgsoft" },
  { id: 4, name: "Fortune Rabbit", image: IMG+"fortune-rabbit.png", category: "pgsoft" },
  { id: 5, name: "Fortune Mouse", image: IMG+"fortune-mouse.png", category: "pgsoft" },
  { id: 6, name: "Fortune Snake", image: IMG+"fortune-snake.png", category: "pgsoft" },
  { id: 7, name: "Graffiti Rush", image: IMG+"graffiti-rush.png", category: "pgsoft" },
  { id: 8, name: "Pinata Wins", image: IMG+"pinata-wins.png", category: "pgsoft" },
  { id: 9, name: "Shaolin Soccer", image: IMG+"shaolin-soccer.png", category: "pgsoft" },
  { id: 10, name: "Alibaba's Cave of Fortune", image: IMG+"alibabas-cave.png", category: "pgsoft" },
  { id: 11, name: "Pharaoh Royals", image: IMG+"pharaoh-royals.png", category: "pgsoft" },
  { id: 12, name: "Mythical Guardians", image: IMG+"mythical-guardians.png", category: "pgsoft" },
  { id: 13, name: "Poker Kingdom Win", image: IMG+"poker-kingdom-win.png", category: "pgsoft" },
  { id: 14, name: "Hawaiian Tiki", image: IMG+"hawaiian-tiki.png", category: "pgsoft" },
  { id: 15, name: "Diner Frenzy Spins", image: IMG+"diner-frenzy-spins.png", category: "pgsoft" },
  { id: 16, name: "Destiny of Sun and Moon", image: IMG+"destiny-sun-moon.png", category: "pgsoft" },
  { id: 17, name: "Museum Wonders", image: IMG+"museum-wonders.png", category: "pgsoft" },
  { id: 18, name: "Muay Thai Champion", image: IMG+"muay-thai-champion.png", category: "pgsoft" },
  { id: 19, name: "Knockout Riches", image: IMG+"knockout-riches.png", category: "pgsoft" },
  { id: 20, name: "Shark Bounty", image: IMG+"shark-bounty.png", category: "pgsoft" },
  { id: 21, name: "Garuda Gems", image: IMG+"garuda-gems.png", category: "pgsoft" },
  { id: 22, name: "Diner Delights", image: IMG+"diner-delights.png", category: "pgsoft" },
  { id: 23, name: "Cocktail Nights", image: IMG+"cocktail-nights.png", category: "pgsoft" },
  { id: 24, name: "Super Golf Drive", image: IMG+"super-golf-drive.png", category: "pgsoft" },
  { id: 25, name: "Forge of Wealth", image: IMG+"forge-of-wealth.png", category: "pgsoft" },
  { id: 26, name: "Fruity Candy", image: IMG+"fruity-candy.png", category: "pgsoft" },
  { id: 27, name: "Zombie Outbreak", image: IMG+"zombie-outbreak.png", category: "pgsoft" },
  { id: 28, name: "Anubis Wrath", image: IMG+"anubis-wrath.png", category: "pgsoft" },
  { id: 29, name: "Wild Coaster", image: IMG+"wild-coaster.png", category: "pgsoft" },
  { id: 30, name: "Ultimate Striker", image: IMG+"ultimate-striker.png", category: "pgsoft" },
  { id: 31, name: "Asgardian Rising", image: IMG+"asgardian-rising.png", category: "pgsoft" },
  { id: 32, name: "Rooster Rumble", image: IMG+"rooster-rumble.png", category: "pgsoft" },
  { id: 33, name: "Symbols of Egypt", image: IMG+"symbols-of-egypt.png", category: "pgsoft" },
  { id: 34, name: "Emperor's Favour", image: IMG+"emperors-favour.png", category: "pgsoft" },
  { id: 35, name: "Alchemy Gold", image: IMG+"alchemy-gold.png", category: "pgsoft" },
  { id: 36, name: "Speed Winner", image: IMG+"speed-winner.png", category: "pgsoft" },
  { id: 37, name: "Wild Bounty Showdown", image: IMG+"wild-bounty-showdown.png", category: "pgsoft" },
  { id: 38, name: "Mafia Mayhem", image: IMG+"mafia-mayhem.webp", category: "pgsoft" },
  { id: 39, name: "Midas Fortune", image: IMG+"midas-fortune.png", category: "pgsoft" },
  { id: 40, name: "Legend of Perseus", image: IMG+"legend-of-perseus.jpeg", category: "pgsoft" },
  { id: 41, name: "Yakuza Honor", image: IMG+"yakuza-honor.jpg", category: "pgsoft" },
  { id: 42, name: "Dragon Hatch", image: IMG+"dragon-hatch.jpeg", category: "pgsoft" },
  { id: 43, name: "Cash Mania", image: IMG+"cash-mania.jpg", category: "pgsoft" },
  { id: 44, name: "Fortune Dragon", image: IMG+"fortune-dragon.webp", category: "pgsoft" },
  { id: 45, name: "Futebol Fever", image: IMG+"futebol-fever.webp", category: "pgsoft" },
  { id: 46, name: "Songkran Splash", image: IMG+"songkran-splash.webp", category: "pgsoft" },
  { id: 47, name: "Flirting Scholar", image: IMG+"flirting-scholar.webp", category: "pgsoft" },
  { id: 48, name: "Dragon Tiger", image: IMG+"dragon-tiger-pg.webp", category: "pgsoft" },
  { id: 49, name: "Captains Bounty", image: IMG+"captains-bounty.webp", category: "pgsoft" },
  { id: 50, name: "Reel Love", image: IMG+"reel-love.webp", category: "pgsoft" },
  { id: 51, name: "Bikini Paradise", image: IMG+"bikini-paradise.webp", category: "pgsoft" },
  { id: 52, name: "Genie's 3 Wishes", image: IMG+"genies-3-wishes.webp", category: "pgsoft" },
  { id: 53, name: "Circus Delight", image: IMG+"circus-delight.webp", category: "pgsoft" },
  { id: 54, name: "The Wild Hunt", image: IMG+"the-wild-hunt.webp", category: "pgsoft" },
  { id: 55, name: "Wizdom Wonders", image: IMG+"wizdom-wonders.webp", category: "pgsoft" },
  { id: 56, name: "Gem Saviour", image: IMG+"gem-saviour.webp", category: "pgsoft" },
  { id: 57, name: "Medusa", image: IMG+"medusa.webp", category: "pgsoft" },
  { id: 58, name: "Medusa 2", image: IMG+"medusa-2.webp", category: "pgsoft" },
  { id: 59, name: "Plushie Frenzy", image: IMG+"plushie-frenzy.webp", category: "pgsoft" },
  { id: 60, name: "Hip Hop Panda", image: IMG+"hip-hop-panda.webp", category: "pgsoft" },
  { id: 61, name: "Santa's Gift Rush", image: IMG+"santas-gift-rush.webp", category: "pgsoft" },
  { id: 62, name: "Gem Saviour Sword", image: IMG+"gem-saviour-sword.webp", category: "pgsoft" },
  { id: 63, name: "Prosperity Lion", image: IMG+"prosperity-lion.webp", category: "pgsoft" },
  { id: 64, name: "Honey Trap of Diao Chan", image: IMG+"honey-trap-diao-chan.webp", category: "pgsoft" },
  { id: 65, name: "Legend of Houyi", image: IMG+"legend-of-houyi.webp", category: "pgsoft" },
  { id: 66, name: "Tree of Fortune", image: IMG+"tree-of-fortune.webp", category: "pgsoft" },
  { id: 67, name: "Hotpot", image: IMG+"hotpot.webp", category: "pgsoft" },
  { id: 68, name: "Fortune Gods", image: IMG+"fortune-gods.webp", category: "pgsoft" },
  { id: 69, name: "Secrets of Cleopatra", image: IMG+"secrets-of-cleopatra.webp", category: "pgsoft" },
  { id: 70, name: "Vampire's Charm", image: IMG+"vampires-charm.webp", category: "pgsoft" },
  { id: 71, name: "Jewels of Prosperity", image: IMG+"jewels-of-prosperity.webp", category: "pgsoft" },
  { id: 72, name: "Jack Frost's Winter", image: IMG+"jack-frosts-winter.webp", category: "pgsoft" },
  { id: 73, name: "Galactic Gems", image: IMG+"galactic-gems.webp", category: "pgsoft" },
  { id: 74, name: "Guardians of Ice and Fire", image: IMG+"guardians-ice-fire.webp", category: "pgsoft" },
  { id: 75, name: "Opera Dynasty", image: IMG+"opera-dynasty.webp", category: "pgsoft" },
  { id: 76, name: "Mahjong Ways", image: IMG+"mahjong-ways.webp", category: "pgsoft" },
  { id: 77, name: "Bali Vacation", image: IMG+"bali-vacation.webp", category: "pgsoft" },
  { id: 78, name: "Crypto Gold", image: IMG+"crypto-gold.webp", category: "pgsoft" },
  { id: 79, name: "Majestic Treasures", image: IMG+"majestic-treasures.webp", category: "pgsoft" },
  { id: 80, name: "Candy Bonanza", image: IMG+"candy-bonanza.webp", category: "pgsoft" },
  { id: 81, name: "Ways of the Qilin", image: IMG+"ways-of-qilin.webp", category: "pgsoft" },
  { id: 82, name: "Heist Stakes", image: IMG+"heist-stakes.webp", category: "pgsoft" },
  { id: 83, name: "Apollo", image: IMG+"apollo.webp", category: "pgsoft" },
  { id: 84, name: "Sushi Oishi", image: IMG+"sushi-oishi.webp", category: "pgsoft" },
  { id: 85, name: "Jurassic Kingdom", image: IMG+"jurassic-kingdom.webp", category: "pgsoft" },
  { id: 86, name: "Mermaid Riches", image: IMG+"mermaid-riches.webp", category: "pgsoft" },
  { id: 87, name: "Groundhog Harvest", image: IMG+"groundhog-harvest.webp", category: "pgsoft" },
  { id: 88, name: "Raider Jane's Crypt of Fortune", image: IMG+"raider-janes-crypt.webp", category: "pgsoft" },
  { id: 89, name: "Super Market Spree", image: IMG+"super-market-spree.webp", category: "pgsoft" },
  { id: 90, name: "Buffalo Win", image: IMG+"buffalo-win.webp", category: "pgsoft" },
  { id: 91, name: "Legendary Monkey King", image: IMG+"legendary-monkey-king.webp", category: "pgsoft" },
  { id: 92, name: "Spirited Wonders", image: IMG+"spirited-wonders.webp", category: "pgsoft" },
  { id: 93, name: "Farm Invaders", image: IMG+"farm-invaders.webp", category: "pgsoft" },
  { id: 94, name: "Museum Mystery", image: IMG+"museum-mystery.webp", category: "pgsoft" },
  { id: 95, name: "Jungle Delight", image: IMG+"jungle-delight.webp", category: "pgsoft" },
  { id: 96, name: "Journey Wealth", image: IMG+"journey-wealth.webp", category: "pgsoft" },
  { id: 97, name: "Phoenix Rises", image: IMG+"phoenix-rises.webp", category: "pgsoft" },
  { id: 98, name: "Wild Fireworks", image: IMG+"wild-fireworks.webp", category: "pgsoft" },
  { id: 99, name: "Egypt's Book Mystery", image: IMG+"egypts-book-mystery.webp", category: "pgsoft" },
  { id: 100, name: "Thai River Wonders", image: IMG+"thai-river-wonders.webp", category: "pgsoft" },
  { id: 101, name: "Gem Savior Conquest", image: IMG+"gem-savior-conquest.webp", category: "pgsoft" },
  { id: 102, name: "Queen of Bounty", image: IMG+"queen-of-bounty.webp", category: "pgsoft" },
  { id: 103, name: "Dreams of Macau", image: IMG+"dreams-of-macau.webp", category: "pgsoft" },
  { id: 104, name: "Caishen Wins", image: IMG+"caishen-wins.webp", category: "pgsoft" },
  { id: 105, name: "Lucky Piggy", image: IMG+"lucky-piggy.webp", category: "pgsoft" },
  { id: 106, name: "Wild Ape", image: IMG+"wild-ape.webp", category: "pgsoft" },
  { id: 107, name: "Mystic Potion", image: IMG+"mystic-potion.webp", category: "pgsoft" },
  { id: 108, name: "Ganesha Gold", image: IMG+"ganesha-gold.webp", category: "pgsoft" },
  { id: 109, name: "Double Fortune", image: IMG+"double-fortune.webp", category: "pgsoft" },
  { id: 110, name: "Rio Fantasia", image: IMG+"rio-fantasia.webp", category: "pgsoft" },
  { id: 111, name: "Three Crazy Piggies", image: IMG+"three-crazy-piggies.webp", category: "pgsoft" },
  { id: 112, name: "Oishi Delights", image: IMG+"oishi-delights.webp", category: "pgsoft" },
  { id: 113, name: "Chocolate Deluxe", image: IMG+"chocolate-deluxe.webp", category: "pgsoft" },
  { id: 114, name: "Geisha's Revenge", image: IMG+"geishas-revenge.webp", category: "pgsoft" },
  { id: 115, name: "Incan Wonders", image: IMG+"incan-wonders.webp", category: "pgsoft" },
  { id: 116, name: "Mr Treasure's Fortune", image: IMG+"mr-treasures-fortune.webp", category: "pgsoft" },
  { id: 117, name: "Dragon Legend", image: IMG+"dragon-legend.webp", category: "pgsoft" },
  { id: 118, name: "Wild Bandito", image: IMG+"wild-bandito.webp", category: "pgsoft" },
  { id: 119, name: "Treasure of Aztec", image: IMG+"treasure-of-aztec.png", category: "pgsoft" },
  { id: 120, name: "Candy Burst", image: IMG+"candy-burst.webp", category: "pgsoft" },
  { id: 121, name: "Lucky Neko", image: IMG+"lucky-neko.png", category: "pgsoft" },
  { id: 122, name: "Gemstones Gold", image: IMG+"gemstones-gold.jpeg", category: "pgsoft" },
  { id: 123, name: "The Great Icescape", image: IMG+"great-icescape.jpeg", category: "pgsoft" },
  { id: 124, name: "Piggy Gold", image: IMG+"piggy-gold.jpg", category: "pgsoft" },
  { id: 125, name: "Leprechaun Riches", image: IMG+"leprechaun-riches.webp", category: "pgsoft" },
  { id: 126, name: "Ganesha Fortune", image: IMG+"ganesha-fortune.png", category: "pgsoft" },
  { id: 127, name: "Mahjong Ways 2", image: IMG+"mahjong-ways-2.webp", category: "pgsoft" }
];

const PRAGMATIC_GAMES = [
  { id: 201, name: "3 Buzzing Wilds", image: IMG+"3-buzzing-wilds.jpg", category: "pragmatic" },
  { id: 202, name: "Big Bass Hold and Spinner", image: IMG+"big-bass-hold-spinner.webp", category: "pragmatic" },
  { id: 203, name: "Glover Gold", image: IMG+"glover-gold.webp", category: "pragmatic" },
  { id: 204, name: "Club Tropicana", image: IMG+"club-tropicana.webp", category: "pragmatic" },
  { id: 205, name: "Country Farming", image: IMG+"country-farming.webp", category: "pragmatic" },
  { id: 206, name: "Crown of Fire", image: IMG+"crown-of-fire.webp", category: "pragmatic" },
  { id: 207, name: "Diamonds of Egypt", image: IMG+"diamonds-of-egypt.webp", category: "pragmatic" },
  { id: 208, name: "Diamond Cascade", image: IMG+"diamond-cascade.webp", category: "pragmatic" },
  { id: 209, name: "Excalibur Unleashed", image: IMG+"excalibur-unleashed.webp", category: "pragmatic" },
  { id: 210, name: "Fat Panda", image: IMG+"fat-panda.webp", category: "pragmatic" },
  { id: 211, name: "Cosmic Cash", image: IMG+"cosmic-cash.webp", category: "pragmatic" },
  { id: 212, name: "Forge of Olympus", image: IMG+"forge-of-olympus.webp", category: "pragmatic" },
  { id: 213, name: "Heist for The Golden Nuggets", image: IMG+"heist-golden-nuggets.webp", category: "pragmatic" },
  { id: 214, name: "Hellvis Wild", image: IMG+"hellvis-wild.webp", category: "pragmatic" },
  { id: 215, name: "Jane Hunter and The Mask of Montezuma", image: IMG+"jane-hunter-montezuma.webp", category: "pragmatic" },
  { id: 216, name: "Book of Tut Respin", image: IMG+"book-of-tut-respin.webp", category: "pragmatic" },
  { id: 217, name: "Wild Wild Bananas", image: IMG+"wild-wild-bananas.webp", category: "pragmatic" },
  { id: 218, name: "Wisdom of Athena", image: IMG+"wisdom-of-athena.webp", category: "pragmatic" },
  { id: 219, name: "Wild West Duels", image: IMG+"wild-west-duels.webp", category: "pragmatic" },
  { id: 220, name: "Wild Hop and Drop", image: IMG+"wild-hop-drop.webp", category: "pragmatic" },
  { id: 221, name: "Wild Bison Charge", image: IMG+"wild-bison-charge.webp", category: "pragmatic" },
  { id: 222, name: "Three Star Fortune", image: IMG+"three-star-fortune.webp", category: "pragmatic" },
  { id: 223, name: "Striking Hot 5", image: IMG+"striking-hot-5.webp", category: "pragmatic" },
  { id: 224, name: "Sticky Bee's", image: IMG+"sticky-bees.webp", category: "pragmatic" },
  { id: 225, name: "Spirit of Adventure", image: IMG+"spirit-of-adventure.webp", category: "pragmatic" },
  { id: 226, name: "Spellbinding Mystery", image: IMG+"spellbinding-mystery.webp", category: "pragmatic" },
  { id: 227, name: "Sky Bounty", image: IMG+"sky-bounty.webp", category: "pragmatic" },
  { id: 228, name: "Cowboy Coins", image: IMG+"cowboy-coins.webp", category: "pragmatic" },
  { id: 229, name: "Rocket Blast", image: IMG+"rocket-blast.webp", category: "pragmatic" },
  { id: 230, name: "Pub Kings", image: IMG+"pub-kings.webp", category: "pragmatic" },
  { id: 231, name: "Power of Merlin", image: IMG+"power-of-merlin.webp", category: "pragmatic" },
  { id: 232, name: "Pirates Pub", image: IMG+"pirates-pub.webp", category: "pragmatic" },
  { id: 233, name: "Pirate Golden Age", image: IMG+"pirate-golden-age.webp", category: "pragmatic" },
  { id: 234, name: "Mystery of the Orient", image: IMG+"mystery-of-orient.webp", category: "pragmatic" },
  { id: 235, name: "Mustang Trail", image: IMG+"mustang-trail.webp", category: "pragmatic" },
  { id: 236, name: "Muertos Multiplier", image: IMG+"muertos-multiplier.webp", category: "pragmatic" },
  { id: 237, name: "Lobster Bob's Crazy Crab", image: IMG+"lobster-bobs-crazy-crab.webp", category: "pragmatic" },
  { id: 238, name: "African Elephant", image: IMG+"african-elephant.webp", category: "pragmatic" },
  { id: 239, name: "Knight Hot Spotz", image: IMG+"knight-hot-spotz.webp", category: "pragmatic" },
  { id: 240, name: "Luck of the Irish", image: IMG+"luck-of-irish.webp", category: "pragmatic" },
  { id: 241, name: "Bigger Bass Blizzard", image: IMG+"bigger-bass-blizzard.webp", category: "pragmatic" },
  { id: 242, name: "Black Bull", image: IMG+"black-bull.webp", category: "pragmatic" },
  { id: 243, name: "Dragon Tiger", image: IMG+"dragon-tiger-prag.webp", category: "pragmatic" },
  { id: 244, name: "Big Bass Xmas Xtreme", image: IMG+"big-bass-xmas-xtreme.webp", category: "pragmatic" },
  { id: 245, name: "Big Bass Amazon Xtreme", image: IMG+"big-bass-amazon-xtreme.webp", category: "pragmatic" },
  { id: 246, name: "Piggy Bankers", image: IMG+"piggy-bankers.webp", category: "pragmatic" },
  { id: 247, name: "Lamp of Infinity", image: IMG+"lamp-of-infinity.webp", category: "pragmatic" },
  { id: 248, name: "Jewel Rush", image: IMG+"jewel-rush.webp", category: "pragmatic" },
  { id: 249, name: "Peaky Blinders", image: IMG+"peaky-blinders.webp", category: "pragmatic" },
  { id: 250, name: "Wild Depths", image: IMG+"wild-depths.webp", category: "pragmatic" },
  { id: 251, name: "Zombie Carnival", image: IMG+"zombie-carnival.webp", category: "pragmatic" },
  { id: 252, name: "Wild Wild Riches", image: IMG+"wild-wild-riches.webp", category: "pragmatic" },
  { id: 253, name: "Fruit Party 2", image: IMG+"fruit-party-2.jpg", category: "pragmatic" },
  { id: 254, name: "Big Bass Mission Fishin", image: IMG+"big-bass-mission-fishin.webp", category: "pragmatic" },
  { id: 255, name: "The Dog House Multihold", image: IMG+"dog-house-multihold.jpg", category: "pragmatic" },
  { id: 256, name: "Fury of Odin Megaways", image: IMG+"fury-of-odin-megaways.webp", category: "pragmatic" },
  { id: 257, name: "Wild West Gold", image: IMG+"wild-west-gold.webp", category: "pragmatic" },
  { id: 258, name: "O Vira Lata Caramelo", image: IMG+"vira-lata-caramelo.webp", category: "pragmatic" },
  { id: 259, name: "Hand of Midas 2", image: IMG+"hand-of-midas-2.webp", category: "pragmatic" },
  { id: 260, name: "Aztec Gems", image: IMG+"aztec-gems.webp", category: "pragmatic" },
  { id: 261, name: "Floating Dragon", image: IMG+"floating-dragon.webp", category: "pragmatic" },
  { id: 262, name: "Fonzo's Feline", image: IMG+"fonzos-feline.webp", category: "pragmatic" },
  { id: 263, name: "Irish Crown", image: IMG+"irish-crown.webp", category: "pragmatic" },
  { id: 264, name: "Aztec Smash", image: IMG+"aztec-smash.webp", category: "pragmatic" },
  { id: 265, name: "John Hunter Book of Tut", image: IMG+"john-hunter-book-tut.webp", category: "pragmatic" },
  { id: 266, name: "Book of Monsters", image: IMG+"book-of-monsters.webp", category: "pragmatic" },
  { id: 267, name: "Tigre Sortudo", image: IMG+"tigre-sortudo.jpeg", category: "pragmatic" },
  { id: 268, name: "Mammoth Gold Megaways", image: IMG+"mammoth-gold-megaways.jpeg", category: "pragmatic" },
  { id: 269, name: "Ratinho Sortudo", image: IMG+"ratinho-sortudo.jpg", category: "pragmatic" },
  { id: 270, name: "Touro Sortudo", image: IMG+"touro-sortudo.jpeg", category: "pragmatic" },
  { id: 271, name: "Sweet Bonanza 1000", image: IMG+"sweet-bonanza-1000.png", category: "pragmatic" },
  { id: 272, name: "Sweet Bonanza", image: IMG+"sweet-bonanza.jpg", category: "pragmatic" },
  { id: 273, name: "Zeus vs Hades", image: IMG+"zeus-vs-hades.webp", category: "pragmatic" },
  { id: 274, name: "Gates of Olympus 1000", image: IMG+"gates-of-olympus-1000.png", category: "pragmatic" },
  { id: 275, name: "Gates of Olympus", image: IMG+"gates-of-olympus.png", category: "pragmatic" },
  { id: 276, name: "Big Bass Splash", image: IMG+"big-bass-splash.webp", category: "pragmatic" },
  { id: 277, name: "Big Bass Bonanza", image: IMG+"big-bass-bonanza.jpeg", category: "pragmatic" },
  { id: 278, name: "Big Bass Bonanza 1000", image: IMG+"big-bass-bonanza-1000.webp", category: "pragmatic" },
  { id: 279, name: "Sugar Rush 1000", image: IMG+"sugar-rush-1000.jpeg", category: "pragmatic" },
  { id: 280, name: "Sugar Rush", image: IMG+"sugar-rush.jpeg", category: "pragmatic" },
  { id: 281, name: "The Dog House Megaways", image: IMG+"dog-house-megaways.jpeg", category: "pragmatic" },
  { id: 282, name: "Wolf Gold", image: IMG+"wolf-gold.webp", category: "pragmatic" },
  { id: 283, name: "Chilli Heat", image: IMG+"chilli-heat.jpeg", category: "pragmatic" },
  { id: 284, name: "Gorilla Mayhem", image: IMG+"gorilla-mayhem.jpeg", category: "pragmatic" },
  { id: 285, name: "Curse of the Werewolf Megaways", image: IMG+"curse-werewolf-megaways.jpeg", category: "pragmatic" },
  { id: 286, name: "Great Rhino Megaways", image: IMG+"great-rhino-megaways.jpeg", category: "pragmatic" },
  { id: 287, name: "Pirate Gold", image: IMG+"pirate-gold.webp", category: "pragmatic" },
  { id: 288, name: "Jurassic Giants", image: IMG+"jurassic-giants.jpeg", category: "pragmatic" },
  { id: 289, name: "Mustang Gold", image: IMG+"mustang-gold.jpeg", category: "pragmatic" },
  { id: 290, name: "Da Vinci's Treasure", image: IMG+"da-vincis-treasure.jpeg", category: "pragmatic" },
  { id: 291, name: "Great Rhino", image: IMG+"great-rhino.webp", category: "pragmatic" },
  { id: 292, name: "Ancient Egypt", image: IMG+"ancient-egypt.jpeg", category: "pragmatic" },
  { id: 293, name: "The Catfather", image: IMG+"the-catfather.jpeg", category: "pragmatic" },
  { id: 294, name: "Buffalo King", image: IMG+"buffalo-king.jpeg", category: "pragmatic" }
];

const ALL_GAMES = { pgsoft: PGSOFT_GAMES, pragmatic: PRAGMATIC_GAMES };

// Renderizar jogos no grid
function renderGames(category) {
  const games = ALL_GAMES[category];
  const grid = document.getElementById(`grid-${category}`);
  if (!grid || !games) return;

  grid.innerHTML = '';

  games.forEach((game, index) => {
    const rtp = calculateRTP(game.id);
    const rtpClass = getRTPClass(rtp);
    const isHot = rtp >= 90;

    const card = document.createElement('div');
    card.className = `game-card${isHot ? ' rtp-hot-card' : ''}`;
    card.style.animationDelay = `${Math.min(index * 0.03, 0.5)}s`;
    card.onclick = () => showPaymentChart(game.id, game.name);

    card.innerHTML = `
      <div class="card-img">
        <img src="${game.image}" alt="${game.name}" loading="lazy" onerror="this.parentElement.style.background='linear-gradient(135deg, #1a0033, #0a0014)'">
        <span class="card-rtp-badge ${rtpClass}">${rtp}%</span>
        <div class="card-hot-icon">
          <svg viewBox="0 0 24 24" fill="var(--hot)" stroke="none">
            <path d="M12 23c-3.866 0-7-3.134-7-7 0-3.107 2.012-5.03 3.5-6.5C10 8 11.5 6.5 12 3c.5 3.5 2 5 3.5 6.5C17 11 19 12.893 19 16c0 3.866-3.134 7-7 7zm0-3c1.657 0 3-1.343 3-3 0-1.4-.8-2.2-1.5-2.9-.7-.7-1.5-1.6-1.5-3.1 0 1.5-.8 2.4-1.5 3.1C9.8 14.8 9 15.6 9 17c0 1.657 1.343 3 3 3z"/>
          </svg>
        </div>
      </div>
      <div class="card-info">
        <div class="card-name">${game.name}</div>
        <div class="rtp-bar">
          <div class="rtp-fill ${rtpClass}" style="width: ${rtp}%"></div>
        </div>
        <div class="card-platform">
          <span class="card-platform-name">${CONFIG.platformName}</span>
          <div class="card-play-icon">
            <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}
