import {
  Badge,
  Button,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Product } from "@/shared/api/products";

import s from "./s.module.css";
import { routes } from "@/shared/routing";
import { Rating } from "@/shared/ui/rating";

export type ProductItemProps = {
  product: Product;
  onDelete: () => void;
};

export const ProductItem = (props: ProductItemProps) => {
  return (
    <Paper
      className={s.product}
      onClick={() => routes.product.open({ id: props.product.id })}
    >
      <Group className={s.layout}>
        <Image className={s.image} src={props.product.image} />
        <Stack className={s.information}>
          <Title>{props.product.title}</Title>
          <Group justify="space-between">
            <Rating
              rate={props.product.rating?.rate ?? 0}
              count={props.product.rating?.count ?? 0}
            />
            <Title className={s.price}>${props.product.price.toFixed(2)}</Title>
          </Group>

          <Badge className={s.category}>{props.product.category}</Badge>
          <Text>{props.product.description}</Text>
        </Stack>
        <Button
          color="red"
          onClick={(e) => {
            e.stopPropagation();
            props.onDelete();
          }}
        >
          Delete
        </Button>
      </Group>
    </Paper>
  );
};
