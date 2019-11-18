# Capped Voting

Capped Voting is a vote scheme with weight determined by the minimum of two token balances. For example, one token may be non-transferable and representative of reputation or contribution; and the other token is a transferable, currency-like token.

### additional features

- votes that flip the result after 75% vote time has passed will automatically extend vote by 50% of `vote_time - existing_extension`
- duplicate scripts are disallowed at the same time
