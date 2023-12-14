import React from "react";
import { Button, Typography } from "@mui/material";
import { FcGoogle } from "react-icons/fc";

const ways = {
  google: {
    logo: <FcGoogle />,
    name: "Google",
  },
};

type TNextStep = {
  variant: keyof typeof ways;
  onClick: () => void;
};

const NextStep: React.FC<TNextStep> = ({ variant, onClick }) => {
  const { logo, name } = ways[variant];
  return (
    <Button sx={{ p: 1, fontSize: "2.4rem" }} variant="outlined" onClick={onClick}>
      {logo} &nbsp;
      <Typography
        variant="h5"
        component="p"
        sx={{
          color: "var(--grey-dark)",
          textTransform: "capitalize",
          fontFamily: "Montserrat",
        }}
      >
        Login with <span style={{ fontWeight: 700, color: "var(--dark)" }}>{name}</span>
      </Typography>
    </Button>
  );
};

export default React.memo(NextStep);
