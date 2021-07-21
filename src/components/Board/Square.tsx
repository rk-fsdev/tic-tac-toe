import React from 'react';
import { Flex } from '@chakra-ui/react';

import { EValue, VALUE_MATCH } from '.';

interface Props {
  index: number;
  value: null | EValue;
  onClick(idx: number): void;
}

const Square: React.FC<Props> = ({ value, index, onClick }: Props) => {
  const handleClick = () => {
    onClick(index);
  };
  return (
    <Flex
      width="50px"
      height="50px"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      border="1px solid"
      borderColor="primary"
      onClick={handleClick}
    >
      {!!value && VALUE_MATCH[value]}
    </Flex>
  );
};

export default Square;
