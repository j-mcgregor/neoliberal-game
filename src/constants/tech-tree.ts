import { DifficultyEnum, TechnologyEnum } from "../../types/enums";
import type { TechCard } from "./Difficulty.constants";
import { CompanySize } from "./Difficulty.constants";

const MULTIPLIER_PER_TECH_UNLOCKED = 100;
const MULTIPLIER_PER_SIZE_UNLOCKED = 1000;

function difficultyMultiplier({
  company_size,
  unlocks,
}: {
  company_size: CompanySize;
  /**
   * The number of techs that will be unlocked.
   * The more techs unlocked, the higher the multiplier.
   */
  unlocks: number;
}): TechCard["research_needed"] {
  const per_tech = (unlocks + 1) * MULTIPLIER_PER_TECH_UNLOCKED;
  const per_size = company_size * MULTIPLIER_PER_SIZE_UNLOCKED;
  console.log(company_size, per_tech, per_size);

  return Object.keys(DifficultyEnum).reduce((acc, difficulty, i) => {
    // console.log({ points: per_tech + per_size * (i + 1) });
    acc[difficulty as DifficultyEnum] = {
      points: per_tech + per_size * (i + 1),
      turns: 0,
    };

    return acc;
  }, {} as TechCard["research_needed"]);
}

const defaultCard = ({
  id,
  unlocked_at_size,
  unlocked_by_tech = [],
  unlocks = [],
  unlocked = false,
}: {
  id: TechCard["id"];
  unlocked_at_size: TechCard["unlocked_at_size"];
  unlocked_by_tech?: TechCard["unlocked_by_tech"];
  unlocks?: TechCard["unlocks"];
  unlocked?: TechCard["unlocked"];
}) => {
  const name = id.split("_v")[0] as keyof typeof TechnologyEnum;
  const v = Number(id.split("_v")[1]);

  return {
    _v: v,
    id,
    name: TechnologyEnum[name],
    unlocked,
    enabled: false,
    in_development: false,
    description: "",
    unlocked_at_size,
    unlocked_by_tech,
    unlocks,
    research_needed: difficultyMultiplier({
      company_size: unlocked_at_size,
      unlocks: unlocks.length,
    }),
    sectors: [],
    bonus: [],
    research_points: 0,
  } as TechCard;
};

const SPACE_v1 = defaultCard({
  id: "SPACE_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["EDGE_COMPUTING_v1", "SPACE_v2"],
  unlocked_by_tech: ["SOLAR_v1", "NUCLEAR_v1"],
});

const SPACE_v2 = defaultCard({
  id: "SPACE_v2",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["ADDITIVE_MANUFACTURING_v2", "AI_v1"],
  unlocked_by_tech: ["SPACE_v1"],
});

const SOLAR_v1 = defaultCard({
  id: "SOLAR_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["SPACE_v1"],
  unlocked: true,
});

const SOLAR_v2 = defaultCard({
  id: "SOLAR_v2",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocks: ["AUTONOMOUS_VEHICLES_v1"],
  unlocked_by_tech: ["DESALINIZATION_v1"],
});

const NUCLEAR_v1 = defaultCard({
  id: "NUCLEAR_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["SPACE_v1"],
  unlocked: true,
});
const NUCLEAR_v2 = defaultCard({
  id: "NUCLEAR_v2",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["HYDROGEN_v1"],
});

const SOCIAL_MEDIA_v2 = defaultCard({
  id: "SOCIAL_MEDIA_v2",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["E_COMMERCE_v2"],
  unlocked_by_tech: ["SOCIAL_MEDIA_v1", "E_COMMERCE_v1"],
});

const SOCIAL_MEDIA_v1 = defaultCard({
  id: "SOCIAL_MEDIA_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["SOCIAL_MEDIA_v2"],
  unlocked: true,
});

const SUPPLY_CHAIN_v2 = defaultCard({
  id: "SUPPLY_CHAIN_v2",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["SOCIAL_MEDIA_v2"],
});

