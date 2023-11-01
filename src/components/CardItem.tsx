import { Button, Card, Text } from "react-native-paper";
import React from "react";

const CardItem = ({item, index}: any) => {
  return (
    <Card>
      <Card.Cover source={{ uri: 'https://picsum.photos/800' }} />

      <Card.Content>
        <Text variant="titleLarge">{item.nombre}</Text>
        <Text variant="bodyMedium">{item.email}</Text>
      </Card.Content>
      <Card.Actions>
        <Button>Ver</Button>
      </Card.Actions>
    </Card>
  );
}

export default CardItem;
