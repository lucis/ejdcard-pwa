import React from "react";
import posed from "react-pose";

const withAnimation = WrappedComponent => {
  const Box = posed.div({
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  });

  return ({ visible, ...props }) => (
    <Box pose={visible ? 'visible' : 'hidden'}>
      {visible ? <WrappedComponent {...props} /> : null}
    </Box>
  );
};

export default withAnimation;