import { Group, Rating as R } from "@mantine/core";

export type RatingProps = {
  rate: number;
  count: number;
};

export const Rating = (props: RatingProps) => {
  return (
    <Group>
      {props.rate.toString()}
      <R size="lg" value={props.rate} fractions={4} readOnly />(
      {props.count.toString()})
    </Group>
  );
};
