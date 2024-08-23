import { TechnologyEnum } from "..";
import type { TechCard } from "./Difficulty.constants";
import { CompanySize } from "./Difficulty.constants";

const defaultCard = ({
  id,
  unlocked_at_size,
  unlocked_by_tech = [],
  unlocks = [],
}: {
  id: TechCard["id"];
  unlocked_at_size: TechCard["unlocked_at_size"];
  unlocked_by_tech?: TechCard["unlocked_by_tech"];
  unlocks?: TechCard["unlocks"];
}) => {
  const name = id.split("_v")[0] as keyof typeof TechnologyEnum;
  const v = Number(id.split("_v")[1]);

  return {
    _v: v,
    id,
    name: TechnologyEnum[name],
    unlocked: false,
    enabled: false,
    in_development: false,
    description: "",
    unlocked_at_size,
    unlocked_by_tech,
    unlocks,
    research_needed: {
      EASY: {
        points: 0,
        turns: 0,
      },
      NORMAL: {
        points: 0,
        turns: 0,
      },
      HARD: {
        points: 0,
        turns: 0,
      },
      REAL_WORLD: {
        points: 0,
        turns: 0,
      },
    },
  } as TechCard;
};

const SPACE_1 = defaultCard({
  id: "SPACE_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["EDGE_COMPUTING_v1", "SPACE_v2"],
  unlocked_by_tech: ["SOLAR_v1", "NUCLEAR_v1"],
});

const SPACE_2 = defaultCard({
  id: "SPACE_v2",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["ADDITIVE_MANUFACTURING_v2", "AI_v1"],
  unlocked_by_tech: ["SPACE_v1"],
});

const SOLAR_1 = defaultCard({
  id: "SOLAR_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["SPACE_v1"],
});

const SOLAR_2 = defaultCard({
  id: "SOLAR_v2",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocks: ["AUTONOMOUS_VEHICLES_v1"],
  unlocked_by_tech: ["DESALINIZATION_v1"],
});

const NUCLEAR_1 = defaultCard({
  id: "NUCLEAR_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["SPACE_v1"],
});
const NUCLEAR_2 = defaultCard({
  id: "NUCLEAR_v2",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["HYDROGEN_v1"],
});

const SOCIAL_MEDIA_2 = defaultCard({
  id: "SOCIAL_MEDIA_v2",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["E_COMMERCE_v2"],
  unlocked_by_tech: ["SOCIAL_MEDIA_v1", "E_COMMERCE_v1"],
});

const SOCIAL_MEDIA_1 = defaultCard({
  id: "SOCIAL_MEDIA_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["SOCIAL_MEDIA_v2"],
});

const SUPPLY_CHAIN_2 = defaultCard({
  id: "SUPPLY_CHAIN_v2",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["SOCIAL_MEDIA_v2"],
});

const SUPPLY_CHAIN_3 = defaultCard({
  id: "SUPPLY_CHAIN_v3",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocks: ["SOCIAL_MEDIA_v3"],
  unlocked_by_tech: ["_3D_PRINTING_v2"],
});

const DRONES_1 = defaultCard({
  id: "DRONES_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["MR_v1", "AR_v1"],
  unlocked_by_tech: ["VR_v1", "_5G_v1", "SUPPLY_CHAIN_v1"],
});

const CYBERSECURITY_1 = defaultCard({
  id: "CYBERSECURITY_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["EDGE_COMPUTING_v1"],
  unlocked_by_tech: ["IOT_v1"],
});

const CYBERSECURITY_2 = defaultCard({
  id: "CYBERSECURITY_v2",
  unlocked_at_size: CompanySize.LARGE,
  unlocks: ["EDGE_COMPUTING_v2", "CLOUD_COMPUTING_v3"],
});

const CLOUD_COMPUTING_2 = defaultCard({
  id: "CLOUD_COMPUTING_v2",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["EDGE_COMPUTING_v1"],
  unlocked_by_tech: ["IOT_v1", "ADVERTISING_v1", "CLOUD_COMPUTING_v1"],
});

const CLOUD_COMPUTING_3 = defaultCard({
  id: "CLOUD_COMPUTING_v3",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocked_by_tech: ["CYBERSECURITY_v2"],
});

const SUPPLY_CHAIN_1 = defaultCard({
  id: "SUPPLY_CHAIN_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["DRONES_v1"],
});

