import { version } from "bun";
import { CompanySize } from "../src/constants/Difficulty.constants";

/**
 * Option 1:
 * 10 x categories
 * 4 x technologies per category
 * 3 x levels per technology
 * total: 120
 * spread across 10 company sizes:
 * 12 per company size
 * so if a game is eg 200 turns:
 * 200 / 120 = 1.666 turns per technology
 *
 * Option 2:
 * 10 x categories
 * 4 x technologies per category
 * 2 x levels per technology
 * total: 80
 * spread across 10 company sizes:
 * 8 per company size
 * so if a game is eg 200 turns:
 * 200 / 80 = 2.5 turns per technology
 *
 * Both of these options are too rapid. I want the tech but this is too quick.
 * Unless we make the tech optional, and the player can choose to invest in it or not.
 * Once passed, its locked for the player. They can still get it but buy companies that have it,
 * but they can't invest in it themselves.
 */

enum CategoryEnum {
  ADVANCED_COMPUTING = "ADVANCED_COMPUTING",
  BIOTECHNOLOGY = "BIOTECHNOLOGY",
  ENERGY_TECHNOLOGIES = "ENERGY_TECHNOLOGIES",
  FINANCIAL_TECHNOLOGIES = "FINANCIAL_TECHNOLOGIES",
  INFORMATION_AND_COMMUNICATION_TECHNOLOGIES = "INFORMATION_AND_COMMUNICATION_TECHNOLOGIES",
  LOGISTICS_AND_MARKETING = "LOGISTICS_AND_MARKETING",
  MANUFACTURING_AND_MATERIALS = "MANUFACTURING_AND_MATERIALS",
  MISCELLANEOUS = "MISCELLANEOUS",
  TRANSPORTATION_TECHNOLOGIES = "TRANSPORTATION_TECHNOLOGIES",
  VIRTUAL_AND_AUGMENTED_REALITY = "VIRTUAL_AND_AUGMENTED_REALITY",
}

enum TechnologyEnum {
  AI = "AI",
  QUANTUM_COMPUTING = "QUANTUM_COMPUTING",
  EDGE_COMPUTING = "EDGE_COMPUTING",
  AID = "AID",
  BIOMEDICAL = "BIOMEDICAL",
  CRISPR = "CRISPR",
  SYNTHETIC_BIOLOGY = "SYNTHETIC_BIOLOGY",
  BACTERIOPHAGES = "BACTERIOPHAGES",
  SOLAR = "SOLAR",
  WIND = "WIND",
  NUCLEAR = "NUCLEAR",
  HYDROGEN = "HYDROGEN",
  BLOCKCHAIN = "BLOCKCHAIN",
  CRYPTOCURRENCY = "CRYPTOCURRENCY",
  HFT = "HFT",
  PFOF = "PFOF",
  INTERNET_OF_THINGS = "INTERNET_OF_THINGS",
  _5G = "_5G",
  SUPERCONDUCTORS = "SUPERCONDUCTORS",
  CLOUD_COMPUTING = "CLOUD_COMPUTING",
  SUPPLY_CHAIN = "SUPPLY_CHAIN",
  E_COMMERCE = "E_COMMERCE",
  ADVERTISING = "ADVERTISING",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  _3D_PRINTING = "_3D_PRINTING",
  NANOTECHNOLOGY = "NANOTECH",
}

type CategoriesAndTech = Record<
  CategoryEnum,
  Record<
    string,
    Record<
      string,
      {
        company_size: number;
        unlocked_by_tech: Array<keyof typeof TechnologyEnum>;
        next_tech: Array<keyof typeof TechnologyEnum>;
      }
    >
  >
>;

