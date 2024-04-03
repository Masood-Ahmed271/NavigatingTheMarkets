// import { Box, useStyleConfig } from "@chakra-ui/react";
// import { useEffect, useState } from "react";

// function Card(props) {
//   const { variant, children, ...rest } = props;
//   const styles = useStyleConfig("Card", { variant });
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   return (
//     <Box
//       __css={{
//         ...styles,
//         opacity: isVisible ? 1 : 0,
//         transform: `translateY(${isVisible ? 0 : "20px"})`,
//         transition: "opacity 1s, transform 1s",
//       }}
//       {...rest}
//     >
//       {children}
//     </Box>
//   );
// }

// export default Card;


// Sacle in animation code:

import { Box, useStyleConfig } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Card(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("Card", { variant });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Box
      __css={{
        ...styles,
        transform: `scale(${isVisible ? 1 : 0})`,
        transition: "transform 0.5s",
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default Card;