const E_COMMERCE_1 = defaultCard({
  id: "E_COMMERCE_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["SOCIAL_MEDIA_v2", "SUPPLY_CHAIN_v2"],
});

const E_COMMERCE_2 = defaultCard({
  id: "E_COMMERCE_v2",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocked_by_tech: ["SOCIAL_MEDIA_v2", "SUPPLY_CHAIN_v2"],
  unlocks: ["IOT_v2"],
});

const E_COMMERCE_3 = defaultCard({
  id: "E_COMMERCE_v3",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocked_by_tech: ["_3D_PRINTING_v2"],
  unlocks: ["SOCIAL_MEDIA_v3"],
});

const VR_1 = defaultCard({
  id: "VR_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["DRONES_v1"],
});

const VR_2 = defaultCard({
  id: "VR_v2",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocks: ["AR_v2"],
});

const MR_1 = defaultCard({
  id: "MR_v1",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocks: ["AR_v2"],
  unlocked_by_tech: ["DRONES_v1"],
});

const AR_1 = defaultCard({
  id: "AR_v1",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocks: ["AR_v2"],
  unlocked_by_tech: ["DRONES_v1"],
});

const AR_2 = defaultCard({
  id: "AR_v2",
  unlocked_at_size: CompanySize.LARGE,
  unlocks: ["AI_v1"],
  unlocked_by_tech: ["AR_v1", "MR_v1", "VR_v2"],
});

const _5G_1 = defaultCard({
  id: "_5G_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["DRONES_v1"],
});

const _5G_2 = defaultCard({
  id: "_5G_v2",
  unlocked_at_size: CompanySize.LARGE,
  unlocks: ["AUTONOMOUS_VEHICLES_v1", "SUPERCONDUCTORS_v1"],
});

const IOT_1 = defaultCard({
  id: "IOT_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["CYBERSECURITY_v1", "CLOUD_COMPUTING_v2"],
});

const IOT_2 = defaultCard({
  id: "IOT_v2",
  unlocked_at_size: CompanySize.LARGE,
  unlocks: ["AUTONOMOUS_VEHICLES_v1"],
  unlocked_by_tech: ["E_COMMERCE_v2"],
});

const ADVERTISING_1 = defaultCard({
  id: "ADVERTISING_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["CLOUD_COMPUTING_v2"],
});

const ADVERTISING_2 = defaultCard({
  id: "ADVERTISING_v2",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocks: ["SOCIAL_MEDIA_v3"],
});

const CLOUD_COMPUTING_1 = defaultCard({
  id: "CLOUD_COMPUTING_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["CLOUD_COMPUTING_v2"],
});

const DEFENSE_1 = defaultCard({
  id: "DEFENSE_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["ELECTRIC_VEHICLES_v1"],
  unlocked_by_tech: ["_3D_PRINTING_v1"],
});

const COMPOSITES_1 = defaultCard({
  id: "COMPOSITES_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["ELECTRIC_VEHICLES_v1"],
  unlocked_by_tech: ["_3D_PRINTING_v1"],
});

const ADDITIVE_MANUFACTURING_1 = defaultCard({
  id: "ADDITIVE_MANUFACTURING_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["ELECTRIC_VEHICLES_v1"],
  unlocked_by_tech: ["_3D_PRINTING_v1", "WIND_v1"],
});

const ADDITIVE_MANUFACTURING_2 = defaultCard({
  id: "ADDITIVE_MANUFACTURING_v2",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocks: ["RAPID_AIRSHIPS_v1"],
  unlocked_by_tech: ["_3D_PRINTING_v1", "WIND_v1"],
});

const _3D_PRINTING_1 = defaultCard({
  id: "_3D_PRINTING_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["DEFENSE_v1", "COMPOSITES_v1", "ADDITIVE_MANUFACTURING_v1"],
});

const _3D_PRINTING_2 = defaultCard({
  id: "_3D_PRINTING_v2",
  unlocked_at_size: CompanySize.LARGE,
  unlocks: ["E_COMMERCE_v3", "SUPPLY_CHAIN_v3"],
});

const WIND_1 = defaultCard({
  id: "WIND_v1",
  unlocked_at_size: CompanySize.MICRO,
  unlocks: ["ADDITIVE_MANUFACTURING_v1"],
});