export const categoriesAndTech: CategoriesAndTech = {
  ADVANCED_COMPUTING: {
    AI: {
      1: {
        company_size: 5,
      },
      2: {
        company_size: 7,
      },
      3: {
        company_size: 10,
      },
    },
    QUANTUM_COMPUTING: {
      1: {
        company_size: 7,
      },
      2: {
        company_size: 9,
      },
      3: {
        company_size: 10,
      },
    },
    EDGE_COMPUTING: {
      1: {
        company_size: 3,
      },
      2: {
        company_size: 5,
      },
      3: {
        company_size: 9,
      },
    },
    /**
     * Acquire, Innovate, Dominate
     */
    AID: {
      1: {
        company_size: 3,
      },
      2: {
        company_size: 6,
      },
      3: {
        company_size: 9,
      },
    },
  },
  BIOTECHNOLOGY: {
    BIOMEDICAL: {
      1: {
        company_size: 2,
      },
      2: {
        company_size: 6,
      },
      3: {
        company_size: 9,
      },
    },
    CRISPR: {
      1: {
        company_size: 3,
      },
      2: {
        company_size: 7,
      },
      3: {
        company_size: 10,
      },
    },
    SYNTHETIC_BIOLOGY: {
      1: {
        company_size: 4,
      },
      2: {
        company_size: 8,
      },
      3: {
        company_size: 10,
      },
    },
    BACTERIOPHAGES: {
      1: {
        company_size: 2,
      },
      2: {
        company_size: 5,
      },
      3: {
        company_size: 8,
      },
    },
  },
  ENERGY_TECHNOLOGIES: {
    SOLAR: {
      1: {
        company_size: 1,
      },
      2: {
        company_size: 1,
      },
      3: {
        company_size: 9,
      },
    },
    WIND: {
      1: {
        company_size: 1,
      },
      2: {
        company_size: 4,
      },
      3: {
        company_size: 7,
      },
    },
    NUCLEAR: {
      1: {
        company_size: 1,
      },
      2: {
        company_size: 3,
      },
      3: {
        company_size: 10,
      },
    },
    HYDROGEN: {
      1: {
        company_size: 5,
      },
      2: {
        company_size: 9,
      },
      3: {
        company_size: 10,
      },
    },
  },
  FINANCIAL_TECHNOLOGIES: {
    BLOCKCHAIN: {
      1: {
        company_size: 2,
      },
      2: {
        company_size: 4,
      },
      3: {
        company_size: 7,
      },
    },
    CRYPTOCURRENCY: {
      1: {
        company_size: 3,
      },
      2: {
        company_size: 5,
      },
      3: {
        company_size: 8,
      },
    },
    HFT: {
      1: {
        company_size: 4,
      },
      2: {
        company_size: 6,
      },
      3: {
        company_size: 9,
      },
    },
    PFOF: {
      1: {
        company_size: 4,
      },
      2: {
        company_size: 5,
      },
      3: {
        company_size: 6,
      },
    },
  },
  INFORMATION_AND_COMMUNICATION_TECHNOLOGIES: {
    INTERNET_OF_THINGS: {
      1: {
        company_size: 1,
      },
      2: {
        company_size: 4,
      },
      3: {
        company_size: 5,
      },
    },
    _5G: {
      1: {
        company_size: 1,
      },
      2: {
        company_size: 4,
      },
      3: {
        company_size: 6,
      },
    },
    SUPERCONDUCTORS: {
      1: {
        company_size: 5,
      },
      2: {
        company_size: 7,
      },
      3: {
        company_size: 9,
      },
    },
    CLOUD_COMPUTING: {
      1: {
        company_size: 1,
      },
      2: {
        company_size: 2,
      },
      3: {
        company_size: 4,
      },
    },
  },
  LOGISTICS_AND_MARKETING: {
    SUPPLY_CHAIN: {
      1: {
        company_size: 1,
      },
      2: {
        company_size: 2,
      },
      3: {
        company_size: 5,
      },
    },
    E_COMMERCE: {
      1: {
        company_size: 1,
      },
      2: {
        company_size: 3,
      },
      3: {
        company_size: 5,
      },
    },
    ADVERTISING: {
      1: {
        company_size: 1,
      },
      2: {
        company_size: 5,
      },
      3: {
        company_size: 8,
      },
    },
    SOCIAL_MEDIA: {
      1: {
        company_size: 1,
      },
      2: {
        company_size: 2,
      },
      3: {
        company_size: 7,
      },
    },
  },
  MANUFACTURING_AND_MATERIALS: {
    _3D_PRINTING: {
      1: {
        company_size: 2,
      },
      2: {
        company_size: 4,
      },
      3: {
        company_size: 7,
      },
    },
    NANOTECHNOLOGY: {
      1: {
        company_size: 6,
      },
      2: {
        company_size: 8,
      },
      3: {
        company_size: 10,
      },
    },
    ADDITIVE_MANUFACTURING: {
      1: {
        company_size: 2,
      },
      2: {
        company_size: 5,
      },
      3: {
        company_size: 8,
      },
    },
    COMPOSITES: {
      1: {
        company_size: 2,
      },
      2: {
        company_size: 6,
      },
      3: {
        company_size: 9,
      },
    },
  },
  MISCELLANEOUS: {
    SPACE: {
      1: {
        company_size: 2,
      },
      2: {
        company_size: 4,
      },
      3: {
        company_size: 8,
      },
    },
    DEFENSE: {
      1: {
        company_size: 2,
      },
      2: {
        company_size: 7,
      },
      3: {
        company_size: 9,
      },
    },
    CYBERSECURITY: {
      1: {
        company_size: 2,
      },
      2: {
        company_size: 4,
      },
      3: {
        company_size: 8,
      },
    },
    DESALINIZATION: {
      1: {
        company_size: 3,
      },
      2: {
        company_size: 7,
      },
      3: {
        company_size: 9,
      },
    },
  },
  TRANSPORTATION_TECHNOLOGIES: {
    ELECTRIC_VEHICLES: {
      1: {
        company_size: 3,
      },
      2: {
        company_size: 7,
      },
      3: {
        company_size: 9,
      },
    },
    AUTONOMOUS_VEHICLES: {
      1: {
        company_size: 6,
      },
      2: {
        company_size: 8,
      },
      3: {
        company_size: 10,
      },
    },
    RAPID_AIRSHIPS: {
      1: {
        company_size: 6,
      },
      2: {
        company_size: 8,
      },
      3: {
        company_size: 10,
      },
    },
    DRONES: {
      1: {
        company_size: 3,
      },
      2: {
        company_size: 8,
      },
      3: {
        company_size: 10,
      },
    },
  },
  VIRTUAL_AND_AUGMENTED_REALITY: {
    VR: {
      1: {
        company_size: 1,
      },
      2: {
        company_size: 3,
      },
      3: {
        company_size: 6,
      },
    },
    AR: {
      1: {
        company_size: 3,
      },
      2: {
        company_size: 4,
      },
      3: {
        company_size: 6,
      },
    },
    MR: {
      1: {
        company_size: 3,
      },
      2: {
        company_size: 7,
      },
      3: {
        company_size: 10,
      },
    },
    HOLOGRAPHIC: {
      1: {
        company_size: 6,
      },
      2: {
        company_size: 8,
      },
      3: {
        company_size: 10,
      },
    },
  },
};
const technology_tree = {
  [CompanySize.SMALL]: {
    [TechnologyEnum._3D_PRINTING]: {
      category: "ADVANCED_COMPUTING",
      sector: ["Manufacturing", "Healthcare", "Education"],
      __version: 1,
      description: "lorem ipsum",
      unlocked_by: null,
      unlocks: [{ technology: TechnologyEnum.NANOTECHNOLOGY, __version: 1 }],
      factor: {
        CAPITAL: 3,
        CASH: 3,
        RESEARCH: 3,
        INFLUENCE: 3,
        EMISSIONS: 3,
        PUBLIC_OPINION: 3,
        PRODUCTIVITY: 3,
        ENVIRONMENTAL_IMPACT: 3,
      },
    },
  },
};
