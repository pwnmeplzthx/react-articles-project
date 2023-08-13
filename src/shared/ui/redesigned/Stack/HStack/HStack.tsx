import { Flex, FlexProps } from '../Flex/Flex';

// Omit тайпскриптовый тип, который позволяет исключить поле из какого-то другого типа
type HStackProps = Omit<FlexProps, 'direction'>

export const HStack = (props: HStackProps) => (
    <Flex direction="row" {...props} />
);