const WIND_2 = defaultCard({
  id: "WIND_v2",
  unlocked_at_size: CompanySize.LARGE,
  unlocks: ["EDGE_COMPUTING_v2"],
});

const BIOMEDICAL_1 = defaultCard({
  id: "BIOMEDICAL_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["BACTERIOPHAGES_v1"],
});

const PFOF_1 = defaultCard({
  id: "PFOF_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["HFT_v1"],
});

const BACTERIOPHAGES_1 = defaultCard({
  id: "BACTERIOPHAGES_v1",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocks: ["SYNTHETIC_BIOLOGY_v1"],
  unlocked_by_tech: ["BIOMEDICAL_v1"],
});

const BLOCKCHAIN_1 = defaultCard({
  id: "BLOCKCHAIN_v1",
  unlocked_at_size: CompanySize.SMALL,
  unlocks: ["HFT_v1", "CRYPTOCURRENCY_v1"],
});

const BLOCKCHAIN_2 = defaultCard({
  id: "BLOCKCHAIN_v2",
  unlocked_at_size: CompanySize.LARGE,
  unlocks: ["PFOF_v2"],
  unlocked_by_tech: ["CRYPTOCURRENCY_v1"],
});

const EDGE_COMPUTING_1 = defaultCard({
  id: "EDGE_COMPUTING_v1",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocked_by_tech: ["SPACE_v1", "CYBERSECURITY_v1", "CLOUD_COMPUTING_v2"],
});

const EDGE_COMPUTING_2 = defaultCard({
  id: "EDGE_COMPUTING_v2",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocked_by_tech: ["WIND_v2", "CYBERSECURITY_v2"],
});

const SYNTHETIC_BIOLOGY_1 = defaultCard({
  id: "SYNTHETIC_BIOLOGY_v1",
  unlocked_at_size: CompanySize.LARGE,
  unlocked_by_tech: ["CRISPR_v1", "BACTERIOPHAGES_v1"],
  unlocks: ["HYDROGEN_v1"],
});

const DESALINIZATION_1 = defaultCard({
  id: "DESALINIZATION_v1",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocks: ["SOLAR_v2"],
});

const CRISPR_1 = defaultCard({
  id: "CRISPR_v1",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocks: ["SYNTHETIC_BIOLOGY_v1"],
});