const SUPPLY_CHAIN_v3 = defaultCard({
  id: "SUPPLY_CHAIN_v3",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocks: ["SOCIAL_MEDIA_v3"],
  unlocked_by_tech: ["_3D_PRINTING_v2"],
});

const DRONES_v1 = defaultCard({
  id: "DRONES_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["MR_v1", "AR_v1"],
  unlocked_by_tech: ["VR_v1", "_5G_v1", "SUPPLY_CHAIN_v1"],
});

const CYBERSECURITY_v1 = defaultCard({
  id: "CYBERSECURITY_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["EDGE_COMPUTING_v1"],
  unlocked_by_tech: ["IOT_v1"],
});

const CYBERSECURITY_v2 = defaultCard({
  id: "CYBERSECURITY_v2",
  unlocked_at_size: CompanySize.LARGE,
  unlocks: ["EDGE_COMPUTING_v2", "CLOUD_COMPUTING_v3"],
});

const CLOUD_COMPUTING_v2 = defaultCard({
  id: "CLOUD_COMPUTING_v2",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["EDGE_COMPUTING_v1"],
  unlocked_by_tech: ["IOT_v1", "ADVERTISING_v1", "CLOUD_COMPUTING_v1"],
});

const CLOUD_COMPUTING_v3 = defaultCard({
  id: "CLOUD_COMPUTING_v3",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocked_by_tech: ["CYBERSECURITY_v2"],
});

const SUPPLY_CHAIN_v1 = defaultCard({
  id: "SUPPLY_CHAIN_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["DRONES_v1"],
  unlocked: true,
});

const E_COMMERCE_v1 = defaultCard({
  id: "E_COMMERCE_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["SOCIAL_MEDIA_v2", "SUPPLY_CHAIN_v2"],
  unlocked: true,
});

const E_COMMERCE_v2 = defaultCard({
  id: "E_COMMERCE_v2",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocked_by_tech: ["SOCIAL_MEDIA_v2", "SUPPLY_CHAIN_v2"],
  unlocks: ["IOT_v2"],
});

const E_COMMERCE_v3 = defaultCard({
  id: "E_COMMERCE_v3",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocked_by_tech: ["_3D_PRINTING_v2"],
  unlocks: ["SOCIAL_MEDIA_v3"],
});

const VR_v1 = defaultCard({
  id: "VR_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["DRONES_v1"],
  unlocked: true,
});

const VR_v2 = defaultCard({
  id: "VR_v2",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocks: ["AR_v2"],
});

const MR_v1 = defaultCard({
  id: "MR_v1",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocks: ["AR_v2"],
  unlocked_by_tech: ["DRONES_v1"],
});

const AR_v1 = defaultCard({
  id: "AR_v1",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocks: ["AR_v2"],
  unlocked_by_tech: ["DRONES_v1"],
});

const AR_v2 = defaultCard({
  id: "AR_v2",
  unlocked_at_size: CompanySize.LARGE,
  unlocks: ["AI_v1"],
  unlocked_by_tech: ["AR_v1", "MR_v1", "VR_v2"],
});

const _5G_v1 = defaultCard({
  id: "_5G_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["DRONES_v1"],
  unlocked: true,
});

const _5G_v2 = defaultCard({
  id: "_5G_v2",
  unlocked_at_size: CompanySize.LARGE,
  unlocks: ["AUTONOMOUS_VEHICLES_v1", "SUPERCONDUCTORS_v1"],
});

const IOT_v1 = defaultCard({
  id: "IOT_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["CYBERSECURITY_v1", "CLOUD_COMPUTING_v2"],
  unlocked: true,
});

const IOT_v2 = defaultCard({
  id: "IOT_v2",
  unlocked_at_size: CompanySize.LARGE,
  unlocks: ["AUTONOMOUS_VEHICLES_v1"],
  unlocked_by_tech: ["E_COMMERCE_v2"],
});

const ADVERTISING_v1 = defaultCard({
  id: "ADVERTISING_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["CLOUD_COMPUTING_v2"],
  unlocked: true,
});

const ADVERTISING_v2 = defaultCard({
  id: "ADVERTISING_v2",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocks: ["SOCIAL_MEDIA_v3"],
});

