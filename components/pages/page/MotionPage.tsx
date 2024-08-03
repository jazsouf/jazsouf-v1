"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MotionPage = ({
  classname,
  content,
}: {
  classname: string;
  content: any;
}) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, []);
  const fadeInDown = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: [-5, 3, -2, 0],
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };
  return (
    <motion.div
      key={key}
      initial={"hidden"}
      animate="visible"
      variants={fadeInDown}
      className={classname}
    >
      {content}
    </motion.div>
  );
};

export default MotionPage;