const HFT_1 = defaultCard({
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

const ELECTRIC_VEHICLES_1 = defaultCard({
  id: "ELECTRIC_VEHICLES_v1",
  unlocked_at_size: CompanySize.MEDIUM,
  unlocked_by_tech: [
    "COMPOSITES_v1",
    "DEFENSE_v1",
    "ADDITIVE_MANUFACTURING_v1",
  ],
});

const AI_1 = defaultCard({
  id: "AI_v1",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocks: ["HOLOGRAPHIC_v1", "BIOMEDICAL_v2", "AR_v3", "NANOTECHNOLOGY_v1"],
  unlocked_by_tech: ["SPACE_v2", "AR_v2"],
});

const AUTONOMOUS_VEHICLES_1 = defaultCard({
  id: "AUTONOMOUS_VEHICLES_v1",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocks: ["VR_v3"],
  unlocked_by_tech: ["IOT_v2", "_5G_v2", "SOLAR_v2"],
});

const SUPERCONDUCTORS_1 = defaultCard({
  id: "SUPERCONDUCTORS_v1",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocked_by_tech: ["_5G_v2"],
  unlocks: ["NANOTECHNOLOGY_v1"],
});

const HYDROGEN_1 = defaultCard({
  id: "HYDROGEN_v1",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocked_by_tech: ["NUCLEAR_v2", "SYNTHETIC_BIOLOGY_v1"],
  unlocks: ["COMPOSITES_v2"],
});

const HFT_2 = defaultCard({
  id: "HFT_v2",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocked_by_tech: ["CRYPTOCURRENCY_v2"],
  unlocks: ["PFOF_v3"],
});

const PFOF_2 = defaultCard({
  id: "PFOF_v2",
  unlocked_at_size: CompanySize.NATIONAL,
  unlocks: ["PFOF_v3"],
  unlocked_by_tech: ["CRYPTOCURRENCY_v2", "BLOCKCHAIN_v2"],
});

// GLOBAL ---------------------------

const AID_2 = defaultCard({
  id: "AID_v2",
  unlocked_at_size: CompanySize.GLOBAL,
});

const RAPID_AIRSHIPS_1 = defaultCard({
  id: "RAPID_AIRSHIPS_v1",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["ADDITIVE_MANUFACTURING_v2"],
  unlocks: ["_3D_PRINTING_v3", "DEFENSE_v2"],
});

const HOLOGRAPHIC_1 = defaultCard({
  id: "HOLOGRAPHIC_v1",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["AI_v1"],
  unlocks: ["MR_v2"],
});

const BIOMEDICAL_2 = defaultCard({
  id: "BIOMEDICAL_v2",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["AI_v1"],
  unlocks: ["SYNTHETIC_BIOLOGY_v2"],
});

const BACTERIOPHAGES_2 = defaultCard({
  id: "BACTERIOPHAGES_v2",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocks: ["SYNTHETIC_BIOLOGY_v2"],
});

const CRISPR_2 = defaultCard({
  id: "CRISPR_v2",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocks: ["SYNTHETIC_BIOLOGY_v2"],
});

const AR_3 = defaultCard({
  id: "AR_v3",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["AI_v1"],
  unlocks: ["MR_v2"],
});

const SOCIAL_MEDIA_3 = defaultCard({
  id: "SOCIAL_MEDIA_v3",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["E_COMMERCE_v3", "SUPPLY_CHAIN_v3", "ADVERTISING_v2"],
});

const VR_3 = defaultCard({
  id: "VR_v3",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["AUTONOMOUS_VEHICLES_v1"],
  unlocks: ["MR_v2"],
});

const NANOTECHNOLOGY_1 = defaultCard({
  id: "NANOTECHNOLOGY_v1",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["AI_v1", "SUPERCONDUCTORS_v1"],
  unlocks: ["IOT_v3", "QUANTUM_COMPUTING_v1"],
});

const COMPOSITES_2 = defaultCard({
  id: "COMPOSITES_v2",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["HYDROGEN_v1"],
  unlocks: ["ELECTRIC_VEHICLES_v2", "DEFENSE_v2", "DESALINIZATION_v2"],
});

const PFOF_3 = defaultCard({
  id: "PFOF_v3",
  unlocked_at_size: CompanySize.GLOBAL,
  unlocked_by_tech: ["PFOF_v2", "HFT_v2"],
  unlocks: ["_5G_v3", "BLOCKCHAIN_v3"],
});

// DOMINANT ---------------------------

const SYNTHETIC_BIOLOGY_2 = defaultCard({
  id: "SYNTHETIC_BIOLOGY_v2",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["BIOMEDICAL_v2", "BACTERIOPHAGES_v2", "CRISPR_v2"],
  unlocks: ["BACTERIOPHAGES_v3"],
});

const SUPERCONDUCTORS_2 = defaultCard({
  id: "SUPERCONDUCTORS_v2",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocks: ["NANOTECHNOLOGY_v2", "AI_v2"],
});

const IOT_3 = defaultCard({
  id: "IOT_v3",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["NANOTECHNOLOGY_v1"],
  unlocks: ["NANOTECHNOLOGY_v2"],
});

const QUANTUM_COMPUTING_1 = defaultCard({
  id: "QUANTUM_COMPUTING_v1",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["NANOTECHNOLOGY_v1", "SUPERCONDUCTORS_v2"],
  unlocks: ["CYBERSECURITY_v3", "CRYPTOCURRENCY_v2", "NANOTECHNOLOGY_v2"],
});

const _3D_PRINTING_3 = defaultCard({
  id: "_3D_PRINTING_v3",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["RAPID_AIRSHIPS_v1"],
  unlocks: ["RAPID_AIRSHIPS_v2", "AUTONOMOUS_VEHICLES_v2"],
});

const MR_2 = defaultCard({
  id: "MR_v2",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["HOLOGRAPHIC_v1", "AR_v3", "VR_v3"],
  unlocks: ["HOLOGRAPHIC_v2"],
});

const BLOCKCHAIN_3 = defaultCard({
  id: "BLOCKCHAIN_v3",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["PFOF_v3"],
  unlocks: ["HFT_v3"],
});

const ELECTRIC_VEHICLES_2 = defaultCard({
  id: "ELECTRIC_VEHICLES_v2",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["COMPOSITES_v2"],
  unlocks: ["HYDROGEN_v2", "AUTONOMOUS_VEHICLES_v2"],
});

const DESALINIZATION_2 = defaultCard({
  id: "DESALINIZATION_v2",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["CRISPR_v1", "COMPOSITES_v2"],
  unlocks: ["HYDROGEN_v2"],
});

const DEFENSE_2 = defaultCard({
  id: "DEFENSE_v2",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["RAPID_AIRSHIPS_v1", "COMPOSITES_v2"],
  unlocks: ["HOLOGRAPHIC_v2"],
});

const _5G_3 = defaultCard({
  id: "_5G_v3",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocked_by_tech: ["PFOF_v3"],
  unlocks: ["AUTONOMOUS_VEHICLES_v2"],
});

const DRONES_2 = defaultCard({
  id: "DRONES_v2",
  unlocked_at_size: CompanySize.DOMINANT,
  unlocks: ["DRONES_v2"],
});

// TOP_100 --------------------------

const ADVERTISING_3 = defaultCard({
  id: "ADVERTISING_v3",
  unlocked_at_size: CompanySize.TOP_100,
});

const BACTERIOPHAGES_3 = defaultCard({
  id: "BACTERIOPHAGES_v3",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["SYNTHETIC_BIOLOGY_v2"],
  unlocks: ["CRISPR_v3"],
});

const AI_2 = defaultCard({
  id: "AI_v2",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["SPACE_v3", "QUANTUM_COMPUTING_v2"],
  unlocks: ["SUPERCONDUCTORS_v2"],
});

const NANOTECHNOLOGY_2 = defaultCard({
  id: "NANOTECHNOLOGY_v2",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["SUPERCONDUCTORS_v2", "IOT_v3", "QUANTUM_COMPUTING_v1"],
  unlocks: ["ADDITIVE_MANUFACTURING_v3", "SUPERCONDUCTORS_v3", "COMPOSITES_v3"],
});

const CRYPTOCURRENCY_3 = defaultCard({
  id: "CRYPTOCURRENCY_v3",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["QUANTUM_COMPUTING_v1"],
  unlocks: ["SUPERCONDUCTORS_v3"],
});

const CYBERSECURITY_3 = defaultCard({
  id: "CYBERSECURITY_v3",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["QUANTUM_COMPUTING_v1"],
  unlocks: ["EDGE_COMPUTING_v3", "QUANTUM_COMPUTING_v2"],
});

const RAPID_AIRSHIPS_2 = defaultCard({
  id: "RAPID_AIRSHIPS_v2",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["_3D_PRINTING_v3"],
  unlocks: ["ELECTRIC_VEHICLES_v3"],
});

const AUTONOMOUS_VEHICLES_2 = defaultCard({
  id: "AUTONOMOUS_VEHICLES_v2",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["_5G_v3", "ELECTRIC_VEHICLES_v2", "_3D_PRINTING_v3"],
  unlocks: ["AI_v3"],
});

const HFT_3 = defaultCard({
  id: "HFT_v3",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["BLOCKCHAIN_v2"],
});

const HOLOGRAPHIC_2 = defaultCard({
  id: "HOLOGRAPHIC_v2",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["DEFENSE_v2", "MR_v2"],
});

const HYDROGEN_2 = defaultCard({
  id: "HYDROGEN_v2",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["ELECTRIC_VEHICLES_v2", "DESALINIZATION_v2"],
  unlocks: ["SOLAR_v3", "DESALINIZATION_v3", "AI_v3", "SPACE_v3"],
});

const WIND_3 = defaultCard({
  id: "WIND_v3",
  unlocked_at_size: CompanySize.TOP_100,
  unlocked_by_tech: ["DRONES_v2"],
  unlocks: ["SOLAR_v3"],
});

// TOP_10 ---------------------------

const AI_3 = defaultCard({
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

const AID_3 = defaultCard({
  id: "AID_v3",
  unlocked_at_size: CompanySize.TOP_10,
});

const CRISPR_3 = defaultCard({
  id: "CRISPR_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["BACTERIOPHAGES_v3"],
  unlocks: ["SYNTHETIC_BIOLOGY_v3", "DEFENSE_v3"],
});

const COMPOSITES_3 = defaultCard({
  id: "COMPOSITES_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["NANOTECHNOLOGY_v2"],
  unlocks: ["NUCLEAR_v3", "DRONES_v3"],
});

const QUANTUM_COMPUTING_2 = defaultCard({
  id: "QUANTUM_COMPUTING_v2",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["CYBERSECURITY_v3", "AI_v2"],
  unlocks: [
    "NANOTECHNOLOGY_v3",
    "QUANTUM_COMPUTING_v3",
    "SYNTHETIC_BIOLOGY_v3",
  ],
});

const SPACE_3 = defaultCard({
  id: "SPACE_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["AI_v2", "HYDROGEN_v2"],
  unlocks: ["NANOTECHNOLOGY_v3"],
});

const ELECTRIC_VEHICLES_3 = defaultCard({
  id: "ELECTRIC_VEHICLES_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["RAPID_AIRSHIPS_v2"],
  unlocks: ["AUTONOMOUS_VEHICLES_v3"],
});

const EDGE_COMPUTING_3 = defaultCard({
  id: "EDGE_COMPUTING_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["CYBERSECURITY_v3"],
  unlocks: ["HOLOGRAPHIC_v3", "QUANTUM_COMPUTING_v3"],
});

const DESALINIZATION_3 = defaultCard({
  id: "DESALINIZATION_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["HYDROGEN_v2"],
  unlocks: ["HYDROGEN_v3"],
});

const SUPERCONDUCTORS_3 = defaultCard({
  id: "SUPERCONDUCTORS_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["CRYPTOCURRENCY_v3", "NANOTECHNOLOGY_v2"],
  unlocks: ["RAPID_AIRSHIPS_v3", "BIOMEDICAL_v3", "NANOTECHNOLOGY_v3"],
});

const SOLAR_3 = defaultCard({
  id: "SOLAR_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["HYDROGEN_v2", "WIND_v3"],
  unlocks: ["RAPID_AIRSHIPS_v3"],
});

const ADDITIVE_MANUFACTURING_3 = defaultCard({
  id: "ADDITIVE_MANUFACTURING_v3",
  unlocked_at_size: CompanySize.TOP_10,
  unlocked_by_tech: ["NANOTECHNOLOGY_v2"],
  unlocks: ["RAPID_AIRSHIPS_v3"],
});

// MONOPOLY -------------------------

const MR_3 = defaultCard({
  id: "MR_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
});

const DEFENSE_3 = defaultCard({
  id: "DEFENSE_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["AI_v3", "CRISPR_v3"],
});

const DRONES_3 = defaultCard({
  id: "DRONES_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["COMPOSITES_v3"],
});

const NUCLEAR_3 = defaultCard({
  id: "NUCLEAR_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["COMPOSITES_v3"],
});

const SYNTHETIC_BIOLOGY_3 = defaultCard({
  id: "SYNTHETIC_BIOLOGY_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["QUANTUM_COMPUTING_v3", "CRISPR_v3"],
});

const HOLOGRAPHIC_3 = defaultCard({
  id: "HOLOGRAPHIC_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["AI_v3", "EDGE_COMPUTING_v3"],
});

const QUANTUM_COMPUTING_3 = defaultCard({
  id: "QUANTUM_COMPUTING_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["QUANTUM_COMPUTING_v2", "EDGE_COMPUTING_v3"],
});

const AUTONOMOUS_VEHICLES_3 = defaultCard({
  id: "AUTONOMOUS_VEHICLES_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["AI_v3", "ELECTRIC_VEHICLES_v3"],
});

const NANOTECHNOLOGY_3 = defaultCard({
  id: "NANOTECHNOLOGY_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["AI_v3", "SPACE_v3", "QUANTUM_COMPUTING_v3"],
});

const HYDROGEN_3 = defaultCard({
  id: "HYDROGEN_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["DESALINIZATION_v3"],
});

const BIOMEDICAL_3 = defaultCard({
  id: "BIOMEDICAL_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: ["SUPERCONDUCTORS_v3"],
});

const RAPID_AIRSHIPS_3 = defaultCard({
  id: "RAPID_AIRSHIPS_v3",
  unlocked_at_size: CompanySize.MONOPOLY,
  unlocked_by_tech: [
    "SUPERCONDUCTORS_v3",
    "SOLAR_v3",
    "ADDITIVE_MANUFACTURING_v3",
  ],
});

const TechTree: TechCard[] = [
  // MICRO ----------------------------
  SOLAR_1,
  NUCLEAR_1,
  SOCIAL_MEDIA_1,
  E_COMMERCE_1,
  VR_1,
  _5G_1,
  SUPPLY_CHAIN_1,
  IOT_1,
  ADVERTISING_1,
  CLOUD_COMPUTING_1,
  _3D_PRINTING_1,
  WIND_1,
  // SMALL ----------------------------
  SPACE_1,
  SOCIAL_MEDIA_2,
  SUPPLY_CHAIN_2,
  DRONES_1,
  CYBERSECURITY_1,
  CLOUD_COMPUTING_2,
  BIOMEDICAL_1,
  PFOF_1,
  BLOCKCHAIN_1,
  DEFENSE_1,
  COMPOSITES_1,
  ADDITIVE_MANUFACTURING_1,
  // MEDIUM ---------------------------
  EDGE_COMPUTING_1,
  E_COMMERCE_2,
  MR_1,
  AR_1,
  VR_2,
  DESALINIZATION_1,
  CRISPR_1,
  BACTERIOPHAGES_1,
  HFT_1,
  CRYPTOCURRENCY_v1,
  ELECTRIC_VEHICLES_1,
  // LARGE ----------------------------
  SPACE_2,
  WIND_2,
  IOT_2,
  AR_2,
  SOLAR_2,
  CYBERSECURITY_2,
  _3D_PRINTING_2,
  _5G_2,
  SYNTHETIC_BIOLOGY_1,
  CRYPTOCURRENCY_v2,
  NUCLEAR_2,
  BLOCKCHAIN_2,
  // NATIONAL -------------------------
  ADDITIVE_MANUFACTURING_2,
  AI_1,
  EDGE_COMPUTING_2,
  ADVERTISING_2,
  E_COMMERCE_3,
  SUPPLY_CHAIN_3,
  CLOUD_COMPUTING_3,
  AUTONOMOUS_VEHICLES_1,
  SUPERCONDUCTORS_1,
  HYDROGEN_1,
  HFT_2,
  PFOF_2,
  // GLOBAL ---------------------------
  AID_2,
  RAPID_AIRSHIPS_1,
  HOLOGRAPHIC_1,
  BIOMEDICAL_2,
  BACTERIOPHAGES_2,
  CRISPR_2,
  AR_3,
  SOCIAL_MEDIA_3,
  VR_3,
  NANOTECHNOLOGY_1,
  COMPOSITES_2,
  PFOF_3,
  // DOMINANT -------------------------
  SYNTHETIC_BIOLOGY_2,
  SUPERCONDUCTORS_2,
  IOT_3,
  QUANTUM_COMPUTING_1,
  _3D_PRINTING_3,
  MR_2,
  BLOCKCHAIN_3,
  ELECTRIC_VEHICLES_2,
  DESALINIZATION_2,
  DEFENSE_2,
  _5G_3,
  DRONES_2,
  // TOP_100 --------------------------
  AID_3,
  ADVERTISING_3,
  BACTERIOPHAGES_3,
  AI_2,
  NANOTECHNOLOGY_2,
  CRYPTOCURRENCY_3,
  CYBERSECURITY_3,
  RAPID_AIRSHIPS_2,
  AUTONOMOUS_VEHICLES_2,
  HFT_3,
  HOLOGRAPHIC_2,
  HYDROGEN_2,
  WIND_3,
  // TOP_10 ---------------------------
  AID_2,
  CRISPR_3,
  COMPOSITES_3,
  QUANTUM_COMPUTING_2,
  SPACE_3,
  ELECTRIC_VEHICLES_3,
  EDGE_COMPUTING_3,
  AI_3,
  DESALINIZATION_3,
  SUPERCONDUCTORS_3,
  SOLAR_3,
  ADDITIVE_MANUFACTURING_3,
  // MONOPOLY -------------------------
  MR_3,
  DEFENSE_3,
  DRONES_3,
  NUCLEAR_3,
  SYNTHETIC_BIOLOGY_3,
  HOLOGRAPHIC_3,
  QUANTUM_COMPUTING_3,
  AUTONOMOUS_VEHICLES_3,
  NANOTECHNOLOGY_3,
  HYDROGEN_3,
  BIOMEDICAL_3,
  RAPID_AIRSHIPS_3,
];