const CLOUD_COMPUTING_v1 = defaultCard({
  id: "CLOUD_COMPUTING_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["CLOUD_COMPUTING_v2"],
  unlocked: true,
});

const DEFENSE_v1 = defaultCard({
  id: "DEFENSE_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["ELECTRIC_VEHICLES_v1"],
  unlocked_by_tech: ["_3D_PRINTING_v1"],
});

const COMPOSITES_v1 = defaultCard({
  id: "COMPOSITES_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["ELECTRIC_VEHICLES_v1"],
  unlocked_by_tech: ["_3D_PRINTING_v1"],
});

const ADDITIVE_MANUFACTURING_v1 = defaultCard({
  id: "ADDITIVE_MANUFACTURING_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["ELECTRIC_VEHICLES_v1"],
  unlocked_by_tech: ["_3D_PRINTING_v1", "WIND_v1"],
});

const ADDITIVE_MANUFACTURING_v2 = defaultCard({
  id: "ADDITIVE_MANUFACTURING_v2",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocks: ["RAPID_AIRSHIPS_v1"],
  unlocked_by_tech: ["_3D_PRINTING_v1", "WIND_v1"],
});

const _3D_PRINTING_v1 = defaultCard({
  id: "_3D_PRINTING_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["DEFENSE_v1", "COMPOSITES_v1", "ADDITIVE_MANUFACTURING_v1"],
  unlocked: true,
});

const _3D_PRINTING_v2 = defaultCard({
  id: "_3D_PRINTING_v2",
  unlocked_at_size: CompanySize.LARGE,
  unlocks: ["E_COMMERCE_v3", "SUPPLY_CHAIN_v3"],
});

const WIND_v1 = defaultCard({
  id: "WIND_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["ADDITIVE_MANUFACTURING_v1"],
  unlocked: true,
});

const WIND_v2 = defaultCard({
  id: "WIND_v2",
  unlocked_at_size: CompanySize.LARGE,
  unlocks: ["EDGE_COMPUTING_v2"],
});

const BIOMEDICAL_v1 = defaultCard({
  id: "BIOMEDICAL_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["BACTERIOPHAGES_v1"],
});

const PFOF_v1 = defaultCard({
  id: "PFOF_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["HFT_v1"],
});

const BACTERIOPHAGES_v1 = defaultCard({
  id: "BACTERIOPHAGES_v1",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocks: ["SYNTHETIC_BIOLOGY_v1"],
  unlocked_by_tech: ["BIOMEDICAL_v1"],
});

const BLOCKCHAIN_v1 = defaultCard({
  id: "BLOCKCHAIN_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["HFT_v1", "CRYPTOCURRENCY_v1"],
});

const BLOCKCHAIN_v2 = defaultCard({
  id: "BLOCKCHAIN_v2",
  unlocked_at_size: CompanySize.LARGE,
  unlocks: ["PFOF_v2"],
  unlocked_by_tech: ["CRYPTOCURRENCY_v1"],
});

const EDGE_COMPUTING_v1 = defaultCard({
  id: "EDGE_COMPUTING_v1",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocked_by_tech: ["SPACE_v1", "CYBERSECURITY_v1", "CLOUD_COMPUTING_v2"],
});

const EDGE_COMPUTING_v2 = defaultCard({
  id: "EDGE_COMPUTING_v2",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocked_by_tech: ["WIND_v2", "CYBERSECURITY_v2"],
});

const SYNTHETIC_BIOLOGY_v1 = defaultCard({
  id: "SYNTHETIC_BIOLOGY_v1",
  unlocked_at_size: CompanySize.LARGE,
  unlocked_by_tech: ["CRISPR_v1", "BACTERIOPHAGES_v1"],
  unlocks: ["HYDROGEN_v1"],
});

const DESALINIZATION_v1 = defaultCard({
  id: "DESALINIZATION_v1",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocks: ["SOLAR_v2"],
});

const CRISPR_v1 = defaultCard({
  id: "CRISPR_v1",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocks: ["SYNTHETIC_BIOLOGY_v1"],
});

