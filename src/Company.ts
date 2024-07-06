import { CompanyTypeEnum } from ".";
import type { ICompany, ICountry, IProduct } from ".";

export class Company implements ICompany {
  name: string;
  company_type: CompanyTypeEnum;
  countries: ICountry[];
  financials: ICompany["financials"];
  products: IProduct[];
  score: number;
  starting_country: ICountry;

  static default_financials: ICompany["financials"] = {
    market_cap: 0,
    net_loss: 0,
    net_revenue: 0,
    share_price: 0,
    tax_annual: 0,
    valuation: 0,
  };

  constructor(
    name: string,
    starting_country: ICountry,
    options: Omit<ICompany, "name" | "starting_country"> = {
      financials: Company.default_financials,
      company_type: CompanyTypeEnum.MANUFACTURING,
      countries: [starting_country],
      products: [],
      score: 0,
    }
  ) {
    this.name = name;
    this.starting_country = starting_country;

    this.financials = options.financials;
    this.company_type = options.company_type;
    this.countries = options.countries;
    this.products = options.products;
    this.score = options.score;
  }
}
