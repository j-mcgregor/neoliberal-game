import { ActionTypeEnum } from "../../src";
import { createAction } from "../../src/lib/actions/create-action";

// Usage example:
const acquireAction = createAction(ActionTypeEnum.ACQUIRE, {
  company_acquired: "TechCorp",
  cost: 1000000,
});

const turnAction = createAction(ActionTypeEnum.TURN, {
  // Add properties specific to TURN action
  score_factor: 1.5,
});

const goPublicAction = createAction(ActionTypeEnum.GO_PUBLIC, {
  company: "TechCorp",
  shares: 1000000,
  price_per_share: 10,
  index: "ftse",
});

console.log(JSON.stringify(goPublicAction));