const HFT_v1 = defaultCard({
  id: "HFT_v1",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocks: ["CRYPTOCURRENCY_v2"],
  unlocked_by_tech: ["PFOF_v1", "BLOCKCHAIN_v1"],
});

const CRYPTOCURRENCY_v1 = defaultCard({
  id: "CRYPTOCURRENCY_v1",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocks: ["CRYPTOCURRENCY_v2", "BLOCKCHAIN_v2"],
  unlocked_by_tech: ["BLOCKCHAIN_v1"],
});

const CRYPTOCURRENCY_v2 = defaultCard({
  id: "CRYPTOCURRENCY_v2",
  unlocked_at_size: CompanySize.LARGE,
  unlocked_by_tech: ["HFT_v1", "CRYPTOCURRENCY_v1"],
  unlocks: ["PFOF_v2", "HFT_v2"],
});

const ELECTRIC_VEHICLES_v1 = defaultCard({
  id: "ELECTRIC_VEHICLES_v1",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocked_by_tech: [
    "COMPOSITES_v1",
    "DEFENSE_v1",
    "ADDITIVE_MANUFACTURING_v1",
  ],
});

const AI_v1 = defaultCard({
  id: "AI_v1",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocks: ["HOLOGRAPHIC_v1", "BIOMEDICAL_v2", "AR_v3", "NANOTECHNOLOGY_v1"],
  unlocked_by_tech: ["SPACE_v2", "AR_v2"],
});

const AUTONOMOUS_VEHICLES_v1 = defaultCard({
  id: "AUTONOMOUS_VEHICLES_v1",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocks: ["VR_v3"],
  unlocked_by_tech: ["IOT_v2", "_5G_v2", "SOLAR_v2"],
});

const SUPERCONDUCTORS_v1 = defaultCard({
  id: "SUPERCONDUCTORS_v1",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocked_by_tech: ["_5G_v2"],
  unlocks: ["NANOTECHNOLOGY_v1"],
});

const HYDROGEN_v1 = defaultCard({
  id: "HYDROGEN_v1",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocked_by_tech: ["NUCLEAR_v2", "SYNTHETIC_BIOLOGY_v1"],
  unlocks: ["COMPOSITES_v2"],
});

const HFT_v2 = defaultCard({
  id: "HFT_v2",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocked_by_tech: ["CRYPTOCURRENCY_v2"],
  unlocks: ["PFOF_v3"],
});

const PFOF_v2 = defaultCard({
  id: "PFOF_v2",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocks: ["PFOF_v3"],
  unlocked_by_tech: ["CRYPTOCURRENCY_v2", "BLOCKCHAIN_v2"],
});

// GLOBAL ---------------------------

const AID_v2 = defaultCard({
  id: "AID_v2",
  unlocked_at_size: CompanySize.GLOBAL,
});

const RAPID_AIRSHIPS_v1 = defaultCard({
  id: "RAPID_AIRSHIPS_v1",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["ADDITIVE_MANUFACTURING_v2"],
  unlocks: ["_3D_PRINTING_v3", "DEFENSE_v2"],
});

const HOLOGRAPHIC_v1 = defaultCard({
  id: "HOLOGRAPHIC_v1",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["AI_v1"],
  unlocks: ["MR_v2"],
});

const BIOMEDICAL_v2 = defaultCard({
  id: "BIOMEDICAL_v2",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["AI_v1"],
  unlocks: ["SYNTHETIC_BIOLOGY_v2"],
});

const BACTERIOPHAGES_v2 = defaultCard({
  id: "BACTERIOPHAGES_v2",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocks: ["SYNTHETIC_BIOLOGY_v2"],
});

const CRISPR_v2 = defaultCard({
  id: "CRISPR_v2",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocks: ["SYNTHETIC_BIOLOGY_v2"],
});

const AR_v3 = defaultCard({
  id: "AR_v3",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["AI_v1"],
  unlocks: ["MR_v2"],
});

