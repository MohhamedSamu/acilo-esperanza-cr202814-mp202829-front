import React, { memo } from 'react';
import { Text } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

type customProps = {
  hideModal: () => void
  visible: boolean;
  type: string;
  text: string;
};

const Toaster = (props : customProps) => {
  let { hideModal, visible, type, text } = props;
  const containerSuccessStyle = { backgroundColor: '#73e700', padding: 20, marginHorizontal: 50 };
  const containerDangerStyle = { backgroundColor: '#ff6868', padding: 20, marginHorizontal: 50 };

  const textSuccessStyle = { color: 'black' };
  const textDangerStyle = { color: '#111111' };

  return (
  <Portal>
    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={
      type == "success" ? containerSuccessStyle : containerDangerStyle
    }>
      <Text style={
      type == "success" ? textSuccessStyle : textDangerStyle
    }>{ text }</Text>
    </Modal>
  </Portal>
  );
};

export default memo(Toaster);
