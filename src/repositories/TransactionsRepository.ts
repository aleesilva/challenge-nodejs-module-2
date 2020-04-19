import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface makeTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(tran => tran.type === 'income')
      .reduce((count, tran) => count + tran.value, 0);

    const outcome = this.transactions
      .filter(tran => tran.type === 'outcome')
      .reduce((count, tran) => count + tran.value, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: makeTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