const SOCIAL_MEDIA_v3 = defaultCard({
  id: "SOCIAL_MEDIA_v3",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["E_COMMERCE_v3", "SUPPLY_CHAIN_v3", "ADVERTISING_v2"],
});

const VR_v3 = defaultCard({
  id: "VR_v3",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["AUTONOMOUS_VEHICLES_v1"],
  unlocks: ["MR_v2"],
});

const NANOTECHNOLOGY_v1 = defaultCard({
  id: "NANOTECHNOLOGY_v1",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["AI_v1", "SUPERCONDUCTORS_v1"],
  unlocks: ["IOT_v3", "QUANTUM_COMPUTING_v1"],
});

const COMPOSITES_v2 = defaultCard({
  id: "COMPOSITES_v2",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["HYDROGEN_v1"],
  unlocks: ["ELECTRIC_VEHICLES_v2", "DEFENSE_v2", "DESALINIZATION_v2"],
});

const PFOF_v3 = defaultCard({
  id: "PFOF_v3",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["PFOF_v2", "HFT_v2"],
  unlocks: ["_5G_v3", "BLOCKCHAIN_v3"],
});

// DOMINANT ---------------------------

const SYNTHETIC_BIOLOGY_v2 = defaultCard({
  id: "SYNTHETIC_BIOLOGY_v2",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["BIOMEDICAL_v2", "BACTERIOPHAGES_v2", "CRISPR_v2"],
  unlocks: ["BACTERIOPHAGES_v3"],
});

const SUPERCONDUCTORS_v2 = defaultCard({
  id: "SUPERCONDUCTORS_v2",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocks: ["NANOTECHNOLOGY_v2", "AI_v2"],
});

const IOT_v3 = defaultCard({
  id: "IOT_v3",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["NANOTECHNOLOGY_v1"],
  unlocks: ["NANOTECHNOLOGY_v2"],
});

const QUANTUM_COMPUTING_v1 = defaultCard({
  id: "QUANTUM_COMPUTING_v1",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["NANOTECHNOLOGY_v1", "SUPERCONDUCTORS_v2"],
  unlocks: ["CYBERSECURITY_v3", "CRYPTOCURRENCY_v2", "NANOTECHNOLOGY_v2"],
});

const _3D_PRINTING_v3 = defaultCard({
  id: "_3D_PRINTING_v3",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["RAPID_AIRSHIPS_v1"],
  unlocks: ["RAPID_AIRSHIPS_v2", "AUTONOMOUS_VEHICLES_v2"],
});

const MR_v2 = defaultCard({
  id: "MR_v2",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["HOLOGRAPHIC_v1", "AR_v3", "VR_v3"],
  unlocks: ["HOLOGRAPHIC_v2"],
});

const BLOCKCHAIN_v3 = defaultCard({
  id: "BLOCKCHAIN_v3",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["PFOF_v3"],
  unlocks: ["HFT_v3"],
});

const ELECTRIC_VEHICLES_v2 = defaultCard({
  id: "ELECTRIC_VEHICLES_v2",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["COMPOSITES_v2"],
  unlocks: ["HYDROGEN_v2", "AUTONOMOUS_VEHICLES_v2"],
});

const DESALINIZATION_v2 = defaultCard({
  id: "DESALINIZATION_v2",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["CRISPR_v1", "COMPOSITES_v2"],
  unlocks: ["HYDROGEN_v2"],
});

const DEFENSE_v2 = defaultCard({
  id: "DEFENSE_v2",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["RAPID_AIRSHIPS_v1", "COMPOSITES_v2"],
  unlocks: ["HOLOGRAPHIC_v2"],
});

const _5G_v3 = defaultCard({
  id: "_5G_v3",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["PFOF_v3"],
  unlocks: ["AUTONOMOUS_VEHICLES_v2"],
});

const DRONES_v2 = defaultCard({
  id: "DRONES_v2",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocks: ["DRONES_v2"],
});

// TOP_100 --------------------------

const ADVERTISING_v3 = defaultCard({
  id: "ADVERTISING_v3",
  unlocked_at_size: CompanySize.TOP_100,
});

