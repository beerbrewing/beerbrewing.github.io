export const libraryData = [
  {
    name: 'Getting Started',
    id: 'getting-started',
    articles: [
      {
        id: 'brewing-basics',
        title: 'Brewing Basics',
        content: 'An introduction to the fundamental concepts of brewing beer, including the brewing process, equipment needed, and basic terminology. Learn about the four main ingredients and how they work together to create beer.'
      },
      {
        id: 'equipment-guide',
        title: 'Essential Equipment Guide',
        content: 'A comprehensive guide to the essential equipment needed for homebrewing, from basic kits to advanced setups. Includes fermenters, airlocks, thermometers, hydrometers, and more.'
      },
      {
        id: 'sanitisation',
        title: 'Sanitisation Best Practices',
        content: 'Learn the importance of proper sanitisation in brewing and the best methods to ensure your beer stays infection-free. Covers cleaning vs sanitising, common sanitisers, and best practices.'
      },
      {
        id: 'first-batch',
        title: 'Your First Batch',
        content: 'Step-by-step instructions for brewing your very first batch of beer, including common mistakes to avoid. From wort preparation to bottling, this guide covers everything a beginner needs to know.'
      },
      {
        id: 'brewing-safety',
        title: 'Brewing Safety Guidelines',
        content: 'Essential safety information for homebrewers, including handling hot liquids, chemical safety, electrical safety, and proper ventilation. Safety should always come first in brewing.'
      }
    ]
  },
  {
    name: 'Ingredients',
    id: 'ingredients',
    subcategories: [
      {
        name: 'Malt',
        id: 'malt',
        articles: [
          {
            id: 'malt-types',
            title: 'Types of Malt',
            content: 'Understanding the different types of malt available, from base malts to specialty malts and their contributions to beer flavour. Learn about pale, pilsner, Munich, crystal, and roasted malts.'
          },
          {
            id: 'malt-extract',
            title: 'Malt Extract vs All-Grain',
            content: 'Comparing malt extract brewing to all-grain brewing, including pros, cons, and when to use each method. Understand the differences in flavour, complexity, and time investment.'
          },
          {
            id: 'mashing',
            title: 'Mashing Techniques',
            content: 'Learn about different mashing techniques including single infusion, step mashing, and decoction mashing. Understand temperature rests and their effects on beer characteristics.'
          },
          {
            id: 'malt-storage',
            title: 'Malt Storage and Handling',
            content: 'Best practices for storing and handling malt to maintain freshness and quality. Learn about proper storage conditions, shelf life, and signs of spoiled malt.'
          },
          {
            id: 'malt-calculations',
            title: 'Malt Calculations and Efficiency',
            content: 'Understanding extract potential, efficiency calculations, and how to predict your beer\'s original gravity. Learn to calculate mash efficiency and adjust recipes accordingly.'
          }
        ]
      },
      {
        name: 'Hops',
        id: 'hops',
        articles: [
          {
            id: 'hop-varieties',
            title: 'Hop Varieties and Characteristics',
            content: 'Explore different hop varieties, their alpha acid content, and the unique flavours and aromas they contribute to beer. From noble hops to modern American varieties.'
          },
          {
            id: 'hop-timing',
            title: 'Hop Timing and Utilisation',
            content: 'Understanding when to add hops during the brewing process and how timing affects bitterness, flavour, and aroma. Learn about boil times and IBU calculations.'
          },
          {
            id: 'dry-hopping',
            title: 'Dry Hopping Techniques',
            content: 'Learn about dry hopping methods to add intense hop aroma to your beers without increasing bitterness. Techniques, timing, and best practices for maximum hop character.'
          },
          {
            id: 'hop-storage',
            title: 'Hop Storage and Freshness',
            content: 'How to properly store hops to maintain their quality and potency. Learn about vacuum sealing, freezing, and signs of hop degradation over time.'
          },
          {
            id: 'hop-substitutions',
            title: 'Hop Substitutions and Blending',
            content: 'How to substitute hops when your preferred variety isn\'t available. Learn about hop characteristics and how to create similar flavour profiles with different varieties.'
          }
        ]
      },
      {
        name: 'Yeast',
        id: 'yeast',
        articles: [
          {
            id: 'yeast-management',
            title: 'Yeast Management',
            content: 'Everything you need to know about handling and maintaining healthy yeast, including pitching rates and temperature control. Learn about yeast health and vitality.'
          },
          {
            id: 'yeast-strains',
            title: 'Yeast Strains and Selection',
            content: 'Understanding different yeast strains, their characteristics, and how to choose the right yeast for your beer style. From ale yeasts to lager yeasts and specialty strains.'
          },
          {
            id: 'fermentation-control',
            title: 'Fermentation Control',
            content: 'Learn how to control fermentation temperature and conditions to produce consistent, high-quality beer. Temperature management is crucial for yeast performance.'
          },
          {
            id: 'yeast-starters',
            title: 'Yeast Starters and Propagation',
            content: 'How to create and use yeast starters to ensure healthy fermentation. Learn about starter calculations, aeration, and when starters are necessary.'
          },
          {
            id: 'yeast-harvesting',
            title: 'Yeast Harvesting and Reuse',
            content: 'Techniques for harvesting and reusing yeast from previous batches. Learn about yeast washing, storage, and how many generations you can reuse yeast.'
          }
        ]
      },
      {
        name: 'Water',
        id: 'water',
        articles: [
          {
            id: 'water-chemistry',
            title: 'Water Chemistry Basics',
            content: 'Understanding water chemistry and how different mineral profiles affect beer flavour and brewing efficiency. Learn about calcium, magnesium, sulphate, and chloride.'
          },
          {
            id: 'water-treatment',
            title: 'Water Treatment Methods',
            content: 'Learn about various water treatment methods including filtering, boiling, and chemical adjustments. How to modify your water for different beer styles.'
          },
          {
            id: 'water-profiles',
            title: 'Famous Water Profiles',
            content: 'Understanding the water profiles of famous brewing cities and how to replicate them. From Burton-on-Trent to Pilsen and Munich water characteristics.'
          },
          {
            id: 'water-testing',
            title: 'Water Testing and Analysis',
            content: 'How to test your brewing water and interpret the results. Learn about water testing kits, professional analysis, and what parameters matter most for brewing.'
          },
          {
            id: 'water-calculations',
            title: 'Water Adjustment Calculations',
            content: 'How to calculate water adjustments for different beer styles. Learn about salt additions, acid adjustments, and software tools for water chemistry.'
          }
        ]
      }
    ]
  },
  {
    name: 'Beer Styles',
    id: 'beer-styles',
    subcategories: [
      {
        name: 'Ales',
        id: 'ales',
        articles: [
          {
            id: 'pale-ale',
            title: 'Pale Ale Brewing',
            content: 'How to brew classic pale ales, including English and American variations with their distinct hop profiles. Learn about malt bills, hop schedules, and fermentation techniques.'
          },
          {
            id: 'ipa-brewing',
            title: 'IPA Brewing Guide',
            content: 'Complete guide to brewing India Pale Ales, from session IPAs to double IPAs with intense hop character. Modern techniques and classic approaches.'
          },
          {
            id: 'stout-porter',
            title: 'Stout and Porter Brewing',
            content: 'Learn to brew dark beers including stouts and porters with rich, complex flavours from roasted malts. From dry stouts to imperial stouts.'
          },
          {
            id: 'wheat-beer',
            title: 'Wheat Beer Brewing',
            content: 'How to brew refreshing wheat beers including hefeweizens, witbiers, and American wheat beers. Learn about wheat malt characteristics and yeast selection.'
          },
          {
            id: 'amber-ale',
            title: 'Amber and Red Ale Brewing',
            content: 'Brewing balanced amber and red ales with moderate hop bitterness and rich malt character. Learn about crystal malt usage and hop balance.'
          }
        ]
      },
      {
        name: 'Lagers',
        id: 'lagers',
        articles: [
          {
            id: 'lager-basics',
            title: 'Lager Brewing Basics',
            content: 'Introduction to lager brewing, including the differences from ale brewing and temperature control requirements. Understanding bottom-fermenting yeasts.'
          },
          {
            id: 'pilsner-brewing',
            title: 'Pilsner Brewing',
            content: 'How to brew crisp, clean pilsners with proper lagering techniques and noble hop character. From Czech to German pilsner variations.'
          },
          {
            id: 'bock-brewing',
            title: 'Bock Beer Brewing',
            content: 'Brewing traditional German bock beers including maibock, doppelbock, and eisbock. Learn about high-gravity brewing and extended lagering.'
          },
          {
            id: 'vienna-lager',
            title: 'Vienna and Märzen Brewing',
            content: 'How to brew Vienna lagers and Oktoberfest-style Märzen beers. Learn about Vienna malt and the balance between malt and hop character.'
          },
          {
            id: 'lager-conditioning',
            title: 'Lager Conditioning and Storage',
            content: 'Proper techniques for conditioning and storing lager beers. Learn about diacetyl rests, cold conditioning, and the importance of patience in lager brewing.'
          }
        ]
      },
      {
        name: 'Belgian Styles',
        id: 'belgian-styles',
        articles: [
          {
            id: 'saison-brewing',
            title: 'Saison Brewing',
            content: 'Learn to brew traditional Belgian saisons with their characteristic spicy, fruity yeast character. From simple table saisons to complex farmhouse ales.'
          },
          {
            id: 'belgian-strong-ales',
            title: 'Belgian Strong Ales',
            content: 'Brewing complex Belgian strong ales including dubbels, tripels, and quadrupels with high alcohol content. Learn about candi sugar and Belgian yeast strains.'
          },
          {
            id: 'witbier-brewing',
            title: 'Witbier and Belgian Wheat',
            content: 'How to brew refreshing Belgian wheat beers with coriander, orange peel, and other spices. Learn about unmalted wheat and traditional ingredients.'
          },
          {
            id: 'lambic-brewing',
            title: 'Lambic and Gueuze Brewing',
            content: 'Introduction to spontaneous fermentation and traditional Belgian lambic brewing. Learn about wild yeasts, bacteria, and long ageing processes.'
          },
          {
            id: 'belgian-yeast',
            title: 'Belgian Yeast Characteristics',
            content: 'Understanding the unique characteristics of Belgian yeast strains and how they contribute to the distinctive flavours of Belgian beers.'
          }
        ]
      },
      {
        name: 'Specialty Styles',
        id: 'specialty-styles',
        articles: [
          {
            id: 'sour-beer-styles',
            title: 'Sour Beer Styles',
            content: 'Overview of various sour beer styles including Berliner Weisse, Gose, Flanders Red, and American sour ales. Learn about different souring techniques.'
          },
          {
            id: 'barrel-aged-beers',
            title: 'Barrel-Aged Beer Brewing',
            content: 'How to brew and age beers in barrels for complex flavours. Learn about barrel selection, ageing times, and blending techniques.'
          },
          {
            id: 'fruit-beer-brewing',
            title: 'Fruit Beer Brewing',
            content: 'Techniques for brewing fruit beers, from simple additions to complex fruit-forward styles. Learn about fruit selection, timing, and processing methods.'
          },
          {
            id: 'spiced-beer-brewing',
            title: 'Spiced and Herbed Beer Brewing',
            content: 'How to incorporate spices, herbs, and other flavourings into your beer. Learn about spice selection, timing, and balancing flavours.'
          },
          {
            id: 'smoked-beer-brewing',
            title: 'Smoked Beer Brewing',
            content: 'Techniques for brewing smoked beers including rauchbiers and other smoked styles. Learn about different smoking methods and wood types.'
          }
        ]
      }
    ]
  },
  {
    name: 'Advanced Techniques',
    id: 'advanced-techniques',
    articles: [
      {
        id: 'all-grain-brewing',
        title: 'All-Grain Brewing',
        content: 'Complete guide to all-grain brewing, including equipment setup, mash calculations, and process control. Learn about lautering, sparging, and efficiency optimisation.'
      },
      {
        id: 'recipe-formulation',
        title: 'Recipe Formulation',
        content: 'Learn how to create your own beer recipes, balance ingredients, and predict beer characteristics. Understanding style guidelines and ingredient interactions.'
      },
      {
        id: 'sour-beer-brewing',
        title: 'Sour Beer Brewing',
        content: 'Introduction to sour beer brewing techniques including kettle souring, barrel ageing, and mixed fermentation. Learn about bacteria and wild yeast management.'
      },
      {
        id: 'barrel-aging',
        title: 'Barrel Ageing Techniques',
        content: 'Advanced techniques for ageing beer in barrels, including wood selection, infection prevention, and ageing timeframes. Learn about barrel preparation and maintenance.'
      },
      {
        id: 'high-gravity-brewing',
        title: 'High Gravity Brewing',
        content: 'Techniques for brewing high-alcohol beers including barleywines, imperial stouts, and other strong ales. Learn about yeast management and fermentation control.'
      }
    ]
  },
  {
    name: 'Quality Control',
    id: 'quality-control',
    articles: [
      {
        id: 'tasting-evaluation',
        title: 'Beer Tasting and Evaluation',
        content: 'How to properly taste and evaluate your beer, including aroma, appearance, flavour, and mouthfeel assessment. Learn to identify off-flavours and quality issues.'
      },
      {
        id: 'lab-testing',
        title: 'Laboratory Testing for Homebrewers',
        content: 'Essential lab tests for homebrewers including gravity measurements, pH testing, and microbiological analysis. Learn about testing equipment and procedures.'
      },
      {
        id: 'consistency-techniques',
        title: 'Brewing for Consistency',
        content: 'How to brew consistent beer batch after batch. Learn about process control, record keeping, and quality assurance techniques.'
      },
      {
        id: 'packaging-quality',
        title: 'Packaging and Quality Maintenance',
        content: 'Best practices for bottling, kegging, and maintaining beer quality after packaging. Learn about oxygen control, carbonation, and storage conditions.'
      },
      {
        id: 'competition-preparation',
        title: 'Preparing Beer for Competition',
        content: 'How to prepare and submit your beer for homebrew competitions. Learn about style guidelines, presentation, and judging criteria.'
      }
    ]
  },
  {
    name: 'Troubleshooting',
    id: 'troubleshooting',
    articles: [
      {
        id: 'common-problems',
        title: 'Common Brewing Problems',
        content: 'Identify and solve common brewing problems including off-flavours, stuck fermentations, and clarity issues. Learn about prevention and correction techniques.'
      },
      {
        id: 'off-flavors',
        title: 'Off-Flavour Identification',
        content: 'Learn to identify common off-flavours in beer and their causes, from diacetyl to acetaldehyde. Understanding the sources and prevention of off-flavours.'
      },
      {
        id: 'infection-prevention',
        title: 'Infection Prevention',
        content: 'How to prevent and identify beer infections, including proper cleaning and sanitisation protocols. Learn about common spoilage organisms.'
      },
      {
        id: 'fermentation-issues',
        title: 'Fermentation Problems',
        content: 'Troubleshooting fermentation issues including stuck fermentations, slow starts, and unusual fermentation characteristics. Learn about yeast health and fermentation conditions.'
      },
      {
        id: 'clarity-problems',
        title: 'Clarity and Haze Issues',
        content: 'How to achieve clear beer and troubleshoot haze problems. Learn about fining agents, cold crashing, and filtration techniques for homebrewers.'
      }
    ]
  }
];
