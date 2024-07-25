# Example Gameplay

- User starts the game
  - Route: POST /api/games/start
- User makes moves within a turn
  - Route: POST /api/companies/:id/actions
  - Each move can have either an instant or a delayed impact on stats
- User ends their turn
  - Route: PUT /api/games/:id/turn
- After a turn, the game needs to calculate the impact of the moves
  - Route: POST /api/games/:id/turn

There should be certain breakthrough / bonus scores. For example:
- your stock price reaches an amount for the first time
- you discover a technology
- you acquire a company for the first time
- your net profit reaches an amount for the first time
- you assassinate an increasingly important series of people up until a president
- you bribe an increasingly important series of people up until a president

Each level enables certain perks.
Each perk increases score_factor
A company can have:
- influence
- wealth
- technology
- stock price

Need to make a company_fundamentals table
- domestic_influence: float
- foreign_influence: float
- technology[{name: string; acquired: number}]: json[]
- acquisitions[{source: 'foreign' | 'domestic', company_id, cost, company_size}]: json[]
- stock_price: float
- shares_outstanding: int
- net_profit: float
- revenue: float
- expenses: float
- cash: float
- debt: float
- assets: float
- liabilities: float
- company_size: int
- #for future
- short_interest: float
- portfolio: json[]