const BACTERIOPHAGES_v3 = defaultCard({
  id: "BACTERIOPHAGES_v3",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["SYNTHETIC_BIOLOGY_v2"],
  unlocks: ["CRISPR_v3"],
});

const AI_v2 = defaultCard({
  id: "AI_v2",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["SPACE_v3", "QUANTUM_COMPUTING_v2"],
  unlocks: ["SUPERCONDUCTORS_v2"],
});

const NANOTECHNOLOGY_v2 = defaultCard({
  id: "NANOTECHNOLOGY_v2",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["SUPERCONDUCTORS_v2", "IOT_v3", "QUANTUM_COMPUTING_v1"],
  unlocks: ["ADDITIVE_MANUFACTURING_v3", "SUPERCONDUCTORS_v3", "COMPOSITES_v3"],
});

const CRYPTOCURRENCY_v3 = defaultCard({
  id: "CRYPTOCURRENCY_v3",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["QUANTUM_COMPUTING_v1"],
  unlocks: ["SUPERCONDUCTORS_v3"],
});

const CYBERSECURITY_v3 = defaultCard({
  id: "CYBERSECURITY_v3",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["QUANTUM_COMPUTING_v1"],
  unlocks: ["EDGE_COMPUTING_v3", "QUANTUM_COMPUTING_v2"],
});

const RAPID_AIRSHIPS_v2 = defaultCard({
  id: "RAPID_AIRSHIPS_v2",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["_3D_PRINTING_v3"],
  unlocks: ["ELECTRIC_VEHICLES_v3"],
});

const AUTONOMOUS_VEHICLES_v2 = defaultCard({
  id: "AUTONOMOUS_VEHICLES_v2",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["_5G_v3", "ELECTRIC_VEHICLES_v2", "_3D_PRINTING_v3"],
  unlocks: ["AI_v3"],
});

const HFT_v3 = defaultCard({
  id: "HFT_v3",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["BLOCKCHAIN_v2"],
});

const HOLOGRAPHIC_v2 = defaultCard({
  id: "HOLOGRAPHIC_v2",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["DEFENSE_v2", "MR_v2"],
});

const HYDROGEN_v2 = defaultCard({
  id: "HYDROGEN_v2",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["ELECTRIC_VEHICLES_v2", "DESALINIZATION_v2"],
  unlocks: ["SOLAR_v3", "DESALINIZATION_v3", "AI_v3", "SPACE_v3"],
});

const WIND_v3 = defaultCard({
  id: "WIND_v3",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["DRONES_v2"],
  unlocks: ["SOLAR_v3"],
});

// TOP_10 ---------------------------

const AI_v3 = defaultCard({
  id: "AI_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["AUTONOMOUS_VEHICLES_v2", "HYDROGEN_v2"],
  unlocks: [
    "NANOTECHNOLOGY_v3",
    "AUTONOMOUS_VEHICLES_v3",
    "DEFENSE_v3",
    "HOLOGRAPHIC_v3",
  ],
});

const AID_v3 = defaultCard({
  id: "AID_v3",
  unlocked_at_size: CompanySize.TOP_10,
});

const CRISPR_v3 = defaultCard({
  id: "CRISPR_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["BACTERIOPHAGES_v3"],
  unlocks: ["SYNTHETIC_BIOLOGY_v3", "DEFENSE_v3"],
});

const COMPOSITES_v3 = defaultCard({
  id: "COMPOSITES_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["NANOTECHNOLOGY_v2"],
  unlocks: ["NUCLEAR_v3", "DRONES_v3"],
});

const QUANTUM_COMPUTING_v2 = defaultCard({
  id: "QUANTUM_COMPUTING_v2",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["CYBERSECURITY_v3", "AI_v2"],
  unlocks: [
    "NANOTECHNOLOGY_v3",
    "QUANTUM_COMPUTING_v3",
    "SYNTHETIC_BIOLOGY_v3",
  ],
});

const SPACE_v3 = defaultCard({
  id: "SPACE_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["AI_v2", "HYDROGEN_v2"],
  unlocks: ["NANOTECHNOLOGY_v3"],
});

