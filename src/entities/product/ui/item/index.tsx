import {
  Badge,
  Group,
  Image,
  Paper,
  Rating,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Product, ProductId } from "@/shared/api/products";

import s from "./s.module.css";
import { Link } from "atomic-router-react";
import { routes } from "@/shared/routing";

export type ProductItemProps = {
  product: Product;
};

export const ProductItem = (props: ProductItemProps) => {
  return (
    <Paper
      className={s.product}
      component={Link<ProductId>}
      to={routes.product}
      params={{ id: props.product.id }}
    >
      <Group className={s.layout}>
        <Image className={s.image} src={props.product.image} />
        <Stack className={s.information}>
          <Title>{props.product.title}</Title>
          <Group justify="space-between">
            <Group className={s.rating}>
              {props.product.rating.rate}
              <Rating
                size="lg"
                value={props.product.rating.rate}
                fractions={4}
                readOnly
              />
              ({props.product.rating.count})
            </Group>
            <Title className={s.price}>${props.product.price.toFixed(2)}</Title>
          </Group>

          <Badge className={s.category}>{props.product.category}</Badge>
          <Text>{props.product.description}</Text>
        </Stack>
      </Group>
    </Paper>
  );
};
