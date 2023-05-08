import React from 'react';
import {StyleSheet} from 'react-native';
import {Modal, Center} from 'native-base';
import {isWeb} from '../../constants';
import {WebView} from 'react-native-webview';
import {useWindowDimensions} from 'react-native';

type Props = {
  openModal: boolean;
  onClose: () => void;
  title: string;
  url: string;
  isRTL: boolean;
};
export const WebViewModal = ({
  openModal,
  onClose,
  title,
  url,
  isRTL,
}: Props) => {
  const {height} = useWindowDimensions();
  return (
    <Modal isOpen={openModal} size="full" padding={5} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton
          _web={{
            position: 'absolute',
            left: isRTL ? 0 : null,
            width: '5%',
            alignItems: 'center',
          }}
        />
        <Modal.Header>
          <Center w="90%" _text={{fontSize: 'lg'}}>
            {title}
          </Center>
        </Modal.Header>

        <Modal.Body height={height}>
          {isWeb ? (
            <iframe src={url} height={'100%'} width={'100%'} />
          ) : (
            <WebView
              originWhitelist={['*']}
              source={{
                uri: url,
              }}
              style={styles.webview}
            />
          )}
        </Modal.Body>
        <Modal.Footer />
      </Modal.Content>
    </Modal>
  );
};

const styles = StyleSheet.create({
  webview: {
    width: '100%',
  },
});