const ELECTRIC_VEHICLES_v3 = defaultCard({
  id: "ELECTRIC_VEHICLES_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["RAPID_AIRSHIPS_v2"],
  unlocks: ["AUTONOMOUS_VEHICLES_v3"],
});

const EDGE_COMPUTING_v3 = defaultCard({
  id: "EDGE_COMPUTING_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["CYBERSECURITY_v3"],
  unlocks: ["HOLOGRAPHIC_v3", "QUANTUM_COMPUTING_v3"],
});

const DESALINIZATION_v3 = defaultCard({
  id: "DESALINIZATION_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["HYDROGEN_v2"],
  unlocks: ["HYDROGEN_v3"],
});

const SUPERCONDUCTORS_v3 = defaultCard({
  id: "SUPERCONDUCTORS_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["CRYPTOCURRENCY_v3", "NANOTECHNOLOGY_v2"],
  unlocks: ["RAPID_AIRSHIPS_v3", "BIOMEDICAL_v3", "NANOTECHNOLOGY_v3"],
});

const SOLAR_v3 = defaultCard({
  id: "SOLAR_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["HYDROGEN_v2", "WIND_v3"],
  unlocks: ["RAPID_AIRSHIPS_v3"],
});

const ADDITIVE_MANUFACTURING_v3 = defaultCard({
  id: "ADDITIVE_MANUFACTURING_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["NANOTECHNOLOGY_v2"],
  unlocks: ["RAPID_AIRSHIPS_v3"],
});

// MONOPOLY -------------------------

const MR_v3 = defaultCard({
  id: "MR_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
});

const DEFENSE_v3 = defaultCard({
  id: "DEFENSE_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["AI_v3", "CRISPR_v3"],
});

const DRONES_v3 = defaultCard({
  id: "DRONES_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["COMPOSITES_v3"],
});

const NUCLEAR_v3 = defaultCard({
  id: "NUCLEAR_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["COMPOSITES_v3"],
});

const SYNTHETIC_BIOLOGY_v3 = defaultCard({
  id: "SYNTHETIC_BIOLOGY_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["QUANTUM_COMPUTING_v3", "CRISPR_v3"],
});

const HOLOGRAPHIC_v3 = defaultCard({
  id: "HOLOGRAPHIC_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["AI_v3", "EDGE_COMPUTING_v3"],
});

const QUANTUM_COMPUTING_v3 = defaultCard({
  id: "QUANTUM_COMPUTING_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["QUANTUM_COMPUTING_v2", "EDGE_COMPUTING_v3"],
});

const AUTONOMOUS_VEHICLES_v3 = defaultCard({
  id: "AUTONOMOUS_VEHICLES_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["AI_v3", "ELECTRIC_VEHICLES_v3"],
});

const NANOTECHNOLOGY_v3 = defaultCard({
  id: "NANOTECHNOLOGY_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["AI_v3", "SPACE_v3", "QUANTUM_COMPUTING_v3"],
});

const HYDROGEN_v3 = defaultCard({
  id: "HYDROGEN_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["DESALINIZATION_v3"],
});

const BIOMEDICAL_v3 = defaultCard({
  id: "BIOMEDICAL_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["SUPERCONDUCTORS_v3"],
});

const RAPID_AIRSHIPS_v3 = defaultCard({
  id: "RAPID_AIRSHIPS_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: [
    "SUPERCONDUCTORS_v3",
    "SOLAR_v3",
    "ADDITIVE_MANUFACTURING_v3",
  ],
});

