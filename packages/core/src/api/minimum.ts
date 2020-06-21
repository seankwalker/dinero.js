import { Calculator } from '../calculator';
import { DineroOptions, BaseDinero } from '../types';

function minimum<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: (options: DineroOptions<TAmount>) => TDinero,
  calculator: Pick<Calculator<TAmount>, 'minimum'>
) {
  return (dineroObjects: readonly TDinero[]) => {
    const [firstDinero] = dineroObjects;
    const { currency, scale } = firstDinero.toJSON();

    const amount = calculator.minimum(
      dineroObjects.map((subject) => {
        const { amount: subjectAmount } = subject.toJSON();

        return subjectAmount;
      })
    );

    return dineroFactory({
      amount,
      currency,
      scale,
    });
  };
}

export default minimum;
