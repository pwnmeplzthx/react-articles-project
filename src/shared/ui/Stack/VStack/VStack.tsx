import { Flex, FlexProps } from '../Flex/Flex';

// Omit тайпскриптовый тип, который позволяет исключить поле из какого-то другого типа
type VStackProps = Omit<FlexProps, 'direction'>

export const VStack = (props: VStackProps) => {
    const { align = 'start' } = props;
    return (
        <Flex {...props} direction="column" align={align} />
    );
};