export const techTree: TechCard[] = [
  // MICRO ----------------------------
  SOLAR_v1,
  NUCLEAR_v1,
  SOCIAL_MEDIA_v1,
  E_COMMERCE_v1,
  VR_v1,
  _5G_v1,
  SUPPLY_CHAIN_v1,
  IOT_v1,
  ADVERTISING_v1,
  CLOUD_COMPUTING_v1,
  _3D_PRINTING_v1,
  WIND_v1,
  // SMALL ----------------------------
  SPACE_v1,
  SOCIAL_MEDIA_v2,
  SUPPLY_CHAIN_v2,
  DRONES_v1,
  CYBERSECURITY_v1,
  CLOUD_COMPUTING_v2,
  BIOMEDICAL_v1,
  PFOF_v1,
  BLOCKCHAIN_v1,
  DEFENSE_v1,
  COMPOSITES_v1,
  ADDITIVE_MANUFACTURING_v1,
  // MEDIUM ---------------------------
  EDGE_COMPUTING_v1,
  E_COMMERCE_v2,
  MR_v1,
  AR_v1,
  VR_v2,
  DESALINIZATION_v1,
  CRISPR_v1,
  BACTERIOPHAGES_v1,
  HFT_v1,
  CRYPTOCURRENCY_v1,
  ELECTRIC_VEHICLES_v1,
  // LARGE ----------------------------
  SPACE_v2,
  WIND_v2,
  IOT_v2,
  AR_v2,
  SOLAR_v2,
  CYBERSECURITY_v2,
  _3D_PRINTING_v2,
  _5G_v2,
  SYNTHETIC_BIOLOGY_v1,
  CRYPTOCURRENCY_v2,
  NUCLEAR_v2,
  BLOCKCHAIN_v2,
  // NATIONAL -------------------------
  ADDITIVE_MANUFACTURING_v2,
  AI_v1,
  EDGE_COMPUTING_v2,
  ADVERTISING_v2,
  E_COMMERCE_v3,
  SUPPLY_CHAIN_v3,
  CLOUD_COMPUTING_v3,
  AUTONOMOUS_VEHICLES_v1,
  SUPERCONDUCTORS_v1,
  HYDROGEN_v1,
  HFT_v2,
  PFOF_v2,
  // GLOBAL ---------------------------
  AID_v2,
  RAPID_AIRSHIPS_v1,
  HOLOGRAPHIC_v1,
  BIOMEDICAL_v2,
  BACTERIOPHAGES_v2,
  CRISPR_v2,
  AR_v3,
  SOCIAL_MEDIA_v3,
  VR_v3,
  NANOTECHNOLOGY_v1,
  COMPOSITES_v2,
  PFOF_v3,
  // DOMINANT -------------------------
  SYNTHETIC_BIOLOGY_v2,
  SUPERCONDUCTORS_v2,
  IOT_v3,
  QUANTUM_COMPUTING_v1,
  _3D_PRINTING_v3,
  MR_v2,
  BLOCKCHAIN_v3,
  ELECTRIC_VEHICLES_v2,
  DESALINIZATION_v2,
  DEFENSE_v2,
  _5G_v3,
  DRONES_v2,
  // TOP_100 --------------------------
  AID_v3,
  ADVERTISING_v3,
  BACTERIOPHAGES_v3,
  AI_v2,
  NANOTECHNOLOGY_v2,
  CRYPTOCURRENCY_v3,
  CYBERSECURITY_v3,
  RAPID_AIRSHIPS_v2,
  AUTONOMOUS_VEHICLES_v2,
  HFT_v3,
  HOLOGRAPHIC_v2,
  HYDROGEN_v2,
  WIND_v3,
  // TOP_10 ---------------------------
  AID_v2,
  CRISPR_v3,
  COMPOSITES_v3,
  QUANTUM_COMPUTING_v2,
  SPACE_v3,
  ELECTRIC_VEHICLES_v3,
  EDGE_COMPUTING_v3,
  AI_v3,
  DESALINIZATION_v3,
  SUPERCONDUCTORS_v3,
  SOLAR_v3,
  ADDITIVE_MANUFACTURING_v3,
  // MONOPOLY -------------------------
  MR_v3,
  DEFENSE_v3,
  DRONES_v3,
  NUCLEAR_v3,
  SYNTHETIC_BIOLOGY_v3,
  HOLOGRAPHIC_v3,
  QUANTUM_COMPUTING_v3,
  AUTONOMOUS_VEHICLES_v3,
  NANOTECHNOLOGY_v3,
  HYDROGEN_v3,
  BIOMEDICAL_v3,
  RAPID_AIRSHIPS_v3,
];

export const techVersionList = techTree.map((card) => card.id);
