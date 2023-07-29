import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { counterActions, useCounterActions } from '../model/slice/counterSlice';
import { getCounterValue, useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
    // Доступ к функциям прим: dispatch(counterActions.increment())
    // const dispatch = useDispatch();
    // получение данных из стейта (передает в хук схему )
    // const counterValue = useSelector(getCounterValue);
    const counterValue = useCounterValue();
    const { t } = useTranslation();
    // useCounterActions предоставляет вызов экшенов напрямую (без диспатча)
    const { decrement, increment, add } = useCounterActions();

    const handleIncrement = () => {
        // dispatch(counterActions.increment());
        increment();
    };

    const handleDecrement = () => {
        // dispatch(counterActions.decrement());
        decrement();
    };

    const handleAddFive = () => {
        // dispatch(counterActions.decrement());
        add(5);
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button
                onClick={handleIncrement}
                data-testid="increment-btn"
            >
                {t('increment')}
            </Button>
            <Button
                data-testid="decrement-btn"
                onClick={handleDecrement}
            >
                {t('decrement')}
            </Button>
            <Button
                data-testid="add-five-btn"
                onClick={handleAddFive}
            >
                {t('add five')}
            </Button>
        </div>
    );
};
