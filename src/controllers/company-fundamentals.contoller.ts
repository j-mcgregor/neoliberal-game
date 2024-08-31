import type { TechAndVersion } from "..";
import { techVersionList } from "../constants/tech-tree";
import type { createAction } from "../lib/actions/create-action";
import { Root } from "../root";

export class CompanyFundamentalsController {
  root: Root;
  constructor(_root: Root) {
    this.root = _root;
  }

  async update(id: string, action: ReturnType<typeof createAction>) {
    const companyFundamentalsModel = this.root.getModel(
      "CompanyFundamentalsModel"
    );

    if (!companyFundamentalsModel) {
      throw new Error("CompanyFundamentalsModel not found");
    }

    return await companyFundamentalsModel.update(id, action);
  }

  async selectTechnology(id: string, technology: { id: TechAndVersion }) {
    const companyFundamentalsModel = this.root.getModel(
      "CompanyFundamentalsModel"
    );

    if (!companyFundamentalsModel) {
      throw new Error("CompanyFundamentalsModel not found");
    }

    if (!technology?.id || !techVersionList.includes(technology.id)) {
      throw new Error("Technology is required");
    }

    return await companyFundamentalsModel.selectTechnology(id, technology?.id);
  }
}
